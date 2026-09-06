import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase/client'
import { useSEO } from '../hooks/useSEO.jsx'
import zingerrLogo from '../assets/zingerr.png'

export default function Login() {
  useSEO({
    title: "Admin Login - Awadh Info Solution & Zingerr",
    description: "Log in to your Awadh Info Solution admin account to manage products, orders, and more.",
    keywords: "admin login, login page, authentication, admin dashboard",
    url: "https://www.awadhinfosolution.in/#/login",
  });

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
      const { data: matchedUser, error: loginError } = await supabase.rpc('verify_admin_login', {
        p_user_id: userId,
        p_password: password
      })

      if (loginError) throw loginError

      if (!matchedUser) {
        setError('Invalid user ID or admin not found')
        setLoading(false)
        return
      }

      let profile = null
      const profileLookupValues = [matchedUser.email, userId].filter(Boolean)

      for (const profileValue of profileLookupValues) {
        const { data, error: profileError } = await supabase
          .from('profiles')
          .select('id, email, role, is_verified, emp_code, full_name, phone')
          .or(`email.eq.${profileValue},emp_code.eq.${profileValue}`)
          .maybeSingle()

        if (!profileError && data) {
          profile = data
          break
        }
      }

      const role = String(profile?.role || matchedUser.role || '').trim().toLowerCase()
      const isAdmin = role === 'admin' || matchedUser.is_admin === true
      const isDeliveryPartner = ['delivery', 'delivery_partner', 'delivery partner'].includes(role)

      localStorage.removeItem('admin_user')
      localStorage.removeItem('delivery_partner')

      if (isAdmin) {
        localStorage.setItem('admin_user', JSON.stringify({ ...matchedUser, ...profile, role }))
        navigate('/admin/orders')
        return
      }

      if (isDeliveryPartner) {
        localStorage.setItem('delivery_partner', JSON.stringify({ ...matchedUser, ...profile, role }))
        navigate('/delivery/orders')
        return
      }

      navigate('/')
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