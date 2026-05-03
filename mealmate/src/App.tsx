import { useState } from 'react'
import PreferencesForm from './components/PreferencesForm'
import MealCalendar from './components/MealCalendar'
import GroceryList from './components/GroceryList'
import AIAssistant from './components/AIAssistant'
import { useMealPlan } from './hooks/useMealPlan'

const TABS = [
  { id: 'plan', label: 'Meal Plan', icon: '🗓' },
  { id: 'grocery', label: 'Grocery List', icon: '🛒' },
  { id: 'ai', label: 'AI Assistant', icon: '✦' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('plan')
  const [preferences, setPreferences] = useState(null)

  const { mealPlan, groceryList, loading, error, generate, toggleGroceryItem } = useMealPlan()

  const handleGenerate = (prefs) => {
    setPreferences(prefs)
    generate(prefs)
    setActiveTab('plan')
  }

  const uncheckedCount = groceryList.filter((i) => !i.checked).length

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-sage-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🍽️</span>
            <span className="font-display text-xl font-semibold text-sage-800 tracking-tight">
              MealMate
            </span>
          </div>

          {/* Tab nav */}
          <nav className="flex gap-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-sm font-medium transition-all duration-150
                  ${activeTab === tab.id
                    ? 'bg-sage-700 text-white'
                    : 'text-sage-600 hover:bg-sage-100'
                  }`}
              >
                <span className="text-base leading-none">{tab.icon}</span>
                {tab.label}
                {tab.id === 'grocery' && uncheckedCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-clay-400 text-white">
                    {uncheckedCount}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-8">

        {/* Plan tab */}
        {activeTab === 'plan' && (
          <div className="space-y-6 animate-fade-in">
            <PreferencesForm onSubmit={handleGenerate} loading={loading} />

            {error && (
              <div className="px-5 py-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                <strong>Error:</strong> {error}
              </div>
            )}

            {loading && (
              <div className="card p-8 text-center">
                <p className="text-4xl mb-3 animate-bounce">🍳</p>
                <p className="font-display text-lg text-sage-700">Building your meal plan…</p>
                <p className="text-sm text-sage-400 mt-1">This usually takes a few seconds.</p>
              </div>
            )}

            {mealPlan && !loading && (
              <div className="card p-6 space-y-6 animate-slide-up">
                {/* Nutrition summary row */}
                {preferences && (
                  <NutritionSummary plan={mealPlan} days={preferences.days} />
                )}

                <div>
                  <h2 className="font-display text-xl font-semibold text-sage-800 mb-4">
                    Your {preferences?.days}-day meal plan
                  </h2>
                  <MealCalendar plan={mealPlan} days={preferences?.days || 7} />
                </div>

                <p className="text-xs text-sage-400">
                  Tap any meal card to view the full recipe and ingredient substitutions.
                </p>
              </div>
            )}

            {!mealPlan && !loading && (
              <div className="card p-12 text-center animate-fade-in">
                <p className="text-5xl mb-4">🥗</p>
                <p className="font-display text-xl text-sage-700 mb-1">No plan yet</p>
                <p className="text-sm text-sage-400">Fill in your preferences above and generate your first plan.</p>
              </div>
            )}
          </div>
        )}

        {/* Grocery tab */}
        {activeTab === 'grocery' && (
          <div className="card p-6 animate-fade-in">
            <h2 className="font-display text-xl font-semibold text-sage-800 mb-5">
              Grocery list
            </h2>
            <GroceryList items={groceryList} onToggle={toggleGroceryItem} />
          </div>
        )}

        {/* AI Assistant tab */}
        {activeTab === 'ai' && (
          <div className="card p-6 animate-fade-in">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-full bg-sage-600 flex items-center justify-center text-white text-sm">
                ✦
              </div>
              <h2 className="font-display text-xl font-semibold text-sage-800">
                AI Assistant
              </h2>
            </div>
            <AIAssistant />
          </div>
        )}
      </main>
    </div>
  )
}

// ─── Nutrition summary bar ─────────────────────────────────────────────────
function NutritionSummary({ plan, days }) {
  const ALL_DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  const activeDays = ALL_DAYS.slice(0, days)

  let totCal = 0, totProtein = 0, totCarbs = 0, totFat = 0, count = 0
  activeDays.forEach((day) => {
    const n = plan?.week?.[day]?.nutrients
    if (n) {
      totCal += n.calories || 0
      totProtein += n.protein || 0
      totCarbs += n.carbohydrates || 0
      totFat += n.fat || 0
      count++
    }
  })

  if (!count) return null

  const avg = (v) => Math.round(v / count)

  const stats = [
    { label: 'Avg calories', value: avg(totCal).toLocaleString(), unit: 'kcal' },
    { label: 'Avg protein', value: avg(totProtein), unit: 'g' },
    { label: 'Avg carbs', value: avg(totCarbs), unit: 'g' },
    { label: 'Avg fat', value: avg(totFat), unit: 'g' },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {stats.map((s) => (
        <div key={s.label} className="bg-cream-50 border border-cream-200 rounded-xl p-3">
          <p className="text-xs text-sage-500 mb-1">{s.label}</p>
          <p className="text-xl font-display font-semibold text-sage-800">
            {s.value}
            <span className="text-sm font-sans font-normal text-sage-400 ml-1">{s.unit}</span>
          </p>
        </div>
      ))}
    </div>
  )
}
