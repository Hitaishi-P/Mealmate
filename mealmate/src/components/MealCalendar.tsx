import MealCard from './MealCard'
// Renders the weekly meal plan as a responsive grid, one column per day.
// Each cell shows breakfast, lunch, and dinner as MealCard components.
// Also displays the average daily calorie count pulled from Spoonacular's nutrient data.

const ALL_DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
const DAY_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const MEAL_TYPES = ['breakfast', 'lunch', 'dinner']

/**
 * MealCalendar — renders a responsive 7-day (or fewer) grid of MealCards.
 */
export default function MealCalendar({ plan, days = 7 }) {
  const activeDays = ALL_DAYS.slice(0, days)

  // Nutrition summary for a day
  const getDayNutrients = (day) => plan?.week?.[day]?.nutrients || null

  return (
    <div className="overflow-x-auto">
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: `repeat(${activeDays.length}, minmax(130px, 1fr))` }}
      >
        {activeDays.map((day, di) => {
          const meals = plan?.week?.[day]?.meals || []
          const nutrients = getDayNutrients(day)

          return (
            <div key={day} className="flex flex-col gap-2">
              {/* Day header */}
              <div className="text-center">
                <p className="text-xs font-bold text-sage-500 uppercase tracking-widest">
                  {DAY_SHORT[di]}
                </p>
                {nutrients && (
                  <p className="text-[10px] text-sage-400 mt-0.5">
                    {Math.round(nutrients.calories)} kcal
                  </p>
                )}
              </div>

              {/* Meal cards */}
              {meals.length > 0
                ? meals.map((meal, i) => (
                    <MealCard
                      key={meal.id || i}
                      meal={meal}
                      mealType={MEAL_TYPES[i] || 'meal'}
                      calories={nutrients?.calories}
                    />
                  ))
                : MEAL_TYPES.map((t) => (
                    <div key={t} className="meal-card opacity-30 pointer-events-none">
                      <span className="tag bg-cream-100 text-sage-400 mb-1">{t}</span>
                      <div className="h-3 skeleton w-3/4" />
                    </div>
                  ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
