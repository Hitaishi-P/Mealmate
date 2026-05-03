// All requests go through the Vite dev proxy (/api/anthropic → api.anthropic.com).
// The proxy injects x-api-key server-side — your key is never in the browser bundle.
const CLAUDE_URL = '/api/anthropic/v1/messages'

/**
 * Ask Claude for ingredient substitution suggestions.
 * @param {string} ingredient - Name of the ingredient to substitute
 */
export async function getSubstitution(ingredient) {
  const res = await fetch(CLAUDE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 300,
      messages: [
        {
          role: 'user',
          content: `Suggest 3 practical substitutes for "${ingredient}" in a recipe. Keep each to one sentence.`,
        },
      ],
    }),
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error.message)
  return data.content[0].text
}

/**
 * Send a multi-turn conversation to Claude (AI Assistant panel).
 * @param {Array<{role: string, content: string}>} messages - Full conversation history
 */
export async function chatWithAssistant(messages) {
  const res = await fetch(CLAUDE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 600,
      system:
        'You are MealMate AI — a friendly, practical meal planning assistant. ' +
        'Help with ingredient substitutions, recipe ideas, dietary advice, and grocery tips. ' +
        'Keep answers concise and actionable.',
      messages,
    }),
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error.message)
  return data.content[0].text
}