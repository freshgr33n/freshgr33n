import { useMemo, useState } from 'react';
import StepIndicator from './components/StepIndicator';
import LocationStep from './components/LocationStep';
import StoreStep from './components/StoreStep';
import GoalsStep, { type GoalsResult } from './components/GoalsStep';
import PlanResults from './components/PlanResults';
import ShoppingList from './components/ShoppingList';
import { aggregateIngredients, generateMealPlan, type DayPlan } from './lib/planner';
import type { Region, StoreId } from './data/types';

type Step = 1 | 2 | 3 | 4;

export default function App() {
  const [step, setStep] = useState<Step>(1);
  const [region, setRegion] = useState<Region | null>(null);
  const [locationLabel, setLocationLabel] = useState('');
  const [storeId, setStoreId] = useState<StoreId | null>(null);
  const [goalsResult, setGoalsResult] = useState<GoalsResult | null>(null);
  const [plan, setPlan] = useState<DayPlan[]>([]);
  const [regenNonce, setRegenNonce] = useState(0);

  function handleLocation(r: Region, label: string) {
    setRegion(r);
    setLocationLabel(label);
    setStoreId(null);
    setStep(2);
  }

  function handleStore(id: StoreId) {
    setStoreId(id);
    setStep(3);
  }

  function handleGoals(result: GoalsResult) {
    setGoalsResult(result);
    const generated = generateMealPlan({ ...result, seedOffset: regenNonce });
    setPlan(generated);
    setStep(4);
  }

  function regenerate() {
    if (!goalsResult) return;
    const nextNonce = regenNonce + 1;
    setRegenNonce(nextNonce);
    setPlan(generateMealPlan({ ...goalsResult, seedOffset: nextNonce }));
  }

  const totals = useMemo(
    () => (goalsResult && plan.length > 0 ? aggregateIngredients(plan, goalsResult.householdSize) : new Map()),
    [plan, goalsResult],
  );

  return (
    <div className="min-h-screen">
      <header className="border-b border-stone-200 dark:border-stone-800">
        <div className="max-w-5xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🥬</span>
            <span className="text-lg font-bold tracking-tight">freshgr33n</span>
          </div>
          {region && (
            <button
              onClick={() => {
                setStep(1);
                setRegion(null);
                setStoreId(null);
                setGoalsResult(null);
                setPlan([]);
              }}
              className="text-sm text-stone-500 hover:text-stone-700 dark:hover:text-stone-300"
            >
              Start over
            </button>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        <StepIndicator step={step} />

        {step === 1 && <LocationStep onSelect={handleLocation} />}

        {step === 2 && region && (
          <StoreStep region={region} onBack={() => setStep(1)} onSelect={handleStore} />
        )}

        {step === 3 && region && storeId && (
          <GoalsStep onBack={() => setStep(2)} onSubmit={handleGoals} />
        )}

        {step === 4 && region && storeId && goalsResult && plan.length > 0 && (
          <div>
            <div className="text-center mb-2">
              <p className="text-sm text-stone-500 dark:text-stone-400">
                Planning for {locationLabel} · {goalsResult.days}-day plan · {goalsResult.householdSize}{' '}
                {goalsResult.householdSize === 1 ? 'person' : 'people'}
              </p>
            </div>
            <div className="text-center mb-6">
              <button
                onClick={regenerate}
                className="text-sm rounded-lg border border-stone-300 dark:border-stone-700 px-3 py-1.5 hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                🔀 Shuffle a different plan
              </button>
            </div>
            <PlanResults plan={plan} householdSize={goalsResult.householdSize} />
            <ShoppingList totals={totals} region={region} storeId={storeId} onStoreChange={setStoreId} />
          </div>
        )}
      </main>

      <footer className="max-w-5xl mx-auto px-4 py-10 text-center text-xs text-stone-400">
        freshgr33n plans meals and estimates grocery costs from modeled regional pricing — always confirm totals at checkout.
      </footer>
    </div>
  );
}
