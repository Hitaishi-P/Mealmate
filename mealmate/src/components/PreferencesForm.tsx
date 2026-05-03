// Form where users set their meal plan preferences — diet type, number of people,
// how many days, cuisine style, and daily calorie target.
// Calls onSubmit() with the collected preferences when the user clicks Generate.
import { useState } from 'react'

const DIETS = [
  { value: 'none', label: 'No restriction' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'gluten free', label: 'Gluten-free' },
  { value: 'paleo', label: 'Paleo' },
  { value: 'ketogenic', label: 'Keto' },
]

const CUISINES = [
  { value: 'any', label: 'Any cuisine' },
  { value: 'italian', label: 'Italian' },
  { value: 'asian', label: 'Asian' },
  { value: 'mexican', label: 'Mexican' },
  { value: 'american', label: 'American' },
  { value: 'mediterranean', label: 'Mediterranean' },
  { value: 'indian', label: 'Indian' },
]

const CALORIE_OPTIONS = [1500, 1800, 2000, 2200, 2500, 2800]

/**
 * PreferencesForm — collects diet, servings, days, cuisine, calories.
 * Calls onSubmit(preferences) when the user clicks Generate.
 */
export default function PreferencesForm({ onSubmit, loading }) {
  const [prefs, setPrefs] = useState({
    diet: 'none',
    servings: 2,
    days: 7,
    cuisine: 'any',
    targetCalories: 2000,
  })

  const set = (key) => (e) =>
    setPrefs((p) => ({ ...p, [key]: e.target.value }))

  return (
    <div className="card p-6">
      <h2 className="text-2xl font-display font-semibold text-sage-800 mb-1">
        What are you eating this week?
      </h2>
      <p className="text-sm text-sage-500 mb-6">
        Tell us your preferences and we'll plan everything.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        {/* Diet */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-sage-600 uppercase tracking-wide">
            Diet
          </label>
          <select className="input-field" value={prefs.diet} onChange={set('diet')}>
            {DIETS.map((d) => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </div>

        {/* Servings */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-sage-600 uppercase tracking-wide">
            Servings
          </label>
          <select className="input-field" value={prefs.servings} onChange={set('servings')}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? 'person' : 'people'}</option>
            ))}
          </select>
        </div>

        {/* Days */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-sage-600 uppercase tracking-wide">
            Days
          </label>
          <select className="input-field" value={prefs.days} onChange={set('days')}>
            {[3, 4, 5, 6, 7].map((n) => (
              <option key={n} value={n}>{n} days</option>
            ))}
          </select>
        </div>

        {/* Cuisine */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-sage-600 uppercase tracking-wide">
            Cuisine
          </label>
          <select className="input-field" value={prefs.cuisine} onChange={set('cuisine')}>
            {CUISINES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>

        {/* Calories */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-sage-600 uppercase tracking-wide">
            Calories/day
          </label>
          <select className="input-field" value={prefs.targetCalories} onChange={set('targetCalories')}>
            {CALORIE_OPTIONS.map((c) => (
              <option key={c} value={c}>{c.toLocaleString()} kcal</option>
            ))}
          </select>
        </div>
      </div>

      <button
        className="btn-primary flex items-center gap-2"
        onClick={() => onSubmit(prefs)}
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Generating…
          </>
        ) : (
          <>✦ Generate meal plan</>
        )}
      </button>
    </div>
  )
}
