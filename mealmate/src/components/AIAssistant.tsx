// Chat panel powered by Claude. Keeps the full conversation history
// so Claude has context across multiple messages. Includes quick suggestion
// buttons so users have somewhere to start if they're not sure what to ask.
import { useState, useRef, useEffect } from 'react'
import { chatWithAssistant } from '../utils/claude'

const SUGGESTIONS = [
  'What can I swap for heavy cream?',
  'High-protein breakfast ideas?',
  'Tips for meal prepping on Sunday?',
  'How do I reduce sodium in my meals?',
]

/**
 * AIAssistant — chat panel powered by Claude API.
 * Maintains full conversation history for multi-turn context.
 */
export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm MealMate AI 🌿 Ask me anything about ingredient swaps, recipes, nutrition, or meal prep.",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const send = async (text) => {
    const content = text || input.trim()
    if (!content || loading) return

    const userMsg = { role: 'user', content }
    const updatedMsgs = [...messages, userMsg]
    setMessages(updatedMsgs)
    setInput('')
    setLoading(true)

    try {
      // Only pass user/assistant turns to the API (skip the initial system-style greeting)
      const apiMessages = updatedMsgs.filter((_, i) => i > 0 || updatedMsgs[0].role === 'user')
      const reply = await chatWithAssistant(
        apiMessages.map(({ role, content }) => ({ role, content }))
      )
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `Sorry, something went wrong: ${e.message}` },
      ])
    } finally {
      setLoading(false)
    }
  }

  const hasClaudeKey = !!import.meta.env.VITE_ANTHROPIC_KEY

  return (
    <div className="flex flex-col h-full min-h-[500px]">
      {!hasClaudeKey && (
        <div className="mb-4 px-4 py-3 bg-cream-100 border border-cream-300 rounded-xl text-sm text-clay-700">
          ⚠️ No Claude API key set. Add <code className="bg-cream-200 px-1 rounded">VITE_ANTHROPIC_KEY</code> to your <code className="bg-cream-200 px-1 rounded">.env</code> file.
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-1">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
          >
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-full bg-sage-600 flex items-center justify-center text-white text-xs shrink-0 mt-0.5 mr-2">
                ✦
              </div>
            )}
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap
                ${msg.role === 'user'
                  ? 'bg-sage-700 text-white rounded-br-sm'
                  : 'bg-cream-50 border border-cream-200 text-sage-800 rounded-bl-sm'
                }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-sage-600 flex items-center justify-center text-white text-xs shrink-0">
              ✦
            </div>
            <div className="bg-cream-50 border border-cream-200 rounded-2xl rounded-bl-sm px-4 py-3">
              <span className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 bg-sage-400 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick suggestions */}
      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              className="text-xs px-3 py-1.5 rounded-full border border-sage-200 text-sage-600 hover:bg-sage-50 transition-colors"
              onClick={() => send(s)}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input bar */}
      <div className="flex gap-2">
        <input
          className="input-field flex-1"
          placeholder="Ask about substitutions, recipes, nutrition…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && send()}
          disabled={loading || !hasClaudeKey}
        />
        <button
          className="btn-primary px-4"
          onClick={() => send()}
          disabled={loading || !input.trim() || !hasClaudeKey}
        >
          →
        </button>
      </div>
    </div>
  )
}
