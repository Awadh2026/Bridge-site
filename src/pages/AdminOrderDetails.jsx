import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../supabase/client'
import { useSEO } from '../hooks/useSEO.jsx'
import { getCached, invalidateCache } from '../utils/apiCache'

const ORDERS_STATUS_CACHE_KEY = 'orders_status'
const getOrderCacheKey = (id) => `orders_status:${id}`

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

const statusOptions = ['Pending', 'Confirmed', 'Assigned', 'Out for delivery', 'Delivered', 'Cancelled']

const normalizeStatus = (value) => String(value || '').trim()

export default function AdminOrderDetails() {
  useSEO({
    title: "Order Details - Awadh Info Solution Admin",
    description: "View detailed information about a specific order in your Awadh Info Solution admin dashboard.",
    keywords: "order details, order tracking, admin dashboard",
    url: "https://www.awadhinfosolution.in/#/admin/orders",
  });

  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [orderItems, setOrderItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deliveryPartners, setDeliveryPartners] = useState([])
  const [selectedPartner, setSelectedPartner] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('Pending')
  const [assigning, setAssigning] = useState(false)
  const [statusUpdating, setStatusUpdating] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [delivering, setDelivering] = useState(false)
  const [pinCode, setPinCode] = useState('')
  const [pinError, setPinError] = useState('')
  const [assignPartnerSuccess, setAssignPartnerSuccess] = useState('')
  const [assignPartnerError, setAssignPartnerError] = useState('')
  const [statusUpdateSuccess, setStatusUpdateSuccess] = useState('')
  const [statusUpdateError, setStatusUpdateError] = useState('')

  useEffect(() => {
    const admin = localStorage.getItem('admin_user')
    if (!admin) {
      navigate('/login')
      return
    }

    const fetchOrder = async () => {
      try {
        setLoading(true)
        const data = await getCached(getOrderCacheKey(id), async () => {
          const [{ data: orderData, error: orderError }, { data: itemsData, error: itemsError }] = await Promise.all([
            supabase
              .from('orders_status')
              .select('*, delivery_pin')
              .eq('id', id)
              .maybeSingle(),
            supabase
              .from('order_items')
              .select('*')
              .eq('order_id', id)
          ])

          if (orderError) throw orderError
          if (itemsError) throw itemsError
          return { order: orderData, items: itemsData || [] }
        })

        setOrder(data.order)
        setOrderItems(data.items)
        setSelectedStatus(data.order?.order_status || 'Pending')
        setSelectedPartner(data.order?.delivery_partner_id || '')
        setError(!data.order ? 'Order not found.' : '')
      } catch (err) {
        console.error('Order detail fetch error:', err)
        setError('Failed to load order details.')
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [id, navigate])

  useEffect(() => {
    const fetchDeliveryPartners = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('delivery_partners')
          .select('id, delivery_id, name')
        
        if (fetchError) throw fetchError
        setDeliveryPartners(data || [])
      } catch (err) {
        console.error('Delivery partners fetch error:', err)
      }
    }

    fetchDeliveryPartners()
  }, [])

  const handleAssignDeliveryPartner = async () => {
    if (!selectedPartner) {
      setAssignPartnerError('Please select a delivery partner')
      return
    }

    try {
      setAssigning(true)
      setAssignPartnerError('')
      setAssignPartnerSuccess('')

      const selectedPartnerData = deliveryPartners.find((partner) => partner.id === selectedPartner)
      const nextStatus = 'Assigned'

      const { error: updateError } = await supabase
        .from('orders_status')
        .update({
          delivery_partner_id: selectedPartner,
          order_status: nextStatus
        })
        .eq('id', id)

      if (updateError) throw updateError

      invalidateCache(ORDERS_STATUS_CACHE_KEY)
      invalidateCache(getOrderCacheKey(id))

      const updatedOrder = {
        ...order,
        delivery_partner_id: selectedPartner,
        order_status: nextStatus
      }

      setOrder(updatedOrder)
      setSelectedStatus(nextStatus)
      setAssignPartnerSuccess(`Order assigned to ${selectedPartnerData?.name || 'delivery partner'} and status updated to Assigned successfully.`)
      setSelectedPartner(selectedPartner)

      setTimeout(() => setAssignPartnerSuccess(''), 3000)
    } catch (err) {
      console.error('Assignment error:', err)
      setAssignPartnerError('Failed to assign delivery partner')
    } finally {
      setAssigning(false)
    }
  }

  const handleUpdateOrderStatus = async () => {
    const nextStatus = normalizeStatus(selectedStatus)
    const currentOrderStatus = normalizeStatus(order?.order_status || '')

    if (!nextStatus) {
      setStatusUpdateError('Please select a valid order status.')
      return
    }

    // Define valid status transitions following the order fulfillment flow
    // Flow: Placed → Confirmed → Assigned → Out for Delivery → Delivered
    const validTransitions = {
      'Placed': ['Confirmed', 'Cancelled'],
      'Confirmed': ['Assigned', 'Cancelled'],
      'Assigned': ['Out for delivery', 'Cancelled'],
      'Out for delivery': ['Delivered'],
      'Delivered': [],
      'Cancelled': []
    }

    // Check if the transition is valid (prevent invalid transitions)
    const allowedNextStatuses = validTransitions[currentOrderStatus] || []
    if (!allowedNextStatuses.includes(nextStatus)) {
      setStatusUpdateError(`Cannot change status from "${currentOrderStatus}" to "${nextStatus}". Valid transitions: ${allowedNextStatuses.join(', ') || 'None (final status)'}`)
      return
    }

    // If status is 'Delivered', validate PIN
    if (nextStatus === 'Delivered') {
      if (!pinCode) {
        setPinError('Please enter the delivery PIN')
        return
      }

      if (order?.delivery_pin !== pinCode) {
        setPinError('Invalid PIN. Please try again.')
        setPinCode('')
        return
      }
    }

    try {
      setStatusUpdating(true)
      setStatusUpdateError('')
      setStatusUpdateSuccess('')

      const { error: updateError } = await supabase
        .from('orders_status')
        .update({
          order_status: nextStatus
        })
        .eq('id', id)

      if (updateError) throw updateError

      invalidateCache(ORDERS_STATUS_CACHE_KEY)
      invalidateCache(getOrderCacheKey(id))

      setOrder((currentOrder) => ({
        ...currentOrder,
        order_status: nextStatus
      }))

      setStatusUpdateSuccess(`Order status updated to ${nextStatus} successfully.`)
      setPinCode('')
      setTimeout(() => setStatusUpdateSuccess(''), 3000)
    } catch (err) {
      console.error('Status update error:', err)
      setStatusUpdateError('Failed to update order status.')
    } finally {
      setStatusUpdating(false)
    }
  }

  // Get valid next statuses for current order status
  const getValidNextStatuses = () => {
    const currentOrderStatus = normalizeStatus(order?.order_status || '')
    
    const validTransitions = {
      'Placed': ['Confirmed', 'Cancelled'],
      'Confirmed': ['Assigned', 'Cancelled'],
      'Assigned': ['Out for delivery', 'Cancelled'],
      'Out for delivery': ['Delivered'],
      'Delivered': [],
      'Cancelled': []
    }

    return validTransitions[currentOrderStatus] || []
  }

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

        {successMessage && (
          <div className="mb-4 p-3 rounded-md border border-green-200 bg-green-50 text-green-700">
            {successMessage}
          </div>
        )}

        {loading ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-gray-500">
            Loading order details...
          </div>
        ) : order ? (
          <>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
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

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h2 className="text-lg font-bold text-app-header">Order Items</h2>
              </div>

              {orderItems.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-white border-b border-gray-200 text-xs uppercase tracking-wide text-gray-500">
                      <tr>
                        <th className="px-4 py-3">Item</th>
                        <th className="px-4 py-3">Quantity</th>
                        <th className="px-4 py-3">Unit Price</th>
                        <th className="px-4 py-3">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderItems.map((item, index) => {
                        const itemName = item.product_name || item.product_title || item.name || item.title || item.product_id || 'Item'
                        const quantity = item.quantity ?? item.qty ?? 1
                        const unitPrice = item.unit_price ?? item.price ?? item.product_price
                        const itemTotal = item.total_price ?? item.line_total ?? item.total ?? (Number(unitPrice || 0) * Number(quantity || 0))

                        return (
                          <tr key={item.id || `${itemName}-${index}`} className="border-b border-gray-100 last:border-b-0">
                            <td className="px-4 py-3 font-medium text-gray-800">{itemName}</td>
                            <td className="px-4 py-3 text-gray-600">{quantity}</td>
                            <td className="px-4 py-3 text-gray-600">{unitPrice !== undefined ? formatCurrency(unitPrice) : '—'}</td>
                            <td className="px-4 py-3 font-medium text-gray-800">{formatCurrency(itemTotal)}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="px-4 py-5 text-sm text-gray-500">No items found for this order.</p>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-app-header mb-4">Assign Delivery Partner</h3>

                {assignPartnerError && (
                  <div className="mb-4 p-3 rounded-md border border-red-200 bg-red-50 text-red-700 text-sm">
                    ✕ {assignPartnerError}
                  </div>
                )}

                {assignPartnerSuccess && (
                  <div className="mb-4 p-3 rounded-md border border-green-200 bg-green-50 text-green-700 text-sm">
                    ✓ {assignPartnerSuccess}
                  </div>
                )}

                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Delivery Partner
                    </label>
                    <select
                      value={selectedPartner}
                      onChange={(event) => setSelectedPartner(event.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={assigning || ['Out for delivery', 'Delivered', 'Cancelled'].includes(order?.order_status)}
                    >
                      <option value="">-- Choose a delivery partner --</option>
                      {deliveryPartners.map((partner) => (
                        <option key={partner.id} value={partner.id}>
                          ID: {partner.delivery_id} - {partner.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleAssignDeliveryPartner}
                    disabled={assigning || !selectedPartner || ['Out for delivery', 'Delivered', 'Cancelled'].includes(order?.order_status)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    {assigning ? 'Assigning...' : 'Assign & Set Status to Assigned'}
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-app-header mb-4">Update Order Status</h3>

                {statusUpdateError && (
                  <div className="mb-4 p-3 rounded-md border border-red-200 bg-red-50 text-red-700 text-sm">
                    ✕ {statusUpdateError}
                  </div>
                )}

                {statusUpdateSuccess && (
                  <div className="mb-4 p-3 rounded-md border border-green-200 bg-green-50 text-green-700 text-sm">
                    ✓ {statusUpdateSuccess}
                  </div>
                )}

                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Status: <span className="font-bold text-blue-600">{order?.order_status || 'N/A'}</span>
                    </label>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Next Status
                    </label>
                    <select
                      value={selectedStatus}
                      onChange={(event) => {
                        setSelectedStatus(event.target.value)
                        setStatusUpdateError('')
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={statusUpdating || order?.order_status === 'Delivered'}
                    >
                      <option value="">-- Select a status --</option>
                      {getValidNextStatuses().map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  {order?.order_status !== 'Delivered' && (
                    <div>
                      {selectedStatus === 'Delivered' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Delivery PIN
                          </label>
                          <input
                            type="text"
                            value={pinCode}
                            onChange={(e) => setPinCode(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter delivery PIN"
                          />
                          {pinError && (
                            <p className="mt-2 text-sm text-red-600">{pinError}</p>
                          )}
                        </div>
                      )}

                      <button
                        onClick={handleUpdateOrderStatus}
                        disabled={statusUpdating || !selectedStatus || !getValidNextStatuses().includes(selectedStatus)}
                        className="mt-6 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                      >
                        {statusUpdating ? 'Updating...' : 'Update Status'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {String(order.order_status || '').toLowerCase() === 'assigned' && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <p className="text-green-700 font-medium">
                  ✓ Order has been assigned to a delivery partner and marked as Assigned.
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-gray-500">
            Order not found
          </div>
        )}
      </div>
    </div>
  )
}
