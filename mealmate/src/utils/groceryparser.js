// Unit normalization map — converts common units to a base form
// Takes the raw Spoonacular meal plan and extracts a clean grocery list.
// Deduplicates ingredients by name + unit, normalizes unit names (e.g. "tablespoons" → "tbsp"),
// multiplies amounts by servings, and sorts everything by aisle for logical shopping order.
const UNIT_NORMALIZE = {
  tablespoon: 'tbsp', tablespoons: 'tbsp', Tablespoon: 'tbsp', Tablespoons: 'tbsp',
  teaspoon: 'tsp', teaspoons: 'tsp', Teaspoon: 'tsp', Teaspoons: 'tsp',
  cup: 'cup', cups: 'cup', Cup: 'cup', Cups: 'cup',
  ounce: 'oz', ounces: 'oz', Ounce: 'oz', Ounces: 'oz',
  pound: 'lb', pounds: 'lb', Pound: 'lb', Pounds: 'lb',
  gram: 'g', grams: 'g', Gram: 'g', Grams: 'g',
  kilogram: 'kg', kilograms: 'kg',
  milliliter: 'ml', milliliters: 'ml',
  liter: 'l', liters: 'l',
  slice: 'slice', slices: 'slice',
  clove: 'clove', cloves: 'clove',
  piece: 'piece', pieces: 'piece',
}

function normalizeUnit(unit) {
  return UNIT_NORMALIZE[unit] || unit || ''
}

/**
 * Extract and deduplicate ingredients from a Spoonacular week meal plan.
 * Merges duplicate ingredients by name, summing amounts where units match.
 *
 * @param {Object} plan - Spoonacular week plan object
 * @param {number} servings - Multiplier for amounts
 * @returns {Array<{id, name, amount, unit, checked}>}
 */
export function parseIngredients(plan, servings = 1) {
  if (!plan?.week) return []

  // Map keyed by "name::unit" for deduplication
  const map = new Map()

  Object.values(plan.week).forEach((dayData) => {
    ;(dayData.meals || []).forEach((meal) => {
      ;(meal.extendedIngredients || []).forEach((ing) => {
        const name = ing.name?.toLowerCase().trim()
        if (!name) return

        const unit = normalizeUnit(ing.unit)
        const key = `${name}::${unit}`
        const amount = (ing.amount || 0) * servings

        if (map.has(key)) {
          map.get(key).amount += amount
        } else {
          map.set(key, {
            id: ing.id ? `${ing.id}-${unit}` : key,
            name: ing.name,
            amount,
            unit,
            checked: false,
            aisle: ing.aisle || 'Other',
          })
        }
      })
    })
  })

  // Sort by aisle then name for a logical shopping order
  return Array.from(map.values()).sort((a, b) => {
    if (a.aisle !== b.aisle) return a.aisle.localeCompare(b.aisle)
    return a.name.localeCompare(b.name)
  })
}

/**
 * Format an ingredient amount for display (round floats, drop trailing zeros).
 */
export function formatAmount(amount) {
  if (!amount) return ''
  const rounded = Math.round(amount * 100) / 100
  return rounded % 1 === 0 ? String(rounded) : rounded.toFixed(2).replace(/\.?0+$/, '')
}