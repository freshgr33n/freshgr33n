import type { Ingredient } from './types';

// National-average package prices (USD). Actual regional/store price is
// base price × region multiplier × store multiplier (see planner.ts).
export const INGREDIENTS: Ingredient[] = [
  // ---- produce ----
  { id: 'banana', name: 'Bananas', category: 'produce', packLabel: '1 lb (~3 bananas)', packAmount: 454, packUnit: 'g', basePrice: 0.65 },
  { id: 'spinach', name: 'Baby Spinach', category: 'produce', packLabel: '5 oz box', packAmount: 141, packUnit: 'g', basePrice: 3.29 },
  { id: 'broccoli', name: 'Broccoli Crowns', category: 'produce', packLabel: '1 lb', packAmount: 454, packUnit: 'g', basePrice: 2.29 },
  { id: 'bell_pepper', name: 'Bell Pepper', category: 'produce', packLabel: '1 each', packAmount: 1, packUnit: 'each', basePrice: 0.99 },
  { id: 'avocado', name: 'Avocado', category: 'produce', packLabel: '1 each', packAmount: 1, packUnit: 'each', basePrice: 1.29 },
  { id: 'sweet_potato', name: 'Sweet Potato', category: 'produce', packLabel: '1 lb', packAmount: 454, packUnit: 'g', basePrice: 1.29 },
  { id: 'carrots', name: 'Carrots', category: 'produce', packLabel: '2 lb bag', packAmount: 907, packUnit: 'g', basePrice: 2.49 },
  { id: 'tomato', name: 'Tomatoes', category: 'produce', packLabel: '1 lb', packAmount: 454, packUnit: 'g', basePrice: 2.29 },
  { id: 'onion', name: 'Yellow Onions', category: 'produce', packLabel: '3 lb bag', packAmount: 1361, packUnit: 'g', basePrice: 3.49 },
  { id: 'garlic', name: 'Garlic', category: 'produce', packLabel: '1 head', packAmount: 1, packUnit: 'each', basePrice: 0.79 },
  { id: 'lemon', name: 'Lemon', category: 'produce', packLabel: '1 each', packAmount: 1, packUnit: 'each', basePrice: 0.59 },
  { id: 'apple', name: 'Apples', category: 'produce', packLabel: '3 lb bag', packAmount: 1361, packUnit: 'g', basePrice: 4.49 },
  { id: 'kale', name: 'Kale', category: 'produce', packLabel: '8 oz bag', packAmount: 227, packUnit: 'g', basePrice: 2.99 },
  { id: 'cucumber', name: 'Cucumber', category: 'produce', packLabel: '1 each', packAmount: 1, packUnit: 'each', basePrice: 0.79 },
  { id: 'zucchini', name: 'Zucchini', category: 'produce', packLabel: '1 lb', packAmount: 454, packUnit: 'g', basePrice: 1.79 },

  // ---- protein ----
  { id: 'chicken_breast', name: 'Chicken Breast', category: 'protein', packLabel: '3 lb pack', packAmount: 1361, packUnit: 'g', basePrice: 10.99 },
  { id: 'ground_turkey', name: 'Ground Turkey (93/7)', category: 'protein', packLabel: '1 lb pack', packAmount: 454, packUnit: 'g', basePrice: 5.49 },
  { id: 'eggs', name: 'Eggs', category: 'protein', packLabel: '1 dozen', packAmount: 12, packUnit: 'each', basePrice: 3.49 },
  { id: 'salmon', name: 'Salmon Fillet', category: 'protein', packLabel: '1 lb', packAmount: 454, packUnit: 'g', basePrice: 9.99 },
  { id: 'canned_tuna', name: 'Canned Tuna', category: 'protein', packLabel: '5 oz can', packAmount: 142, packUnit: 'g', basePrice: 1.69 },
  { id: 'black_beans', name: 'Black Beans (canned)', category: 'protein', packLabel: '15 oz can', packAmount: 425, packUnit: 'g', basePrice: 1.09 },
  { id: 'chickpeas', name: 'Chickpeas (canned)', category: 'protein', packLabel: '15 oz can', packAmount: 425, packUnit: 'g', basePrice: 1.09 },
  { id: 'lentils_dry', name: 'Dry Lentils', category: 'protein', packLabel: '1 lb bag', packAmount: 454, packUnit: 'g', basePrice: 2.29 },
  { id: 'tofu', name: 'Firm Tofu', category: 'protein', packLabel: '14 oz block', packAmount: 397, packUnit: 'g', basePrice: 2.49 },

  // ---- dairy ----
  { id: 'greek_yogurt', name: 'Plain Greek Yogurt', category: 'dairy', packLabel: '32 oz tub', packAmount: 907, packUnit: 'g', basePrice: 5.49 },
  { id: 'milk', name: 'Milk', category: 'dairy', packLabel: '1 gallon', packAmount: 3785, packUnit: 'ml', basePrice: 3.79 },
  { id: 'cheddar_cheese', name: 'Cheddar Cheese', category: 'dairy', packLabel: '8 oz block', packAmount: 227, packUnit: 'g', basePrice: 3.29 },
  { id: 'cottage_cheese', name: 'Cottage Cheese', category: 'dairy', packLabel: '16 oz tub', packAmount: 454, packUnit: 'g', basePrice: 3.49 },
  { id: 'butter', name: 'Butter', category: 'dairy', packLabel: '1 lb', packAmount: 454, packUnit: 'g', basePrice: 4.29 },
  { id: 'almond_milk', name: 'Unsweetened Almond Milk', category: 'dairy', packLabel: 'half gallon', packAmount: 1893, packUnit: 'ml', basePrice: 3.49 },

  // ---- grains ----
  { id: 'oats', name: 'Rolled Oats', category: 'grains', packLabel: '42 oz canister', packAmount: 1191, packUnit: 'g', basePrice: 4.49 },
  { id: 'brown_rice', name: 'Brown Rice', category: 'grains', packLabel: '2 lb bag', packAmount: 907, packUnit: 'g', basePrice: 3.29 },
  { id: 'quinoa', name: 'Quinoa', category: 'grains', packLabel: '1 lb bag', packAmount: 454, packUnit: 'g', basePrice: 4.99 },
  { id: 'whole_wheat_bread', name: 'Whole Wheat Bread', category: 'bakery', packLabel: '20 oz loaf', packAmount: 567, packUnit: 'g', basePrice: 3.29 },
  { id: 'whole_wheat_pasta', name: 'Whole Wheat Pasta', category: 'grains', packLabel: '1 lb box', packAmount: 454, packUnit: 'g', basePrice: 1.99 },
  { id: 'tortillas', name: 'Whole Wheat Tortillas', category: 'bakery', packLabel: '10 ct pack', packAmount: 10, packUnit: 'each', basePrice: 3.49 },

  // ---- pantry ----
  { id: 'olive_oil', name: 'Olive Oil', category: 'pantry', packLabel: '500 ml bottle', packAmount: 500, packUnit: 'ml', basePrice: 7.99 },
  { id: 'honey', name: 'Honey', category: 'pantry', packLabel: '12 oz bottle', packAmount: 340, packUnit: 'g', basePrice: 5.49 },
  { id: 'salsa', name: 'Salsa', category: 'pantry', packLabel: '16 oz jar', packAmount: 454, packUnit: 'g', basePrice: 3.29 },
  { id: 'chia_seeds', name: 'Chia Seeds', category: 'pantry', packLabel: '12 oz bag', packAmount: 340, packUnit: 'g', basePrice: 5.99 },
  { id: 'flax_seed', name: 'Ground Flaxseed', category: 'pantry', packLabel: '12 oz bag', packAmount: 340, packUnit: 'g', basePrice: 4.49 },
  { id: 'soy_sauce', name: 'Soy Sauce', category: 'pantry', packLabel: '10 oz bottle', packAmount: 296, packUnit: 'ml', basePrice: 2.99 },
  { id: 'hummus', name: 'Hummus', category: 'pantry', packLabel: '10 oz container', packAmount: 283, packUnit: 'g', basePrice: 3.99 },
  { id: 'almonds', name: 'Raw Almonds', category: 'pantry', packLabel: '1 lb bag', packAmount: 454, packUnit: 'g', basePrice: 6.99 },
  { id: 'peanut_butter', name: 'Peanut Butter', category: 'pantry', packLabel: '16 oz jar', packAmount: 454, packUnit: 'g', basePrice: 3.49 },
  { id: 'protein_powder', name: 'Whey Protein Powder', category: 'pantry', packLabel: '2 lb tub', packAmount: 907, packUnit: 'g', basePrice: 24.99 },

  // ---- frozen ----
  { id: 'mixed_berries_frozen', name: 'Frozen Mixed Berries', category: 'frozen', packLabel: '12 oz bag', packAmount: 340, packUnit: 'g', basePrice: 3.99 },
  { id: 'frozen_mixed_veg', name: 'Frozen Mixed Vegetables', category: 'frozen', packLabel: '12 oz bag', packAmount: 340, packUnit: 'g', basePrice: 1.79 },
];

export const INGREDIENT_MAP: Record<string, Ingredient> = Object.fromEntries(
  INGREDIENTS.map((i) => [i.id, i]),
);
