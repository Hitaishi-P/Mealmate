import { useState, useCallback } from 'react'
import { getMealPlan } from '../utils/spoonacular'
import { parseIngredients } from '../utils/groceryParser'

/**
 * Custom hook that fetches and stores the meal plan + derived grocery list.
 * Returns state + a `generate` function to trigger a new fetch.
 */
export function useMealPlan() {
  const [mealPlan, setMealPlan] = useState(null)
  const [groceryList, setGroceryList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const generate = useCallback(async (preferences) => {
    setLoading(true)
    setError(null)
    try {
      const plan = await getMealPlan(preferences)
      setMealPlan(plan)
      setGroceryList(parseIngredients(plan, preferences.servings))
    } catch (err) {
      setError(err.message || 'Something went wrong. Check your API key and try again.')
      setMealPlan(null)
      setGroceryList([])
    } finally {
      setLoading(false)
    }
  }, [])

  const toggleGroceryItem = useCallback((id) => {
    setGroceryList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    )
  }, [])

  const clearAll = useCallback(() => {
    setMealPlan(null)
    setGroceryList([])
    setError(null)
  }, [])

  return {
    mealPlan,
    groceryList,
    loading,
    error,
    generate,
    toggleGroceryItem,
    clearAll,
  }
}