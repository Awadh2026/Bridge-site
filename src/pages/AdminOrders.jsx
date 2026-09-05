import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabase/client'
import { useSEO } from '../hooks/useSEO.jsx'
import { getCached } from '../utils/apiCache'

const ORDERS_STATUS_CACHE_KEY = 'orders_status'

const normalizeValue = (value) => {
  if (value === null || value === undefined || value === '') return 0
  const clean = String(value).replace(/[^0-9.-]/g, '')
  const numeric = Number(clean)
  return Number.isFinite(numeric) ? numeric : 0
}

const pickValue = (obj, keys) => {
  for (const key of keys) {
    if (obj && obj[key] !== undefined && obj[key] !== null && obj[key] !== '') {
      return obj[key]
    }
  }
  return ''
}

const pickNumber = (obj, keys) => normalizeValue(pickValue(obj, keys))

const getOrderId = (order) =>
  pickValue(order, ['order_number', 'order_id', 'id', 'orderId', 'invoice_no', 'tracking_id']) || '—'

const getCustomerName = (order) =>
  pickValue(order, ['customer_name', 'customerName', 'user_name', 'name', 'full_name', 'buyer_name']) || '—'

const getAmount = (order) =>
  pickNumber(order, ['amount', 'total_amount', 'final_amount', 'grand_total', 'total', 'payment_amount'])

const getDeliveryPartner = (order) =>
  pickValue(order, ['delivery_partner', 'deliveryPartner', 'delivery_person', 'delivery_boy', 'partner_name', 'courier_name', 'shipping_partner', 'delivered_by']) || 'Unassigned'

const getStatus = (order) =>
  pickValue(order, ['order_status', 'status', 'delivery_status', 'payment_status']) || 'Pending'

const getDate = (order) => {
  const dateValue = pickValue(order, ['created_at', 'order_date', 'date', 'updated_at'])
  if (!dateValue) return '—'
  const date = new Date(dateValue)
  return Number.isNaN(date.getTime()) ? String(dateValue) : date.toLocaleString()
}

export default function AdminOrders() {
  useSEO({
    title: "Admin Orders - Awadh Info Solution",
    description: "View and manage all orders in your Awadh Info Solution admin dashboard.",
    keywords: "admin dashboard, order management, order tracking",
    url: "https://www.awadhinfosolution.in/#/admin/orders",
  });

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(30)
  const [selectedStatus, setSelectedStatus] = useState('all')
  const navigate = useNavigate()

  useEffect(() => {
    const admin = localStorage.getItem('admin_user')
    if (!admin) {
      navigate('/login')
      return
    }

    fetchOrders()
  }, [navigate])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const data = await getCached(ORDERS_STATUS_CACHE_KEY, async () => {
        const { data: orderData, error: fetchError } = await supabase
          .from('orders_status')
          .select('*')

        if (fetchError) throw fetchError
        return orderData || []
      })

      setOrders(data)
      setError(data.length === 0 ? 'No orders found in orders_status.' : '')
    } catch (err) {
      console.error('Orders fetch error:', err)
      setError('Failed to load orders from orders_status.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [itemsPerPage, selectedStatus])

  const filteredOrders = useMemo(() => {
    if (selectedStatus === 'all') return orders

    return orders.filter((order) => {
      const status = String(getStatus(order)).toLowerCase()
      return status === selectedStatus.toLowerCase()
    })
  }, [orders, selectedStatus])

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / itemsPerPage))
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalCollection = useMemo(
    () => orders.reduce((sum, order) => sum + getAmount(order), 0),
    [orders]
  )

  const upiCollection = useMemo(
    () => orders.reduce((sum, order) => {
      const method = String(pickValue(order, ['payment_method', 'paymentMethod']) || '').toLowerCase()
      return method.includes('upi') || method.includes('phonepe') || method.includes('googlepay') || method.includes('paytm')
        ? sum + getAmount(order)
        : sum
    }, 0),
    [orders]
  )

  const codCollection = useMemo(
    () => orders.reduce((sum, order) => {
      const method = String(pickValue(order, ['payment_method', 'paymentMethod']) || '').toLowerCase()
      return method.includes('cod') || method.includes('cash on delivery') || method.includes('cash')
        ? sum + getAmount(order)
        : sum
    }, 0),
    [orders]
  )

  const completedOrders = useMemo(
    () => orders.filter((order) => {
      const status = String(getStatus(order)).toLowerCase()
      return status.includes('delivered') || status.includes('complete') || status.includes('success')
    }).length,
    [orders]
  )

  const partnerSummary = useMemo(() => {
    const summary = {}

    orders.forEach((order) => {
      const partner = String(getDeliveryPartner(order))
      const amount = getAmount(order)

      if (!summary[partner]) {
        summary[partner] = { partner, count: 0, total: 0 }
      }

      summary[partner].count += 1
      summary[partner].total += amount
    })

    return Object.values(summary).sort((a, b) => b.total - a.total)
  }, [orders])

  const currency = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  })

  const statusCards = [
    { label: 'All Orders', value: orders.length, key: 'all' },
    { label: 'Placed', value: orders.filter((order) => String(getStatus(order)).toLowerCase() === 'placed').length, key: 'placed' },
    { label: 'Confirmed', value: orders.filter((order) => String(getStatus(order)).toLowerCase() === 'confirmed').length, key: 'confirmed' },
    { label: 'Assigned', value: orders.filter((order) => String(getStatus(order)).toLowerCase() === 'assigned').length, key: 'assigned' },
    { label: 'Out for delivery', value: orders.filter((order) => String(getStatus(order)).toLowerCase() === 'out for delivery').length, key: 'out for delivery' },
    { label: 'Delivered', value: orders.filter((order) => String(getStatus(order)).toLowerCase().includes('delivered')).length, key: 'delivered' },
    { label: 'Cancelled', value: orders.filter((order) => String(getStatus(order)).toLowerCase().includes('cancel')).length, key: 'cancelled' }
  ]

  return (
    <div className="min-h-screen bg-app-bg text-app-body p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-app-header">Orders</h1>
            <p className="text-gray-600 mt-1">Track collection totals and delivery partners.</p>
          </div>

          <div className="flex gap-2">
            <Link
              to="/admin/products"
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Products
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

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-7 xl:grid-cols-7 gap-2 mb-6">
          {statusCards.map((card) => (
            <button
              key={card.key}
              type="button"
              onClick={() => setSelectedStatus(card.key)}
              className={`w-full text-left bg-white rounded-xl shadow-sm border p-5 transition hover:shadow-md ${
                selectedStatus === card.key
                  ? 'border-app-accent ring-2 ring-app-accent/20'
                  : 'border-gray-200'
              }`}
            >
              <div className="text-sm text-gray-500">{card.label}</div>
              <div className="mt-3 text-4xl font-bold text-app-header">{card.value}</div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="text-sm text-gray-500">Total Collection</div>
            <div className="mt-2 text-3xl font-bold text-green-700">{currency.format(totalCollection)}</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="text-sm text-gray-500">Collected by UPI</div>
            <div className="mt-2 text-3xl font-bold text-blue-700">{currency.format(upiCollection)}</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="text-sm text-gray-500">Collected by COD</div>
            <div className="mt-2 text-3xl font-bold text-orange-700">{currency.format(codCollection)}</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="text-sm font-medium text-gray-700">
              {selectedStatus === 'all' ? 'All order fields' : `${selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)} orders`}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Rows per page</span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="px-2 py-1 border border-gray-300 rounded-md bg-white"
              >
                <option value={30}>30</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-semibold uppercase text-gray-700">Order Number</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold uppercase text-gray-700">Amount</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold uppercase text-gray-700">Delivery Fee</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold uppercase text-gray-700">GST</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold uppercase text-gray-700">Payment Method</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold uppercase text-gray-700">Payment Status</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold uppercase text-gray-700">Order Status</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold uppercase text-gray-700">Transaction ID</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold uppercase text-gray-700">Created At</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold uppercase text-gray-700">Delivery Partner ID</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold uppercase text-gray-700">Delivery Pin</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold uppercase text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="15" className="px-4 py-10 text-center text-gray-500">Loading orders...</td>
                  </tr>
                ) : filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="15" className="px-4 py-10 text-center text-gray-500">No orders found for this status</td>
                  </tr>
                ) : (
                  paginatedOrders.map((order, index) => (
                    <tr key={`${order.id || getOrderId(order)}-${index}`} className="hover:bg-gray-50 align-top">
                      <td className="px-3 py-3 text-sm text-gray-900">{order.order_number || '—'}</td>
                      <td className="px-3 py-3 text-sm text-gray-700">{currency.format(Number(order.amount || 0))}</td>
                      <td className="px-3 py-3 text-sm text-gray-700">{currency.format(Number(order.delivery_fee || 0))}</td>
                      <td className="px-3 py-3 text-sm text-gray-700">{currency.format(Number(order.gst || 0))}</td>
                      <td className="px-3 py-3 text-sm text-gray-700">{order.payment_method || '—'}</td>
                      <td className="px-3 py-3 text-sm text-gray-700">{order.payment_status || '—'}</td>
                      <td className="px-3 py-3 text-sm text-gray-700">{order.order_status || '—'}</td>
                      <td className="px-3 py-3 text-sm text-gray-700">{order.transaction_id || '—'}</td>
                      <td className="px-3 py-3 text-sm text-gray-700">{getDate(order)}</td>
                      <td className="px-3 py-3 text-sm text-gray-700">{order.delivery_partner_id || '—'}</td>
                      <td className="px-3 py-3 text-sm text-gray-700">{order.delivery_pin || '—'}</td>
                      <td className="px-3 py-3">
                        <Link
                          to={`/admin/orders/${order.id}`}
                          className="inline-flex items-center px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!loading && filteredOrders.length > 0 && (
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4 py-3 border-t border-gray-200 bg-gray-50">
              <div className="text-sm text-gray-600">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length}
              </div>

              <div className="flex items-center gap-2">
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
