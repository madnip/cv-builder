import { useState } from 'react'
import { Briefcase, PenTool, LogOut } from 'lucide-react'
import BrutalInterviewer from './BrutalInterviewer'
import ViralHookGenerator from './ViralHookGenerator'

export default function Dashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('interviewer') // 'interviewer' | 'hooks'
  // HARDCODED API KEY FOR MVP (as requested, normally keep this secret or fetch from server)
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSy_YOUR_GEMINI_KEY_PLACEHOLDER"

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-3 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2">
          <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
          <div>
            <h1 className="font-semibold text-sm leading-none">{user.name}</h1>
            <p className="text-xs text-gray-500">AI Tools</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="text-gray-500 hover:text-red-500 transition-colors p-1"
          title="Sign Out"
        >
          <LogOut size={18} />
        </button>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white shrink-0">
        <button
          onClick={() => setActiveTab('interviewer')}
          className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 border-b-2 transition-colors ${
            activeTab === 'interviewer'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Briefcase size={16} />
          Interviewer
        </button>
        <button
          onClick={() => setActiveTab('hooks')}
          className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 border-b-2 transition-colors ${
            activeTab === 'hooks'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          <PenTool size={16} />
          Hooks
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative">
        {activeTab === 'interviewer' ? (
          <BrutalInterviewer apiKey={API_KEY} />
        ) : (
          <ViralHookGenerator apiKey={API_KEY} />
        )}
      </main>
    </div>
  )
}
