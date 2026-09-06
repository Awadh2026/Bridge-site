import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase/client'
import { useSEO } from '../hooks/useSEO.jsx'
import { getCached, invalidateCache } from '../utils/apiCache'

const CATEGORIES_CACHE_KEY = 'categories'
const emptyForm = {
  name: '',
  image_url: '',
  category_code: '',
  rank: '',
  is_available: true
}

export default function AdminCategories() {
  useSEO({
    title: 'Admin Categories - Awadh Info Solution',
    description: 'Manage product categories and their availability on the Awadh Info Solution admin dashboard.',
    keywords: 'admin dashboard, category management, category availability',
    url: 'https://www.awadhinfosolution.in/#/admin/categories'
  })

  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState(null)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState(emptyForm)
  const [categoryFilter, setCategoryFilter] = useState('all')
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('admin_user')) {
      navigate('/login')
      return
    }

    fetchCategories()
  }, [navigate])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const data = await getCached(CATEGORIES_CACHE_KEY, async () => {
        const { data: categoryData, error: fetchError } = await supabase
          .from('categories')
          .select('*')
          .order('rank', { ascending: true, nullsFirst: false })
          .order('name', { ascending: true })

        if (fetchError) throw fetchError
        return categoryData || []
      })

      setCategories(data)
      setError('')
    } catch (err) {
      console.error('Categories fetch error:', err)
      setError('Failed to load categories. Confirm that the categories table exists and is accessible.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const payload = {
        name: formData.name.trim(),
        image_url: formData.image_url.trim() || null,
        category_code: formData.category_code.trim() || null,
        rank: formData.rank === '' ? null : Number(formData.rank),
        is_available: formData.is_available
      }

      const query = editingId
        ? supabase.from('categories').update(payload).eq('id', editingId)
        : supabase.from('categories').insert([payload])
      const { error: saveError } = await query

      if (saveError) throw saveError

      invalidateCache(CATEGORIES_CACHE_KEY)
      setFormData(emptyForm)
      setEditingId(null)
      setShowForm(false)
      fetchCategories()
    } catch (err) {
      console.error('Category save error:', err)
      setError('Failed to save category')
    }
  }

  const toggleAvailability = async (category) => {
    const nextValue = category.is_available !== true
    setSavingId(category.id)

    try {
      const { error: updateError } = await supabase
        .from('categories')
        .update({ is_available: nextValue })
        .eq('id', category.id)

      if (updateError) throw updateError

      invalidateCache(CATEGORIES_CACHE_KEY)
      setCategories((current) => current.map((item) => (
        item.id === category.id ? { ...item, is_available: nextValue } : item
      )))
    } catch (err) {
      console.error('Category availability update error:', err)
      setError('Failed to update category availability')
    } finally {
      setSavingId(null)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_user')
    navigate('/login')
  }

  const startEditing = (category) => {
    setFormData({
      name: category.name || '',
      image_url: category.image_url || '',
      category_code: category.category_code || '',
      rank: category.rank ?? '',
      is_available: category.is_available !== false
    })
    setEditingId(category.id)
    setShowForm(true)
  }

  const categoryCodes = [...new Set(categories.map((category) => category.category_code).filter(Boolean))]
  const filteredCategories = categoryFilter === 'all'
    ? categories
    : categories.filter((category) => category.category_code === categoryFilter)

  return (
    <div className="min-h-screen bg-app-bg text-app-body p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-app-header">Categories</h1>
            <p className="text-gray-600 mt-1">Control which categories are available to customers.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => navigate('/admin/profiles')} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
              Profiles
            </button>
            <button onClick={() => navigate('/admin/products')} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
              Products
            </button>
            <button onClick={() => navigate('/admin/orders')} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
              Orders
            </button>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
              Logout
            </button>
          </div>
        </div>

        {error && <div className="mb-4 p-3 rounded-md border border-red-200 bg-red-50 text-red-700">{error}</div>}

        {showForm && (
          <form onSubmit={handleSubmit} className="mb-6 bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-app-header">{editingId ? 'Edit Category' : 'Add Category'}</h2>
              <button type="button" onClick={() => { setShowForm(false); setEditingId(null); setFormData(emptyForm) }} className="text-sm text-gray-500 hover:text-gray-700">
                Close
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <label className="text-sm font-medium text-gray-700">Name
                <input required value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" />
              </label>
              <label className="text-sm font-medium text-gray-700">Category Code
                <input value={formData.category_code} onChange={(event) => setFormData({ ...formData, category_code: event.target.value })} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" />
              </label>
              <label className="text-sm font-medium text-gray-700">Image URL
                <input value={formData.image_url} onChange={(event) => setFormData({ ...formData, image_url: event.target.value })} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" />
              </label>
              <label className="text-sm font-medium text-gray-700">Rank
                <input type="number" value={formData.rank} onChange={(event) => setFormData({ ...formData, rank: event.target.value })} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" />
              </label>
            </div>
            <label className="mt-4 flex items-center gap-2 text-sm font-medium text-gray-700">
              <input type="checkbox" checked={formData.is_available} onChange={(event) => setFormData({ ...formData, is_available: event.target.checked })} className="h-4 w-4" />
              Available
            </label>
            <div className="mt-4 flex justify-end">
              <button type="submit" className="px-5 py-2 bg-app-accent text-white rounded-md hover:bg-opacity-90">{editingId ? 'Update Category' : 'Save Category'}</button>
            </div>
          </form>
        )}

        <div className="mb-4 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <label className="w-full md:w-64 text-sm font-medium text-gray-700">Filter by category code
            <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
              <option value="all">All category codes</option>
              {categoryCodes.map((code) => <option key={code} value={code}>{code}</option>)}
            </select>
          </label>
          <button onClick={() => { setShowForm(true); setEditingId(null); setFormData(emptyForm) }} className="px-4 py-2 bg-app-accent text-white rounded-md hover:bg-opacity-90">
            + Add Category
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Image</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Code</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Rank</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Available</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr><td colSpan="6" className="px-4 py-10 text-center text-gray-500">Loading categories...</td></tr>
                ) : categories.length === 0 ? (
                  <tr><td colSpan="6" className="px-4 py-10 text-center text-gray-500">No categories found</td></tr>
                ) : filteredCategories.length === 0 ? (
                  <tr><td colSpan="6" className="px-4 py-10 text-center text-gray-500">No categories match this code</td></tr>
                ) : filteredCategories.map((category) => {
                  const available = category.is_available !== false
                  return (
                    <tr key={category.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        {category.image_url ? <img src={category.image_url} alt={category.name} className="h-12 w-12 object-cover rounded-md" /> : <div className="h-12 w-12 rounded-md bg-gray-200 flex items-center justify-center text-xs text-gray-500">No img</div>}
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900">{category.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{category.category_code || '—'}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{category.rank ?? '—'}</td>
                      <td className="px-4 py-3">
                        <button disabled={savingId === category.id} onClick={() => toggleAvailability(category)} className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium disabled:opacity-50 ${available ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}>
                          <span className={`h-2 w-2 rounded-full ${available ? 'bg-green-500' : 'bg-gray-500'}`} />
                          {available ? 'True' : 'False'}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => startEditing(category)} className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">Edit</button>
                      </td>
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