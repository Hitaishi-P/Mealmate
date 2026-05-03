const BASE = 'https://api.spoonacular.com'
const KEY = import.meta.env.VITE_SPOONACULAR_KEY
// Utility functions for talking to the Spoonacular API.
// getMealPlan() generates a weekly plan based on user preferences,
export async function getMealPlan({ diet, targetCalories }) {
  const params = new URLSearchParams({
    apiKey: KEY,
    timeFrame: 'week',
    targetCalories,
  })
  if (diet && diet !== 'none') params.set('diet', diet)

  const res = await fetch(`${BASE}/mealplanner/generate?${params}`)
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || `Spoonacular error ${res.status}`)
  }
  return res.json()
}

export async function getRecipeById(id) {
  const res = await fetch(
    `${BASE}/recipes/${id}/information?apiKey=${KEY}&includeNutrition=false`
  )
  if (!res.ok) throw new Error(`Recipe fetch failed: ${res.status}`)
  return res.json()
}