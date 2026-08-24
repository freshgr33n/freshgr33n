export type StoreId =
  | 'walmart'
  | 'aldi'
  | 'kroger'
  | 'safeway'
  | 'trader_joes'
  | 'whole_foods'
  | 'costco'
  | 'target'
  | 'publix'
  | 'heb'
  | 'wegmans';

export interface Store {
  id: StoreId;
  name: string;
  tagline: string;
  /** price multiplier relative to national average (1.0) */
  multiplier: number;
}

export interface Region {
  id: string;
  name: string;
  lat: number;
  lon: number;
  /** cost-of-living grocery multiplier relative to national average (1.0) */
  multiplier: number;
  stores: StoreId[];
}

export type Category =
  | 'produce'
  | 'protein'
  | 'dairy'
  | 'grains'
  | 'pantry'
  | 'frozen'
  | 'bakery';

export type PackUnit = 'g' | 'each' | 'ml';

export interface Ingredient {
  id: string;
  name: string;
  category: Category;
  /** human label for the package sold at a store, e.g. "3 lb bag" */
  packLabel: string;
  /** amount contained in one package, in packUnit */
  packAmount: number;
  packUnit: PackUnit;
  /** national-average price per package */
  basePrice: number;
}

export type DietTag =
  | 'high-protein'
  | 'high-fiber'
  | 'balanced'
  | 'vegetarian'
  | 'low-carb'
  | 'budget';

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface RecipeIngredient {
  ingredientId: string;
  qty: number;
  unit: PackUnit;
}

export interface Nutrition {
  calories: number;
  proteinG: number;
  fiberG: number;
  carbsG: number;
  fatG: number;
}

export interface Recipe {
  id: string;
  name: string;
  mealType: MealType;
  tags: DietTag[];
  servings: number;
  perServing: Nutrition;
  ingredients: RecipeIngredient[];
  steps: string[];
}
