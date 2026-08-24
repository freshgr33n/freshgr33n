import type { DayPlan } from '../lib/planner';
import { planNutritionTotals } from '../lib/planner';

const MEAL_ICON: Record<string, string> = {
  breakfast: '🍳',
  lunch: '🥗',
  dinner: '🍽️',
  snack: '🥜',
};

export default function PlanResults({ plan, householdSize }: { plan: DayPlan[]; householdSize: number }) {
  const totals = planNutritionTotals(plan);
  const avgPerDay = {
    calories: Math.round(totals.calories / plan.length),
    proteinG: Math.round(totals.proteinG / plan.length),
    fiberG: Math.round(totals.fiberG / plan.length),
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 mb-6 max-w-md mx-auto text-center">
        <div className="rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-3">
          <div className="text-xl font-bold text-green-600">{avgPerDay.calories}</div>
          <div className="text-xs text-stone-500">avg kcal/day/person</div>
        </div>
        <div className="rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-3">
          <div className="text-xl font-bold text-green-600">{avgPerDay.proteinG}g</div>
          <div className="text-xs text-stone-500">avg protein/day</div>
        </div>
        <div className="rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-3">
          <div className="text-xl font-bold text-green-600">{avgPerDay.fiberG}g</div>
          <div className="text-xs text-stone-500">avg fiber/day</div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {plan.map((day) => (
          <div key={day.day} className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-4">
            <div className="flex items-baseline justify-between mb-3">
              <h3 className="font-semibold">Day {day.day}</h3>
              <span className="text-xs text-stone-400">{Math.round(day.nutrition.calories)} kcal</span>
            </div>
            <ul className="space-y-2">
              {day.meals.map((m, i) => (
                <li key={i} className="text-sm flex items-start gap-2">
                  <span>{MEAL_ICON[m.mealType]}</span>
                  <div>
                    <div className="font-medium capitalize">{m.mealType}</div>
                    <div className="text-stone-500 dark:text-stone-400">{m.recipe.name}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-3 pt-3 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-500 flex gap-3">
              <span>P {Math.round(day.nutrition.proteinG)}g</span>
              <span>Fiber {Math.round(day.nutrition.fiberG)}g</span>
              <span>Carbs {Math.round(day.nutrition.carbsG)}g</span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-stone-400 mt-4 text-center">
        Nutrition is per person; the shopping list below is scaled for your household of {householdSize}.
      </p>
    </div>
  );
}
