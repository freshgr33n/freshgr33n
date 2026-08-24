import { RECIPES } from '../data/recipes';
import { INGREDIENT_MAP } from '../data/ingredients';
import { STORES } from '../data/stores';
import type { DietTag, MealType, Nutrition, Recipe, Region, StoreId } from '../data/types';

export interface PlannerOptions {
  days: number;
  mealTypes: MealType[];
  goals: DietTag[];
  householdSize: number;
  seedOffset?: number;
}

export interface DayMeal {
  mealType: MealType;
  recipe: Recipe;
}

export interface DayPlan {
  day: number;
  meals: DayMeal[];
  nutrition: Nutrition;
}

const EMPTY_NUTRITION: Nutrition = { calories: 0, proteinG: 0, fiberG: 0, carbsG: 0, fatG: 0 };

function addNutrition(a: Nutrition, b: Nutrition): Nutrition {
  return {
    calories: a.calories + b.calories,
    proteinG: a.proteinG + b.proteinG,
    fiberG: a.fiberG + b.fiberG,
    carbsG: a.carbsG + b.carbsG,
    fatG: a.fatG + b.fatG,
  };
}

function tagScore(recipe: Recipe, goals: DietTag[]): number {
  if (goals.length === 0) return 1;
  return recipe.tags.filter((t) => goals.includes(t)).length;
}

/** Deterministic pseudo-random so the same inputs always produce the same plan. */
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

function pickRecipe(
  pool: Recipe[],
  goals: DietTag[],
  recentIds: string[],
  rand: () => number,
): Recipe {
  const scored = pool.map((r) => ({ r, score: tagScore(r, goals) }));
  const maxScore = Math.max(...scored.map((s) => s.score));
  // Keep near-best matches too (not just the single top scorer) so a meal
  // type with only one "perfect" recipe still gets day-to-day variety.
  const minAcceptable = maxScore > 0 ? Math.max(1, maxScore - 1) : 0;
  let candidates = scored.filter((s) => s.score >= minAcceptable).map((s) => s.r);

  const fresh = candidates.filter((r) => !recentIds.includes(r.id));
  if (fresh.length > 0) candidates = fresh;

  const idx = Math.floor(rand() * candidates.length);
  return candidates[idx];
}

export function generateMealPlan(options: PlannerOptions): DayPlan[] {
  const { days, mealTypes, goals, householdSize, seedOffset = 0 } = options;
  const rand = seededRandom(
    days * 1000 + goals.length * 17 + householdSize + mealTypes.length * 7 + seedOffset * 977,
  );
  const recentByMeal: Record<MealType, string[]> = { breakfast: [], lunch: [], dinner: [], snack: [] };
  const plan: DayPlan[] = [];

  for (let day = 1; day <= days; day++) {
    const meals: DayMeal[] = [];
    let nutrition = EMPTY_NUTRITION;

    for (const mealType of mealTypes) {
      let pool = RECIPES.filter((r) => r.mealType === mealType);
      // "Vegetarian" is a hard dietary restriction, not just a preference
      // to weigh alongside the others — never suggest a meat/fish recipe.
      if (goals.includes('vegetarian')) {
        pool = pool.filter((r) => r.tags.includes('vegetarian'));
      }
      if (pool.length === 0) continue;
      const recipe = pickRecipe(pool, goals, recentByMeal[mealType], rand);
      meals.push({ mealType, recipe });
      nutrition = addNutrition(nutrition, recipe.perServing);

      recentByMeal[mealType].push(recipe.id);
      if (recentByMeal[mealType].length > 3) recentByMeal[mealType].shift();
    }

    plan.push({ day, meals, nutrition });
  }

  return plan;
}

export interface ShoppingListLine {
  ingredientId: string;
  name: string;
  category: string;
  packLabel: string;
  packsNeeded: number;
  unitPrice: number;
  lineTotal: number;
  totalQty: number;
  packUnit: string;
}

/** Sums raw ingredient quantities needed across the whole plan, scaled for household size. */
export function aggregateIngredients(plan: DayPlan[], householdSize: number): Map<string, number> {
  const totals = new Map<string, number>();
  for (const day of plan) {
    for (const meal of day.meals) {
      const scale = householdSize / meal.recipe.servings;
      for (const line of meal.recipe.ingredients) {
        const prev = totals.get(line.ingredientId) ?? 0;
        totals.set(line.ingredientId, prev + line.qty * scale);
      }
    }
  }
  return totals;
}

export function priceShoppingList(
  totals: Map<string, number>,
  region: Region,
  storeId: StoreId,
): { lines: ShoppingListLine[]; total: number } {
  const store = STORES[storeId];
  const lines: ShoppingListLine[] = [];
  let total = 0;

  for (const [ingredientId, totalQty] of totals) {
    const ingredient = INGREDIENT_MAP[ingredientId];
    if (!ingredient) continue;
    const packsNeeded = Math.max(1, Math.ceil(totalQty / ingredient.packAmount));
    const unitPrice = ingredient.basePrice * store.multiplier * region.multiplier;
    const lineTotal = unitPrice * packsNeeded;
    total += lineTotal;
    lines.push({
      ingredientId,
      name: ingredient.name,
      category: ingredient.category,
      packLabel: ingredient.packLabel,
      packsNeeded,
      unitPrice,
      lineTotal,
      totalQty,
      packUnit: ingredient.packUnit,
    });
  }

  lines.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
  return { lines, total };
}

export interface StoreComparison {
  storeId: StoreId;
  name: string;
  total: number;
}

export function compareStores(
  totals: Map<string, number>,
  region: Region,
): StoreComparison[] {
  return region.stores
    .map((storeId) => {
      const { total } = priceShoppingList(totals, region, storeId);
      return { storeId, name: STORES[storeId].name, total };
    })
    .sort((a, b) => a.total - b.total);
}

export function planNutritionTotals(plan: DayPlan[]): Nutrition {
  return plan.reduce((acc, d) => addNutrition(acc, d.nutrition), EMPTY_NUTRITION);
}
