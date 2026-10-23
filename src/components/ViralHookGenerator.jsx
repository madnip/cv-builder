import { useState } from 'react'
import { GoogleGenAI } from '@google/genai'
import { Sparkles, Loader2, Copy, Check } from 'lucide-react'

export default function ViralHookGenerator({ apiKey }) {
  const [topic, setTopic] = useState('')
  const [hooks, setHooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [copiedIndex, setCopiedIndex] = useState(null)

  const generateHooks = async (e) => {
    e.preventDefault()
    if (!topic.trim()) return

    setLoading(true)
    setError(null)
    setHooks([])

    try {
      const ai = new GoogleGenAI({ apiKey: apiKey })
      const prompt = `You are an expert social media copywriter who specializes in writing highly engaging, viral "hooks" for TikTok, YouTube Shorts, and Twitter/X.
      When given a topic, write exactly 5 distinct viral hooks.
      Keep them short, punchy, and psychologically compelling (using curiosity, controversy, or strong value props).
      Do NOT include emojis.
      Do NOT number them, just put each hook on a new line separated by '---'.

      Topic: ${topic}`

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      })

      const text = response.text
      const generatedHooks = text.split('---').map(h => h.trim()).filter(h => h.length > 0)
      setHooks(generatedHooks)
    } catch (err) {
      console.error(err)
      setError(err.message || 'Failed to generate hooks. Is the Gemini API key configured?')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-50">
      <div className="p-4 bg-white border-b border-gray-200 shrink-0">
        <p className="text-sm text-gray-600 mb-3">
          Enter a boring topic, get 5 highly engaging viral hooks.
        </p>
        <form onSubmit={generateHooks} className="flex gap-2">
          <input
            type="text"
            placeholder="e.g. How to learn React"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white p-2 rounded transition-colors flex items-center justify-center shrink-0"
            title="Generate"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
          </button>
        </form>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {error && (
          <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        {hooks.length > 0 ? (
          <div className="space-y-3">
            {hooks.map((hook, idx) => (
              <div key={idx} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm relative group pr-10">
                <p className="text-sm text-gray-800">{hook}</p>
                <button
                  onClick={() => copyToClipboard(hook, idx)}
                  className="absolute right-2 top-2 p-1.5 text-gray-400 hover:text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                  title="Copy"
                >
                  {copiedIndex === idx ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
              </div>
            ))}
          </div>
        ) : (
          !loading && !error && (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <Sparkles size={32} className="mb-2 opacity-50" />
              <p className="text-sm">Hooks will appear here</p>
            </div>
          )
        )}
      </div>
    </div>
  )
}
