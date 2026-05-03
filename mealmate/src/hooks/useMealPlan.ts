// Custom React hook that manages all meal plan state in one place.
// Exposes the meal plan, grocery list, loading/error states, and helper functions
// so App.tsx stays clean and doesn't have to deal with fetch logic directly.
import { useState, useCallback } from 'react'
import { getMealPlan } from '../utils/spoonacular'
import { parseIngredients } from '../utils/groceryParser'
import { mockMealPlan, mockGroceryList } from '../utils/mockData'

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
    // API failed — fall back to mock data for demo purposes
    console.warn('API unavailable, using mock data:', err.message)
    setMealPlan(mockMealPlan)
    setGroceryList(mockGroceryList)
    setError(null) // clear the error so the UI shows the plan, not an error message
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