import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase/client'
import { useSEO } from '../hooks/useSEO.jsx'

const getStatus = (order) => String(order.order_status || '').trim() || 'Pending'

const nextStatusFor = (status) => {
  const normalizedStatus = String(status || '').trim().toLowerCase().replace(/[_-]+/g, ' ')

  if (normalizedStatus === 'assigned') return 'Out for delivery'
  if (normalizedStatus === 'out for delivery') return 'Delivered'
  return ''
}

const formatDate = (value) => {
  if (!value) return '—'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString()
}

const isUuid = (value) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value || ''))

export default function DeliveryOrders() {
  useSEO({
    title: 'Delivery Orders - Awadh Info Solution',
    description: 'View assigned delivery orders and update delivery status.',
    keywords: 'delivery partner, assigned orders, delivered orders',
    url: 'https://www.awadhinfosolution.in/#/delivery/orders'
  })

  const [partner, setPartner] = useState(null)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState(null)
  const [pinOrder, setPinOrder] = useState(null)
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const storedPartner = localStorage.getItem('delivery_partner')
    if (!storedPartner) {
      navigate('/login')
      return
    }

    const loadOrders = async () => {
      try {
        const loginProfile = JSON.parse(storedPartner)
        const profileId = loginProfile.id
        const phone = String(loginProfile.phone || '').trim()
        const deliveryId = String(loginProfile.emp_code || loginProfile.delivery_id || '').trim()

        let partnerQuery = supabase
          .from('delivery_partners')
          .select('id, user_id, name, phone, vehicle_number, vehicle_type, is_active, is_online, delivery_id')

        if (phone) {
          partnerQuery = partnerQuery.eq('phone', phone).limit(1)
        } else if (isUuid(profileId)) {
          partnerQuery = partnerQuery.eq('user_id', profileId)
        } else if (deliveryId) {
          partnerQuery = partnerQuery.eq('delivery_id', deliveryId)
        } else {
          throw new Error('Delivery partner phone or UUID is missing')
        }

        const { data: partnerData, error: partnerError } = await partnerQuery.maybeSingle()
        if (partnerError) throw partnerError
        if (!partnerData) throw new Error('Delivery partner record not found')

        const { data: orderData, error: orderError } = await supabase
          .from('orders_status')
          .select('*')
          .eq('delivery_partner_id', partnerData.id)
          .order('created_at', { ascending: false })

        if (orderError) throw orderError
        setPartner(partnerData)
        setOrders(orderData || [])
      } catch (err) {
        console.error('Delivery orders fetch error:', err)
        setError(err.message === 'Delivery partner record not found'
          ? 'Your delivery partner profile has not been created yet.'
          : 'Failed to load delivery orders.')
      } finally {
        setLoading(false)
      }
    }

    loadOrders()
  }, [navigate])

  const deliveredCount = useMemo(
    () => orders.filter((order) => getStatus(order).toLowerCase() === 'delivered').length,
    [orders]
  )

  const activeCount = orders.length - deliveredCount

  const codCollection = useMemo(
    () => orders.reduce((total, order) => {
      const status = getStatus(order).toLowerCase()
      const paymentMethod = String(order.payment_method || '').toLowerCase()
      const isCashOnDelivery = paymentMethod.includes('cod') || paymentMethod.includes('cash')

      return status.includes('cancel') || !isCashOnDelivery
        ? total
        : total + Number(order.amount || 0)
    }, 0),
    [orders]
  )

  const updateStatus = async (order, nextStatus, deliveryPin = null) => {
    setUpdatingId(order.id)
    setError('')

    try {
      if (nextStatus === 'Delivered' && String(order.delivery_pin || '').trim() !== String(deliveryPin || '').trim()) {
        throw new Error('Invalid delivery PIN')
      }

      const { error: updateError } = await supabase
        .from('orders_status')
        .update({ order_status: nextStatus })
        .eq('id', order.id)
        .eq('delivery_partner_id', partner.id)

      if (updateError) throw updateError

      setOrders((current) => current.map((item) => (
        item.id === order.id ? { ...item, order_status: nextStatus } : item
      )))
      setPinOrder(null)
      setPin('')
    } catch (err) {
      console.error('Delivery status update error:', err)
      setError(err.message === 'Invalid delivery PIN' ? 'Invalid delivery PIN.' : 'Failed to update order status.')
    } finally {
      setUpdatingId(null)
    }
  }

  const handleNextStatus = (order) => {
    const nextStatus = nextStatusFor(getStatus(order))
    if (!nextStatus) return

    if (nextStatus === 'Delivered') {
      setPinOrder(order)
      setPin('')
      return
    }

    updateStatus(order, nextStatus)
  }

  const handleLogout = () => {
    localStorage.removeItem('delivery_partner')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-app-bg text-app-body p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-app-header">Delivery Orders</h1>
            <p className="text-gray-600 mt-1">{partner?.name || 'Delivery partner'}{partner?.vehicle_number ? ` · ${partner.vehicle_number}` : ''}</p>
          </div>
          <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Logout</button>
        </div>

        {error && <div className="mb-4 p-3 rounded-md border border-red-200 bg-red-50 text-red-700">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="text-sm text-gray-500">Assigned orders</div>
            <div className="mt-2 text-3xl font-bold text-app-header">{orders.length}</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="text-sm text-gray-500">Pending delivery</div>
            <div className="mt-2 text-3xl font-bold text-orange-700">{activeCount}</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="text-sm text-gray-500">Delivered</div>
            <div className="mt-2 text-3xl font-bold text-green-700">{deliveredCount}</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="text-sm text-gray-500">Cash on delivery</div>
            <div className="mt-2 text-3xl font-bold text-blue-700">₹{codCollection.toFixed(2)}</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Order</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Payment</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Created</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr><td colSpan="6" className="px-4 py-10 text-center text-gray-500">Loading delivery orders...</td></tr>
                ) : orders.length === 0 ? (
                  <tr><td colSpan="6" className="px-4 py-10 text-center text-gray-500">No orders assigned</td></tr>
                ) : orders.map((order) => {
                  const status = getStatus(order)
                  const nextStatus = nextStatusFor(status)
                  return (
                    <tr key={order.id} className="hover:bg-gray-50 align-top">
                      <td className="px-4 py-3 font-medium text-gray-900">{order.order_number || order.id}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">₹{Number(order.amount || 0).toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{order.payment_method || '—'}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{formatDate(order.created_at)}</td>
                      <td className="px-4 py-3"><span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${status.toLowerCase() === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{status}</span></td>
                      <td className="px-4 py-3">
                        {nextStatus ? <button disabled={updatingId === order.id} onClick={() => handleNextStatus(order)} className="px-3 py-1.5 text-sm bg-app-accent text-white rounded-md hover:bg-opacity-90 disabled:opacity-50">{nextStatus === 'Delivered' ? 'Deliver' : 'Start delivery'}</button> : <span className="text-sm text-gray-500">Completed</span>}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {pinOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <form onSubmit={(event) => { event.preventDefault(); updateStatus(pinOrder, 'Delivered', pin) }} className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
              <h2 className="text-xl font-bold text-app-header">Confirm delivery</h2>
              <p className="mt-2 text-sm text-gray-600">Enter the customer delivery PIN for order {pinOrder.order_number || pinOrder.id}.</p>
              <input autoFocus required value={pin} onChange={(event) => setPin(event.target.value)} className="mt-4 w-full px-3 py-2 border border-gray-300 rounded-md" />
              <div className="mt-5 flex justify-end gap-3">
                <button type="button" onClick={() => { setPinOrder(null); setPin('') }} className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700">Cancel</button>
                <button type="submit" disabled={updatingId === pinOrder.id} className="px-4 py-2 rounded-md bg-green-600 text-white disabled:opacity-50">Confirm delivered</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}