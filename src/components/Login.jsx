import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase/client'
import zingerrLogo from '../assets/zingerr.png'

export default function Login() {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      let matchedUser = null
      const userFieldCandidates = ['userId', 'userid']

      for (const field of userFieldCandidates) {
        try {
          const { data, error } = await supabase
            .from('admin')
            .select('*')
            .eq(field, userId)
            .maybeSingle()

          if (!error && data) {
            matchedUser = data
            break
          }
        } catch (lookupError) {
          // ignore and try the next field name
        }
      }

      if (!matchedUser) {
        setError('Invalid user ID or admin not found')
        setLoading(false)
        return
      }

      if (matchedUser.password !== password) {
        setError('Invalid password')
        setLoading(false)
        return
      }

      localStorage.setItem('admin_user', JSON.stringify(matchedUser))
      navigate('/admin/orders')
    } catch (err) {
      console.error('Login error:', err)
      setError('An error occurred during login. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-app-bg via-white to-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="text-center mb-8">
          <img
            src={zingerrLogo}
            alt="Zingerr Logo"
            className="h-12 mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-app-header">Admin Sign in</h2>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              htmlFor="user-id" 
              className="block text-sm font-medium text-app-header mb-2"
            >
              User ID
            </label>
            <input
              id="user-id"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter your user ID"
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-app-accent focus:ring-offset-2 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-app-header mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-app-accent focus:ring-offset-2 disabled:bg-gray-100"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-app-accent text-white rounded-md font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}