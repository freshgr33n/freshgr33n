import { useState } from 'react';
import type { DietTag, MealType } from '../data/types';

const GOALS: { id: DietTag; label: string; blurb: string }[] = [
  { id: 'high-protein', label: 'High Protein', blurb: 'Muscle-building, satiating meals' },
  { id: 'high-fiber', label: 'High Fiber', blurb: 'Gut-friendly, whole-food focused' },
  { id: 'balanced', label: 'Balanced', blurb: 'A bit of everything, nothing extreme' },
  { id: 'vegetarian', label: 'Vegetarian', blurb: 'No meat or fish' },
  { id: 'low-carb', label: 'Low Carb', blurb: 'Lighter on grains & starches' },
  { id: 'budget', label: 'Budget-Friendly', blurb: 'Cheaper staple ingredients' },
];

const MEAL_TYPES: { id: MealType; label: string }[] = [
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'lunch', label: 'Lunch' },
  { id: 'dinner', label: 'Dinner' },
  { id: 'snack', label: 'Snack' },
];

export interface GoalsResult {
  goals: DietTag[];
  mealTypes: MealType[];
  days: number;
  householdSize: number;
}

export default function GoalsStep({
  onBack,
  onSubmit,
}: {
  onBack: () => void;
  onSubmit: (result: GoalsResult) => void;
}) {
  const [goals, setGoals] = useState<DietTag[]>(['high-protein', 'high-fiber']);
  const [mealTypes, setMealTypes] = useState<MealType[]>(['breakfast', 'lunch', 'dinner']);
  const [days, setDays] = useState(7);
  const [householdSize, setHouseholdSize] = useState(2);

  function toggleGoal(id: DietTag) {
    setGoals((g) => (g.includes(id) ? g.filter((x) => x !== id) : [...g, id]));
  }
  function toggleMeal(id: MealType) {
    setMealTypes((m) => (m.includes(id) ? m.filter((x) => x !== id) : [...m, id]));
  }

  const canSubmit = mealTypes.length > 0;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Build your meal plan</h2>
        <p className="text-stone-500 dark:text-stone-400">Pick as many goals as you like — we'll favor recipes matching all of them.</p>
      </div>

      <fieldset className="mb-6">
        <legend className="font-semibold mb-2">Dietary goals</legend>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {GOALS.map((g) => {
            const active = goals.includes(g.id);
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => toggleGoal(g.id)}
                className={
                  'rounded-lg border p-3 text-left transition-colors ' +
                  (active
                    ? 'border-green-500 bg-green-50 dark:bg-green-950'
                    : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900')
                }
              >
                <div className="text-sm font-medium">{g.label}</div>
                <div className="text-xs text-stone-500 dark:text-stone-400">{g.blurb}</div>
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="mb-6">
        <legend className="font-semibold mb-2">Meals to include</legend>
        <div className="flex flex-wrap gap-2">
          {MEAL_TYPES.map((m) => {
            const active = mealTypes.includes(m.id);
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => toggleMeal(m.id)}
                className={
                  'rounded-full px-4 py-2 text-sm font-medium border transition-colors ' +
                  (active
                    ? 'border-green-500 bg-green-600 text-white'
                    : 'border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-300')
                }
              >
                {m.label}
              </button>
            );
          })}
        </div>
        {!canSubmit && <p className="text-xs text-red-500 mt-2">Pick at least one meal type.</p>}
      </fieldset>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <label className="font-semibold block mb-2" htmlFor="days">
            Plan length
          </label>
          <select
            id="days"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-full rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 py-2 px-3"
          >
            <option value={3}>3 days</option>
            <option value={5}>5 days</option>
            <option value={7}>7 days</option>
          </select>
        </div>
        <div>
          <label className="font-semibold block mb-2" htmlFor="household">
            Household size
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setHouseholdSize((n) => Math.max(1, n - 1))}
              className="h-9 w-9 rounded-lg border border-stone-300 dark:border-stone-700"
            >
              −
            </button>
            <input
              id="household"
              readOnly
              value={householdSize}
              className="w-full text-center rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 py-2"
            />
            <button
              type="button"
              onClick={() => setHouseholdSize((n) => Math.min(8, n + 1))}
              className="h-9 w-9 rounded-lg border border-stone-300 dark:border-stone-700"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-sm text-stone-500 hover:text-stone-700 dark:hover:text-stone-300">
          ← Back
        </button>
        <button
          disabled={!canSubmit}
          onClick={() => onSubmit({ goals, mealTypes, days, householdSize })}
          className="rounded-xl bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-semibold py-3 px-6 transition-colors"
        >
          Generate my plan →
        </button>
      </div>
    </div>
  );
}
