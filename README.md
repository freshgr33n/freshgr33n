# freshgr33n

A local grocery budget planner. Pick your location and preferred market, choose
dietary goals like high-protein or high-fiber, and get a generated weekly meal
plan plus an itemized shopping list with estimated prices and a total.

## How it works

- **Location** — share your browser location or pick your state. This maps
  you to one of ten seed US regions, each with its own grocery price index.
- **Market** — choose a preferred store (Walmart, Aldi, Kroger, Whole Foods,
  Trader Joe's, Costco, Target, and regional chains like Publix, H-E-B, and
  Wegmans) from the ones available in your region.
- **Meal plan** — pick dietary goals (high-protein, high-fiber, balanced,
  vegetarian, low-carb, budget-friendly), which meals to include, a plan
  length (3/5/7 days), and household size. Vegetarian is a hard filter —
  meat and fish never appear once it's selected; the others are weighted
  preferences the planner favors when picking recipes.
- **Shopping list** — ingredients are aggregated across every meal in the
  plan, scaled to household size, and priced per store package. You get an
  itemized, categorized list with a running total, plus a side-by-side price
  comparison across every store available in your region.

Prices are modeled national-average package prices adjusted by a regional
cost-of-living multiplier and a per-store multiplier — a realistic planning
estimate, not a live price feed from any retailer.

## Stack

React + TypeScript + Vite + Tailwind CSS. All data (regions, stores,
ingredients, recipes) lives in `src/data`; the planning logic (meal
selection, ingredient aggregation, pricing) lives in `src/lib/planner.ts`.

## Development

```bash
npm install
npm run dev      # start the dev server
npm run build    # typecheck + production build
```
