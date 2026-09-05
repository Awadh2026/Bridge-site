import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase/client'
import { useSEO } from '../hooks/useSEO.jsx'
import { getCached, invalidateCache } from '../utils/apiCache'

const CDN_BASE_URL = 'https://cdn.awadhinfosolution.in/'
const PRODUCTS_CACHE_KEY = 'products'

const normalizeImageUrl = (value) => {
  if (!value) return ''

  const trimmedValue = value.trim()
  if (!trimmedValue) return ''
  if (/^https?:\/\//i.test(trimmedValue)) return trimmedValue

  return `${CDN_BASE_URL}${trimmedValue.replace(/^\/+/, '')}`
}

const emptyForm = {
  category_code: '',
  name: '',
  description: '',
  brand: '',
  image_url: '',
  is_active: true,
  is_available: true,
  price: '',
  hindi_name: '',
  product_id: '',
  unit: '',
  final_amount: '',
  discount: '0'
}

export default function AdminProducts() {
  useSEO({
    title: "Admin Products - Awadh Info Solution",
    description: "Manage your product inventory and catalog on the Awadh Info Solution admin dashboard.",
    keywords: "admin dashboard, product management, inventory management",
    url: "https://www.awadhinfosolution.in/#/admin/products",
  });

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(30)
  const [formData, setFormData] = useState(emptyForm)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [productToDelete, setProductToDelete] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const admin = localStorage.getItem('admin_user')
    if (!admin) {
      navigate('/login')
      return
    }
    fetchProducts()
  }, [navigate])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const data = await getCached(PRODUCTS_CACHE_KEY, async () => {
        const { data: productData, error: fetchError } = await supabase
          .from('products')
          .select('*')
          .order('name', { ascending: true })

        if (fetchError) throw fetchError
        return productData || []
      })

      setProducts(data)
      setError('')
    } catch (err) {
      console.error('Fetch error:', err)
      setError('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name?.toLowerCase().includes(search.toLowerCase()) ||
      product.product_id?.toLowerCase().includes(search.toLowerCase()) ||
      product.brand?.toLowerCase().includes(search.toLowerCase()) ||
      product.category_code?.toLowerCase().includes(search.toLowerCase()) ||
      product.description?.toLowerCase().includes(search.toLowerCase())

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && product.is_active) ||
      (statusFilter === 'inactive' && !product.is_active)

    const matchesCategory =
      categoryFilter === 'all' ||
      (product.category_code || '').toLowerCase() === categoryFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesCategory
  })

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage))
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [search, statusFilter, categoryFilter])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const payload = {
        category_code: formData.category_code,
        name: formData.name,
        description: formData.description,
        brand: formData.brand,
        image_url: normalizeImageUrl(formData.image_url),
        is_active: formData.is_active,
        is_available: formData.is_available,
        price: Number(formData.price) || 0,
        hindi_name: formData.hindi_name,
        product_id: formData.product_id,
        unit: formData.unit,
        final_amount: Number(formData.final_amount) || 0,
        discount: Number(formData.discount) || 0
      }

      if (editingId) {
        const { error: updateError } = await supabase
          .from('products')
          .update(payload)
          .eq('id', editingId)

        if (updateError) throw updateError
      } else {
        const { error: insertError } = await supabase
          .from('products')
          .insert([payload])

        if (insertError) throw insertError
      }

      invalidateCache(PRODUCTS_CACHE_KEY)
      setFormData(emptyForm)
      setEditingId(null)
      setShowForm(false)
      fetchProducts()
    } catch (err) {
      console.error('Submit error:', err)
      setError('Failed to save product')
    }
  }

  const handleEdit = (product) => {
    setFormData({
      category_code: product.category_code || '',
      name: product.name || '',
      description: product.description || '',
      brand: product.brand || '',
      image_url: normalizeImageUrl(product.image_url || ''),
      is_active: Boolean(product.is_active),
      is_available: Boolean(product.is_available),
      price: product.price ?? '',
      hindi_name: product.hindi_name || '',
      product_id: product.product_id || '',
      unit: product.unit || '',
      final_amount: product.final_amount ?? '',
      discount: product.discount ?? '0'
    })
    setEditingId(product.id)
    setShowForm(true)
  }

  const openDeleteConfirm = (product) => {
    setProductToDelete(product)
    setShowDeleteConfirm(true)
  }

  const handleDelete = async () => {
    if (!productToDelete) return

    try {
      const { error: deleteError } = await supabase
        .from('products')
        .delete()
        .eq('id', productToDelete.id)

      if (deleteError) throw deleteError

      invalidateCache(PRODUCTS_CACHE_KEY)
      setShowDeleteConfirm(false)
      setProductToDelete(null)
      fetchProducts()
    } catch (err) {
      console.error('Delete error:', err)
      setError('Failed to delete product')
    }
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
            <h1 className="text-3xl md:text-4xl font-bold text-app-header">Products</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/admin/orders')}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Orders
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-md border border-red-200 bg-red-50 text-red-700">
            {error}
          </div>
        )}

        {showDeleteConfirm && productToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
              <h3 className="text-xl font-bold text-app-header">Delete Product</h3>
              <p className="mt-3 text-sm text-gray-600">
                Are you sure you want to delete <span className="font-semibold text-gray-900">{productToDelete.name}</span>?
              </p>
              <p className="mt-1 text-xs text-gray-500">This action cannot be undone.</p>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowDeleteConfirm(false)
                    setProductToDelete(null)
                  }}
                  className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter</label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, product id, category, brand"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-app-accent"
              />
            </div>

            <div className="w-full md:w-44">
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-app-accent"
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="w-full md:w-44">
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-app-accent"
              >
                <option value="all">All Categories</option>
                {[...new Set(products.map((p) => p.category_code).filter(Boolean))].map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="pt-5 md:pt-5">
              <button
                onClick={() => {
                  setShowForm(true)
                  setEditingId(null)
                  setFormData(emptyForm)
                }}
                className="px-4 py-2 bg-app-accent text-white rounded-md hover:bg-opacity-90"
              >
                + Add Product
              </button>
            </div>
          </div>
        </div>

        {showForm && (
          <div className="mb-6 bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-app-header">
                {editingId ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false)
                  setEditingId(null)
                  setFormData(emptyForm)
                }}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category Code</label>
                  <input
                    type="text"
                    value={formData.category_code}
                    onChange={(e) => setFormData({ ...formData, category_code: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product ID</label>
                  <input
                    type="text"
                    value={formData.product_id}
                    onChange={(e) => setFormData({ ...formData, product_id: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hindi Name</label>
                  <input
                    type="text"
                    value={formData.hindi_name}
                    onChange={(e) => setFormData({ ...formData, hindi_name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                  <input
                    type="text"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Final Amount</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.final_amount}
                    onChange={(e) => setFormData({ ...formData, final_amount: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={formData.image_url}
                    onChange={(e) => {
                      const rawValue = e.target.value
                      const nextValue = rawValue.startsWith('http') ? rawValue : normalizeImageUrl(rawValue)
                      setFormData({ ...formData, image_url: nextValue })
                    }}
                    placeholder="https://cdn.awadhinfosolution.in/"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="h-4 w-4"
                  />
                  <label className="text-sm font-medium text-gray-700">Active</label>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    checked={formData.is_available}
                    onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
                    className="h-4 w-4"
                  />
                  <label className="text-sm font-medium text-gray-700">Available</label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 bg-app-accent text-white rounded-md hover:bg-opacity-90"
                >
                  {editingId ? 'Update Product' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Image</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Product</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Description</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Brand</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Price</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Available</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="8" className="px-4 py-10 text-center text-gray-500">Loading products...</td>
                  </tr>
                ) : paginatedProducts.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-4 py-10 text-center text-gray-500">No products found</td>
                  </tr>
                ) : (
                  paginatedProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 align-top">
                      <td className="px-4 py-3">
                        {product.image_url ? (
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="h-12 w-12 object-cover rounded-md"
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-md bg-gray-200 flex items-center justify-center text-xs text-gray-500">No img</div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-xs text-gray-500">{product.product_id || '—'}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 max-w-xs">
                        <div className="line-clamp-2">{product.description || '—'}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{product.category_code || '—'}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{product.brand || '—'}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">₹{Number(product.price || 0).toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${product.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {product.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${product.is_available !== false ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'}`}>
                          {product.is_available !== false ? 'Available' : 'Unavailable'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => openDeleteConfirm(product)}
                            className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!loading && filteredProducts.length > 0 && (
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4 py-3 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Rows per page</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value))
                    setCurrentPage(1)
                  }}
                  className="px-2 py-1 border border-gray-300 rounded-md bg-white"
                >
                  <option value={30}>30</option>
                  <option value={50}>50</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-sm text-gray-600">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length}
                </div>
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1.5 rounded-md border border-gray-300 bg-white text-sm disabled:opacity-50"
                >
                  Prev
                </button>
                <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-3 py-1.5 rounded-md border border-gray-300 bg-white text-sm disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
