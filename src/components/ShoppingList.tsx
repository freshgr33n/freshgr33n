import { STORES } from '../data/stores';
import { compareStores, priceShoppingList } from '../lib/planner';
import type { Region, StoreId } from '../data/types';

const CATEGORY_LABEL: Record<string, string> = {
  produce: 'Produce',
  protein: 'Protein',
  dairy: 'Dairy',
  grains: 'Grains',
  pantry: 'Pantry',
  frozen: 'Frozen',
  bakery: 'Bakery',
};

function money(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export default function ShoppingList({
  totals,
  region,
  storeId,
  onStoreChange,
}: {
  totals: Map<string, number>;
  region: Region;
  storeId: StoreId;
  onStoreChange: (id: StoreId) => void;
}) {
  const { lines, total } = priceShoppingList(totals, region, storeId);
  const comparison = compareStores(totals, region);
  const cheapest = comparison[0];

  const grouped = lines.reduce<Record<string, typeof lines>>((acc, line) => {
    (acc[line.category] ??= []).push(line);
    return acc;
  }, {});

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-6 mt-10">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">
            Shopping list — {STORES[storeId].name}
          </h2>
          <button
            onClick={() => window.print()}
            className="text-sm rounded-lg border border-stone-300 dark:border-stone-700 px-3 py-1.5 hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            Print / Save
          </button>
        </div>

        <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <div className="bg-stone-50 dark:bg-stone-800/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-stone-500">
                {CATEGORY_LABEL[category] ?? category}
              </div>
              <ul className="divide-y divide-stone-100 dark:divide-stone-800">
                {items.map((line) => (
                  <li key={line.ingredientId} className="flex items-center justify-between px-4 py-2.5 text-sm">
                    <div>
                      <div className="font-medium">{line.name}</div>
                      <div className="text-xs text-stone-500">
                        {line.packsNeeded} × {line.packLabel} @ {money(line.unitPrice)}
                      </div>
                    </div>
                    <div className="font-semibold tabular-nums">{money(line.lineTotal)}</div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl bg-green-600 text-white px-5 py-4 flex items-center justify-between">
          <div>
            <div className="text-sm opacity-90">Estimated total at {STORES[storeId].name}</div>
            <div className="text-xs opacity-75">{lines.length} items · groceries are tax-exempt in most states</div>
          </div>
          <div className="text-2xl font-bold tabular-nums">{money(total)}</div>
        </div>
      </div>

      <aside className="space-y-4">
        <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-4">
          <h3 className="font-semibold mb-3">Compare stores near {region.name.split('(')[0].trim()}</h3>
          <ul className="space-y-1.5">
            {comparison.map((c) => {
              const selected = c.storeId === storeId;
              return (
                <li key={c.storeId}>
                  <button
                    onClick={() => onStoreChange(c.storeId)}
                    className={
                      'w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ' +
                      (selected
                        ? 'bg-green-600 text-white'
                        : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300')
                    }
                  >
                    <span className="flex items-center gap-1.5">
                      {c.storeId === cheapest.storeId && (
                        <span title="Cheapest option">💰</span>
                      )}
                      {c.name}
                    </span>
                    <span className="font-semibold tabular-nums">{money(c.total)}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          {storeId !== cheapest.storeId && (
            <p className="text-xs text-stone-500 mt-3">
              Switching to {cheapest.name} would save {money(total - cheapest.total)} on this list.
            </p>
          )}
        </div>
        <p className="text-xs text-stone-400 px-1">
          Prices are simulated regional averages meant for budgeting, not a live price feed from any store.
        </p>
      </aside>
    </div>
  );
}
