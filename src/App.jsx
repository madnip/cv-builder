import { useState, useEffect } from 'react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.get(['user_profile'], (result) => {
        if (result.user_profile) {
          setUser(result.user_profile)
        }
        setLoading(false)
      })
    } else {
      const storedUser = localStorage.getItem('user_profile')
      if (storedUser) setUser(JSON.parse(storedUser))
      setLoading(false)
    }
  }, [])

  const handleLogin = (userData) => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.set({ user_profile: userData }, () => {
        setUser(userData)
      })
    } else {
      localStorage.setItem('user_profile', JSON.stringify(userData))
      setUser(userData)
    }
  }

  const handleLogout = () => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.remove(['user_profile'], () => {
        setUser(null)
      })
    } else {
      localStorage.removeItem('user_profile')
      setUser(null)
    }
  }

  if (loading) {
    return <div className="flex h-full items-center justify-center">Loading...</div>
  }

  return (
    <div className="h-full w-full bg-gray-50 flex flex-col overflow-hidden text-gray-800">
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  )
}

export default App
