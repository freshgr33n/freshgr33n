import { STORES } from '../data/stores';
import type { Region, StoreId } from '../data/types';

export default function StoreStep({
  region,
  onBack,
  onSelect,
}: {
  region: Region;
  onBack: () => void;
  onSelect: (storeId: StoreId) => void;
}) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Pick your preferred market</h2>
        <p className="text-stone-500 dark:text-stone-400">
          Stores available around <span className="font-medium text-stone-700 dark:text-stone-300">{region.name}</span>.
          You'll be able to compare prices across all of them later.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {region.stores.map((id) => {
          const store = STORES[id];
          return (
            <button
              key={id}
              onClick={() => onSelect(id)}
              className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-green-500 hover:shadow-md transition-all p-4 text-left"
            >
              <div className="font-semibold text-stone-900 dark:text-stone-100">{store.name}</div>
              <div className="text-xs text-stone-500 dark:text-stone-400 mt-1">{store.tagline}</div>
              <div className="text-xs mt-2 inline-block rounded-full bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 px-2 py-0.5">
                {store.multiplier < 0.95 ? 'Budget-friendly' : store.multiplier > 1.1 ? 'Premium' : 'Mid-range'}
              </div>
            </button>
          );
        })}
      </div>

      <div className="text-center mt-8">
        <button onClick={onBack} className="text-sm text-stone-500 hover:text-stone-700 dark:hover:text-stone-300">
          ← Back
        </button>
      </div>
    </div>
  );
}
