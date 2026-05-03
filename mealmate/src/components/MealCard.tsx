import { useState } from 'react'
import { getRecipeById } from '../utils/spoonacular'
import { getSubstitution } from '../utils/claude'

const MEAL_TYPE_COLORS = {
  breakfast: 'bg-cream-200 text-clay-700',
  lunch: 'bg-sage-100 text-sage-700',
  dinner: 'bg-sage-200 text-sage-800',
}

/**
 * MealCard — single meal tile in the calendar.
 * Clicking it opens a recipe detail modal.
 */
export default function MealCard({ meal, mealType, calories }) {
  const [open, setOpen] = useState(false)
  const [recipe, setRecipe] = useState(null)
  const [loadingRecipe, setLoadingRecipe] = useState(false)
  const [subs, setSubs] = useState({})
  const [subLoading, setSubLoading] = useState({})

  const handleOpen = async () => {
    setOpen(true)
    if (recipe || !meal?.id) return
    setLoadingRecipe(true)
    try {
      const data = await getRecipeById(meal.id)
      setRecipe(data)
    } catch (e) {
      console.error('Recipe load error:', e)
    } finally {
      setLoadingRecipe(false)
    }
  }

  const handleSubstitute = async (ingName) => {
    setSubLoading((s) => ({ ...s, [ingName]: true }))
    try {
      const result = await getSubstitution(ingName)
      setSubs((s) => ({ ...s, [ingName]: result }))
    } catch (e) {
      setSubs((s) => ({ ...s, [ingName]: 'Error: ' + e.message }))
    } finally {
      setSubLoading((s) => ({ ...s, [ingName]: false }))
    }
  }

  const typeColor = MEAL_TYPE_COLORS[mealType] || 'bg-cream-100 text-sage-600'

  return (
    <>
      {/* Card tile */}
      <div className="meal-card animate-fade-in" onClick={handleOpen}>
        <span className={`tag ${typeColor} mb-2`}>{mealType}</span>
        <p className="text-sm font-medium text-sage-900 leading-snug line-clamp-2 mb-2">
          {meal.title}
        </p>
        {calories && (
          <p className="text-xs text-sage-400">~{Math.round(calories / 3)} kcal</p>
        )}
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 modal-backdrop"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="modal-panel bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-sage-100 px-5 py-4 flex items-start justify-between gap-4 rounded-t-2xl z-10">
              <div>
                <span className={`tag ${typeColor} mb-1`}>{mealType}</span>
                <h3 className="font-display text-lg font-semibold text-sage-900 leading-tight">
                  {meal.title}
                </h3>
              </div>
              <button
                className="text-sage-400 hover:text-sage-700 transition-colors mt-1 shrink-0 text-xl leading-none"
                onClick={() => setOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="p-5">
              {loadingRecipe && (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="skeleton h-5 w-full" style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
              )}

              {!loadingRecipe && recipe && (
                <>
                  {/* Image */}
                  {recipe.image && (
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-44 object-cover rounded-xl mb-4"
                    />
                  )}

                  {/* Meta chips */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {recipe.readyInMinutes && (
                      <span className="tag bg-cream-100 text-clay-700">⏱ {recipe.readyInMinutes} min</span>
                    )}
                    {recipe.servings && (
                      <span className="tag bg-sage-100 text-sage-700">🍽 {recipe.servings} servings</span>
                    )}
                    {recipe.diets?.slice(0, 3).map((d) => (
                      <span key={d} className="tag bg-sage-50 text-sage-600 border border-sage-200">{d}</span>
                    ))}
                  </div>

                  {/* Ingredients */}
                  <h4 className="font-display font-semibold text-sage-800 mb-3">Ingredients</h4>
                  <ul className="space-y-2 mb-5">
                    {(recipe.extendedIngredients || []).map((ing) => (
                      <li key={ing.id} className="text-sm">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sage-700">
                            <span className="font-medium">{ing.amount} {ing.unit}</span> {ing.name}
                          </span>
                          <button
                            className="btn-ghost text-xs shrink-0"
                            onClick={() => handleSubstitute(ing.name)}
                            disabled={subLoading[ing.name]}
                          >
                            {subLoading[ing.name] ? '…' : 'Sub?'}
                          </button>
                        </div>
                        {subs[ing.name] && (
                          <div className="mt-1.5 ml-2 px-3 py-2 bg-sage-50 border border-sage-200 rounded-lg text-xs text-sage-700 leading-relaxed">
                            {subs[ing.name]}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>

                  {/* Instructions */}
                  {recipe.instructions && (
                    <>
                      <h4 className="font-display font-semibold text-sage-800 mb-3">Instructions</h4>
                      <div
                        className="text-sm text-sage-600 leading-relaxed prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: recipe.instructions }}
                      />
                    </>
                  )}

                  {/* Source link */}
                  {recipe.sourceUrl && (
                    <a
                      href={recipe.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block mt-4 text-xs text-sage-500 underline underline-offset-2 hover:text-sage-700"
                    >
                      View original recipe →
                    </a>
                  )}
                </>
              )}

              {!loadingRecipe && !recipe && (
                <div className="text-center py-8 text-sage-400">
                  <p className="text-3xl mb-2">🍴</p>
                  <p className="text-sm">Could not load full recipe details.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
