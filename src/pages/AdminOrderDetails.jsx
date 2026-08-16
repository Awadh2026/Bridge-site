import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../supabase/client'

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(Number(value || 0))

const formatDate = (value) => {
  if (!value) return '—'
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? String(value) : parsed.toLocaleString()
}

export default function AdminOrderDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const admin = localStorage.getItem('admin_user')
    if (!admin) {
      navigate('/login')
      return
    }

    const fetchOrder = async () => {
      try {
        setLoading(true)
        const { data, error: fetchError } = await supabase
          .from('orders_status')
          .select('*')
          .eq('id', id)
          .maybeSingle()

        if (fetchError) throw fetchError
        setOrder(data)
        setError(!data ? 'Order not found.' : '')
      } catch (err) {
        console.error('Order detail fetch error:', err)
        setError('Failed to load order details.')
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [id, navigate])

  const fields = useMemo(() => {
    if (!order) return []

    return [
      ['ID', order.id],
      ['User ID', order.user_id],
      ['Amount', formatCurrency(order.amount)],
      ['Delivery Fee', formatCurrency(order.delivery_fee)],
      ['GST', formatCurrency(order.gst)],
      ['Payment Method', order.payment_method],
      ['Payment Status', order.payment_status],
      ['Order Status', order.order_status],
      ['Transaction ID', order.transaction_id],
      ['Created At', formatDate(order.created_at)],
      ['Address ID', order.address_id],
      ['Order Number', order.order_number],
      ['Delivery Partner ID', order.delivery_partner_id],
      ['Delivery Pin', order.delivery_pin],
      ['Address Snapshot', order.address_snapshot ? JSON.stringify(order.address_snapshot, null, 2) : '—']
    ]
  }, [order])

  return (
    <div className="min-h-screen bg-app-bg text-app-body p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-app-header">Order Details</h1>
          </div>

          <div className="flex gap-2">
            <Link
              to="/admin/orders"
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Back to Orders
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem('admin_user')
                navigate('/login')
              }}
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

        {loading ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-gray-500">
            Loading order details...
          </div>
        ) : order ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h2 className="text-lg font-bold text-app-header">Order #{order.order_number || order.id}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {fields.map(([label, value]) => (
                <div key={label} className="border-b border-gray-200 last:border-b-0">
                  <div className="px-4 py-3 bg-gray-50 md:w-full">
                    <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</div>
                    <div className="mt-1 text-sm text-gray-800 whitespace-pre-wrap break-words">{value || '—'}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
