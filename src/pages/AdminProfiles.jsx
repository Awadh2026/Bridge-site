import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase/client'
import { useSEO } from '../hooks/useSEO.jsx'
import { getCached, invalidateCache } from '../utils/apiCache'

const PROFILES_CACHE_KEY = 'profiles'
const emptyForm = {
  full_name: '',
  phone: '',
  email: '',
  is_verified: false,
  role: 'user',
  emp_code: ''
}

const formatCreatedAt = (value) => {
  if (!value) return '—'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString()
}

export default function AdminProfiles() {
  useSEO({
    title: 'Admin Profiles - Awadh Info Solution',
    description: 'Manage user profiles, verification, and roles on the Awadh Info Solution admin dashboard.',
    keywords: 'admin dashboard, profile management, user roles, verification',
    url: 'https://www.awadhinfosolution.in/#/admin/profiles'
  })

  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState(null)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState(emptyForm)
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('admin_user')) {
      navigate('/login')
      return
    }

    fetchProfiles()
  }, [navigate])

  const fetchProfiles = async () => {
    try {
      setLoading(true)
      const data = await getCached(PROFILES_CACHE_KEY, async () => {
        const { data: profileData, error: fetchError } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false })

        if (fetchError) throw fetchError
        return profileData || []
      })

      setProfiles(data)
      setError('')
    } catch (err) {
      console.error('Profiles fetch error:', err)
      setError('Failed to load profiles. Confirm that the profiles table exists and is accessible.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const payload = {
        full_name: formData.full_name.trim() || null,
        phone: formData.phone.trim() || null,
        email: formData.email.trim() || null,
        is_verified: formData.is_verified,
        role: formData.role,
        emp_code: formData.emp_code.trim() || null
      }

      const query = editingId
        ? supabase.from('profiles').update(payload).eq('id', editingId)
        : supabase.from('profiles').insert([payload])
      const { error: saveError } = await query

      if (saveError) throw saveError

      invalidateCache(PROFILES_CACHE_KEY)
      setFormData(emptyForm)
      setEditingId(null)
      setShowForm(false)
      fetchProfiles()
    } catch (err) {
      console.error('Profile save error:', err)
      setError(err.code === '23505' ? 'That employee code is already in use.' : 'Failed to save profile')
    }
  }

  const toggleVerified = async (profile) => {
    const nextValue = profile.is_verified !== true
    setSavingId(profile.id)

    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ is_verified: nextValue })
        .eq('id', profile.id)

      if (updateError) throw updateError

      invalidateCache(PROFILES_CACHE_KEY)
      setProfiles((current) => current.map((item) => (
        item.id === profile.id ? { ...item, is_verified: nextValue } : item
      )))
    } catch (err) {
      console.error('Profile verification update error:', err)
      setError('Failed to update profile verification')
    } finally {
      setSavingId(null)
    }
  }

  const startEditing = (profile) => {
    setFormData({
      full_name: profile.full_name || '',
      phone: profile.phone || '',
      email: profile.email || '',
      is_verified: profile.is_verified === true,
      role: profile.role || 'user',
      emp_code: profile.emp_code || ''
    })
    setEditingId(profile.id)
    setShowForm(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_user')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-app-bg text-app-body p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-app-header">Profiles</h1>
            <p className="text-gray-600 mt-1">Manage verification, roles, and employee codes.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => navigate('/admin/categories')} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">Categories</button>
            <button onClick={() => navigate('/admin/products')} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">Products</button>
            <button onClick={() => navigate('/admin/orders')} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">Orders</button>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Logout</button>
          </div>
        </div>

        {error && <div className="mb-4 p-3 rounded-md border border-red-200 bg-red-50 text-red-700">{error}</div>}

        {showForm && (
          <form onSubmit={handleSubmit} className="mb-6 bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-app-header">{editingId ? 'Edit Profile' : 'Add Profile'}</h2>
              <button type="button" onClick={() => { setShowForm(false); setEditingId(null); setFormData(emptyForm) }} className="text-sm text-gray-500 hover:text-gray-700">Close</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <label className="text-sm font-medium text-gray-700">Full name
                <input value={formData.full_name} onChange={(event) => setFormData({ ...formData, full_name: event.target.value })} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" />
              </label>
              <label className="text-sm font-medium text-gray-700">Phone
                <input value={formData.phone} onChange={(event) => setFormData({ ...formData, phone: event.target.value })} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" />
              </label>
              <label className="text-sm font-medium text-gray-700">Email
                <input type="email" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" />
              </label>
              <label className="text-sm font-medium text-gray-700">Role
                <select value={formData.role} onChange={(event) => setFormData({ ...formData, role: event.target.value })} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option value="user">User</option>
                  <option value="delivery_partner">Delivery Partner</option>
                  <option value="admin">Admin</option>
                </select>
              </label>
              <label className="text-sm font-medium text-gray-700">Employee code
                <input value={formData.emp_code} onChange={(event) => setFormData({ ...formData, emp_code: event.target.value })} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" />
              </label>
              <label className="flex items-center gap-2 mt-6 text-sm font-medium text-gray-700">
                <input type="checkbox" checked={formData.is_verified} onChange={(event) => setFormData({ ...formData, is_verified: event.target.checked })} className="h-4 w-4" />
                Verified
              </label>
            </div>
            <div className="mt-4 flex justify-end">
              <button type="submit" className="px-5 py-2 bg-app-accent text-white rounded-md hover:bg-opacity-90">{editingId ? 'Update Profile' : 'Save Profile'}</button>
            </div>
          </form>
        )}

        <div className="mb-4 flex justify-end">
          <button onClick={() => { setShowForm(true); setEditingId(null); setFormData(emptyForm) }} className="px-4 py-2 bg-app-accent text-white rounded-md hover:bg-opacity-90">+ Add Profile</button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Contact</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Role</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Employee Code</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Verified</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Added</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr><td colSpan="7" className="px-4 py-10 text-center text-gray-500">Loading profiles...</td></tr>
                ) : profiles.length === 0 ? (
                  <tr><td colSpan="7" className="px-4 py-10 text-center text-gray-500">No profiles found</td></tr>
                ) : profiles.map((profile) => {
                  const verified = profile.is_verified === true
                  return (
                    <tr key={profile.id} className="hover:bg-gray-50 align-top">
                      <td className="px-4 py-3"><div className="font-medium text-gray-900">{profile.full_name || '—'}</div><div className="text-xs text-gray-500">{profile.id}</div></td>
                      <td className="px-4 py-3 text-sm text-gray-700"><div>{profile.email || '—'}</div><div>{profile.phone || '—'}</div></td>
                      <td className="px-4 py-3 text-sm text-gray-700">{profile.role || 'user'}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{profile.emp_code || '—'}</td>
                      <td className="px-4 py-3"><button disabled={savingId === profile.id} onClick={() => toggleVerified(profile)} className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium disabled:opacity-50 ${verified ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}><span className={`h-2 w-2 rounded-full ${verified ? 'bg-green-500' : 'bg-gray-500'}`} />{verified ? 'True' : 'False'}</button></td>
                      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{formatCreatedAt(profile.created_at)}</td>
                      <td className="px-4 py-3"><button onClick={() => startEditing(profile)} className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">Edit</button></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}