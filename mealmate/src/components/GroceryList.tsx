import { useState, useMemo } from 'react'
import { formatAmount } from '../utils/groceryParser'

/**
 * GroceryList — searchable, checkable, aisle-grouped ingredient list.
 */
export default function GroceryList({ items, onToggle }) {
  const [search, setSearch] = useState('')
  const [hideChecked, setHideChecked] = useState(false)

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase())
      const matchesHide = hideChecked ? !item.checked : true
      return matchesSearch && matchesHide
    })
  }, [items, search, hideChecked])

  // Group by aisle
  const grouped = useMemo(() => {
    const map = new Map()
    filtered.forEach((item) => {
      const aisle = item.aisle || 'Other'
      if (!map.has(aisle)) map.set(aisle, [])
      map.get(aisle).push(item)
    })
    return map
  }, [filtered])

  const checkedCount = items.filter((i) => i.checked).length

  if (items.length === 0) {
    return (
      <div className="text-center py-16 text-sage-400">
        <p className="text-4xl mb-3">🛒</p>
        <p className="font-medium text-sage-600">No grocery list yet</p>
        <p className="text-sm mt-1">Generate a meal plan first.</p>
      </div>
    )
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sage-400 text-sm">🔍</span>
          <input
            className="input-field pl-9"
            placeholder="Search ingredients…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          className={`btn-secondary text-sm whitespace-nowrap ${hideChecked ? 'bg-sage-100' : ''}`}
          onClick={() => setHideChecked((v) => !v)}
        >
          {hideChecked ? 'Show all' : 'Hide checked'}
        </button>
      </div>

      {/* Progress */}
      <div className="mb-5">
        <div className="flex justify-between text-xs text-sage-500 mb-1.5">
          <span>{checkedCount} of {items.length} items</span>
          <span>{Math.round((checkedCount / items.length) * 100)}%</span>
        </div>
        <div className="h-1.5 bg-sage-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-sage-500 rounded-full transition-all duration-300"
            style={{ width: `${(checkedCount / items.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Items grouped by aisle */}
      {filtered.length === 0 ? (
        <p className="text-center text-sage-400 text-sm py-8">No items match your search.</p>
      ) : (
        <div className="space-y-5">
          {[...grouped.entries()].map(([aisle, aisleItems]) => (
            <div key={aisle}>
              <p className="text-xs font-bold text-sage-400 uppercase tracking-widest mb-2">
                {aisle}
              </p>
              <ul className="space-y-0.5">
                {aisleItems.map((item) => (
                  <li
                    key={item.id}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer
                      hover:bg-cream-50 transition-colors group
                      ${item.checked ? 'opacity-50' : ''}`}
                    onClick={() => onToggle(item.id)}
                  >
                    <div
                      className={`w-5 h-5 rounded-md border-2 shrink-0 flex items-center justify-center transition-all
                        ${item.checked
                          ? 'bg-sage-500 border-sage-500'
                          : 'border-sage-300 group-hover:border-sage-500'}`}
                    >
                      {item.checked && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span
                      className={`flex-1 text-sm text-sage-800 ${item.checked ? 'line-through' : ''}`}
                    >
                      {item.name}
                    </span>
                    {item.amount > 0 && (
                      <span className="text-xs text-sage-400 shrink-0">
                        {formatAmount(item.amount)} {item.unit}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
