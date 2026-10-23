import { useState, useRef, useEffect } from 'react'
import { GoogleGenAI } from '@google/genai'
import { Send, Loader2, PlayCircle, StopCircle } from 'lucide-react'

export default function BrutalInterviewer({ apiKey }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [roleMode, setRoleMode] = useState(true)
  const [role, setRole] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const startInterview = async (e) => {
    e.preventDefault()
    if (!role.trim()) return

    setRoleMode(false)
    setLoading(true)

    const initialSystemPrompt = `You are the world's most brutally honest and difficult technical interviewer. You are interviewing the user for the role of: ${role}.
    Do not be polite. Point out flaws, ask incredibly difficult follow-up questions, and put them under pressure. Keep your responses relatively short (1-2 paragraphs max).
    Start the interview right away by greeting them curtly and asking your first extremely hard question.`

    try {
      const ai = new GoogleGenAI({ apiKey: apiKey })

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: initialSystemPrompt
      })

      const botReply = response.text
      setMessages([
        { role: 'system', content: initialSystemPrompt },
        { role: 'model', content: botReply }
      ])
    } catch (err) {
      console.error(err)
      setMessages([{ role: 'model', content: 'Error connecting to the API. Is the Gemini API key configured?' }])
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = { role: 'user', content: input }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const ai = new GoogleGenAI({ apiKey: apiKey })

      // Map messages to Gemini format
      const history = newMessages.map(m => {
        if (m.role === 'system') {
          return { role: 'user', parts: [{ text: m.content }] }
        }
        return {
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        }
      })

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: history
      })

      const botReply = response.text
      setMessages([...newMessages, { role: 'model', content: botReply }])
    } catch (err) {
      console.error(err)
      setMessages([...newMessages, { role: 'model', content: 'Error communicating with the API.' }])
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setRoleMode(true)
    setRole('')
    setMessages([])
    setInput('')
  }

  if (roleMode) {
    return (
      <div className="flex flex-col h-full items-center justify-center p-6 bg-gray-50 text-center">
        <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
          <PlayCircle size={24} />
        </div>
        <h2 className="text-xl font-bold mb-2">Brutal Mock Interview</h2>
        <p className="text-sm text-gray-500 mb-6">
          Enter the job title you are applying for. Be prepared for a grueling, high-pressure interview.
        </p>
        <form onSubmit={startInterview} className="w-full max-w-sm">
          <input
            type="text"
            placeholder="e.g. Senior React Developer"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 mb-4 text-sm"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium py-2 px-4 rounded-lg transition-colors flex justify-center items-center gap-2 text-sm"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : 'Start Interview'}
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.filter(m => m.role !== 'system').map((m, idx) => (
          <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] rounded-lg p-3 text-sm ${
                m.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-800 rounded-bl-none border border-gray-200'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && messages.length > 1 && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 rounded-lg rounded-bl-none border border-gray-200 p-3 flex gap-1 items-center">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-3 bg-gray-50 flex items-end gap-2 shrink-0">
        <button
          onClick={reset}
          className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors shrink-0"
          title="End Interview"
        >
          <StopCircle size={20} />
        </button>
        <form onSubmit={sendMessage} className="flex-1 flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage(e);
              }
            }}
            placeholder="Answer the question..."
            className="flex-1 resize-none border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 max-h-32 min-h-[40px]"
            rows={1}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white p-2 rounded-md transition-colors shrink-0 self-end mb-[1px]"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  )
}
