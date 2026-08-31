import { useState, useEffect } from 'react';
import {
  Eye,
  Pencil,
  Search,
  Trash2,
  Package,
  DollarSign,
  Clock,
  CheckCircle,
  MapPin,
  Mail,
  Plus,
} from 'lucide-react';

import Modal from '../../components/admin/Modal';
import { adminService, type Order } from '../../services/adminService';

// ==================== TYPES & INTERFACES ====================

interface Filters {
  orderStatus: string;
  paymentStatus: string;
  paymentMethod: string;
}

interface OrderForm {
  userId: number;
  items: Array<{ productId: number; quantity: number }>;
  shippingAddress: string;
  billingAddress: string;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  notes: string;
}

interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
}

// ==================== CONSTANTS ====================

const ORDER_STATUSES = ['All', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'] as const;
const PAYMENT_STATUSES = ['All', 'PENDING', 'PAID', 'FAILED', 'REFUNDED'] as const;
const PAYMENT_METHODS = ['All', 'CREDIT_CARD', 'DEBIT_CARD', 'PAYPAL', 'BANK_TRANSFER', 'CASH_ON_DELIVERY'] as const;

// ==================== MAIN COMPONENT ====================

const Orders = () => {
  // ==================== STATE MANAGEMENT ====================

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Filters>({
    orderStatus: 'All',
    paymentStatus: 'All',
    paymentMethod: 'All',
  });
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    itemsPerPage: 10,
    totalPages: 1,
  });

  // Modal states
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Form state
  const [orderForm, setOrderForm] = useState<OrderForm>({
    userId: 0,
    items: [
      { productId: 1, quantity: 2 },
      { productId: 3, quantity: 1 },
    ],
    shippingAddress: '123 Main St, City, State 12345',
    billingAddress: '123 Main St, City, State 12345',
    paymentMethod: 'CREDIT_CARD',
    paymentStatus: 'PENDING',
    orderStatus: 'PROCESSING',
    notes: 'Please leave at door',
  });

  // ==================== API CALLS ====================

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await adminService.getAllOrders({
        page: pagination.currentPage,
        limit: pagination.itemsPerPage,
        orderStatus: filters.orderStatus === 'All' ? undefined : filters.orderStatus,
        paymentStatus: filters.paymentStatus === 'All' ? undefined : filters.paymentStatus,
        paymentMethod: filters.paymentMethod === 'All' ? undefined : filters.paymentMethod,
        search: search || undefined,
      });
      setOrders(response.orders);
      setPagination((prev) => ({
        ...prev,
        totalPages: response.pagination.totalPages,
      }));
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [pagination.currentPage, pagination.itemsPerPage, search, filters.orderStatus, filters.paymentStatus, filters.paymentMethod]);

  // ==================== HELPER FUNCTIONS ====================

  // Get order status badge color
  const getOrderStatusBadgeColor = (status: string): string => {
    switch (status) {
      case 'PROCESSING':
        return 'bg-blue-100 text-blue-700';
      case 'SHIPPED':
        return 'bg-purple-100 text-purple-700';
      case 'DELIVERED':
        return 'bg-green-100 text-green-700';
      case 'CANCELLED':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  // Get payment status badge color
  const getPaymentStatusBadgeColor = (status: string): string => {
    switch (status) {
      case 'PAID':
        return 'bg-green-100 text-green-700';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-700';
      case 'FAILED':
        return 'bg-red-100 text-red-700';
      case 'REFUNDED':
        return 'bg-slate-100 text-slate-600';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  // Filter orders (client-side for demo, should be server-side)
  const getFilteredOrders = (): Order[] => {
    return orders.filter((order) => {
      const matchesSearch =
        order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
        order.customer?.email.toLowerCase().includes(search.toLowerCase()) ||
        order.customer?.firstName.toLowerCase().includes(search.toLowerCase()) ||
        order.customer?.lastName.toLowerCase().includes(search.toLowerCase());

      const matchesOrderStatus =
        filters.orderStatus === 'All' || order.orderStatus === filters.orderStatus;

      const matchesPaymentStatus =
        filters.paymentStatus === 'All' || order.paymentStatus === filters.paymentStatus;

      const matchesPaymentMethod =
        filters.paymentMethod === 'All' || order.paymentMethod === filters.paymentMethod;

      return (
        matchesSearch &&
        matchesOrderStatus &&
        matchesPaymentStatus &&
        matchesPaymentMethod
      );
    });
  };

  // Get paginated orders
  const getPaginatedOrders = (filtered: Order[]): Order[] => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    return filtered.slice(startIndex, endIndex);
  };

  // ==================== CRUD OPERATIONS ====================

  const handleOpenViewModal = (order: Order) => {
    setSelectedOrder(order);
    setIsViewModalOpen(true);
  };

  const handleOpenEditModal = (order: Order) => {
    setSelectedOrder(order);
    setIsEditModalOpen(true);
  };

  const handleUpdateOrder = async (data: { orderStatus?: string; paymentStatus?: string; notes?: string }) => {
    if (!selectedOrder) return;
    try {
      const updateData: any = {};
      if (data.orderStatus) updateData.orderStatus = data.orderStatus as any;
      if (data.paymentStatus) updateData.paymentStatus = data.paymentStatus as any;
      if (data.notes !== undefined) updateData.notes = data.notes;

      const updatedOrder = await adminService.updateOrder(selectedOrder.id, updateData);
      setOrders((prev) =>
        prev.map((order) =>
          order.id === selectedOrder.id ? updatedOrder : order,
        ),
      );
      setIsEditModalOpen(false);
      setSelectedOrder(null);
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const handleOpenDeleteModal = (order: Order) => {
    setSelectedOrder(order);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteOrder = async () => {
    if (!selectedOrder) return;
    try {
      await adminService.deleteOrder(selectedOrder.id);
      setOrders((prev) => prev.filter((order) => order.id !== selectedOrder.id));
      setIsDeleteModalOpen(false);
      setSelectedOrder(null);
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleOpenCreateModal = () => {
    setOrderForm({
      userId: 0,
      items: [
        { productId: 1, quantity: 2 },
        { productId: 3, quantity: 1 },
      ],
      shippingAddress: '123 Main St, City, State 12345',
      billingAddress: '123 Main St, City, State 12345',
      paymentMethod: 'CREDIT_CARD',
      paymentStatus: 'PENDING',
      orderStatus: 'PROCESSING',
      notes: 'Please leave at door',
    });
    setIsCreateModalOpen(true);
  };

  const handleCreateOrder = async () => {
    if (!orderForm.userId || orderForm.items.length === 0 || !orderForm.shippingAddress) {
      alert('Please fill in all required fields');
      return;
    }
    try {
      const newOrder = await adminService.createOrder(orderForm as any);
      setOrders((prev) => [...prev, newOrder]);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  // ==================== COMPUTED VALUES ====================

  const filteredOrders = getFilteredOrders();
  const paginatedOrders = getPaginatedOrders(filteredOrders);
  const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage + 1;
  const endIndex = Math.min(
    startIndex + pagination.itemsPerPage - 1,
    filteredOrders.length,
  );

  // Dashboard stats
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.orderStatus === 'PROCESSING').length;
  const deliveredOrders = orders.filter((o) => o.orderStatus === 'DELIVERED').length;
  const totalRevenue = orders
    .filter((o) => o.paymentStatus === 'PAID')
    .reduce((sum, order) => sum + order.totalAmount, 0);

  // ==================== RENDER ====================

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Orders</h2>
          <p className="mt-1 text-slate-500">
            Manage all orders in your store.
          </p>
        </div>
        <button
          onClick={handleOpenCreateModal}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Order
        </button>
      </div>

      {/* Dashboard Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Orders</p>
              <h3 className="mt-2 text-3xl font-bold text-slate-900">
                {totalOrders}
              </h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Package size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500">Pending Orders</p>
              <h3 className="mt-2 text-3xl font-bold text-slate-900">
                {pendingOrders}
              </h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-600 text-white">
              <Clock size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500">Delivered Orders</p>
              <h3 className="mt-2 text-3xl font-bold text-slate-900">
                {deliveredOrders}
              </h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-white">
              <CheckCircle size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Revenue</p>
              <h3 className="mt-2 text-3xl font-bold text-slate-900">
                ${totalRevenue.toFixed(2)}
              </h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600 text-white">
              <DollarSign size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 outline-none focus:border-blue-500"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <select
              value={filters.orderStatus}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, orderStatus: e.target.value }))
              }
              className="rounded-lg border border-slate-200 px-4 py-2.5 outline-none focus:border-blue-500"
            >
              {ORDER_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status === 'All' ? 'All Status' : status}
                </option>
              ))}
            </select>

            <select
              value={filters.paymentStatus}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  paymentStatus: e.target.value,
                }))
              }
              className="rounded-lg border border-slate-200 px-4 py-2.5 outline-none focus:border-blue-500"
            >
              {PAYMENT_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status === 'All' ? 'All Payment' : status}
                </option>
              ))}
            </select>

            <select
              value={filters.paymentMethod}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  paymentMethod: e.target.value,
                }))
              }
              className="rounded-lg border border-slate-200 px-4 py-2.5 outline-none focus:border-blue-500"
            >
              {PAYMENT_METHODS.map((method) => (
                <option key={method} value={method}>
                  {method === 'All' ? 'All Methods' : method.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      {loading ? (
        <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-white py-16">
          <div className="text-slate-500">Loading orders...</div>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white py-16">
          <Package size={48} className="mb-4 text-slate-300" />
          <h3 className="text-lg font-semibold text-slate-900">
            No Orders Found
          </h3>
          <p className="mt-1 text-slate-500">
            Orders will appear here after customers purchase products.
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr className="border-b border-slate-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Order ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Total
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Payment Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Order Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Payment Method
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Date
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-slate-100 hover:bg-slate-50"
                    >
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {order.orderNumber}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-slate-900">
                            {order.customer?.firstName} {order.customer?.lastName}
                          </p>
                          <p className="text-sm text-slate-500">
                            {order.customer?.email}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        ${order.totalAmount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${getPaymentStatusBadgeColor(
                            order.paymentStatus,
                          )}`}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${getOrderStatusBadgeColor(
                            order.orderStatus,
                          )}`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {order.paymentMethod.replace('_', ' ')}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleOpenViewModal(order)}
                            className="rounded-lg p-2 hover:bg-slate-100"
                            title="View"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => handleOpenEditModal(order)}
                            className="rounded-lg p-2 hover:bg-slate-100"
                            title="Edit"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => handleOpenDeleteModal(order)}
                            className="rounded-lg p-2 hover:bg-red-100 hover:text-red-600"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-6 py-4">
            <p className="text-sm text-slate-500">
              Showing {startIndex}–{endIndex} of {filteredOrders.length}{' '}
              orders
            </p>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    currentPage: Math.max(1, prev.currentPage - 1),
                  }))
                }
                disabled={pagination.currentPage === 1}
                className="rounded-lg border border-slate-200 px-4 py-2 hover:bg-slate-100 disabled:opacity-50"
              >
                Previous
              </button>
              {[...Array(pagination.totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() =>
                    setPagination((prev) => ({
                      ...prev,
                      currentPage: i + 1,
                    }))
                  }
                  className={`rounded-lg px-4 py-2 ${
                    pagination.currentPage === i + 1
                      ? 'bg-blue-600 text-white'
                      : 'border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    currentPage: Math.min(
                      prev.totalPages,
                      prev.currentPage + 1,
                    ),
                  }))
                }
                disabled={pagination.currentPage === pagination.totalPages}
                className="rounded-lg border border-slate-200 px-4 py-2 hover:bg-slate-100 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      {/* ==================== MODALS ==================== */}

      {/* View Order Modal */}
      <Modal
        open={isViewModalOpen}
        title="Order Details"
        subtitle="View complete order information."
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedOrder(null);
        }}
        size="xl"
      >
        {selectedOrder && (
          <div className="space-y-6">
            {/* Customer Information */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h4 className="mb-3 font-semibold text-slate-900">
                Customer Information
              </h4>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500">Email</p>
                    <p className="text-sm font-medium text-slate-900">
                      {selectedOrder.customer?.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h4 className="mb-3 font-semibold text-slate-900">
                Shipping Address
              </h4>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-900">
                    {selectedOrder.shippingAddress}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h4 className="mb-3 font-semibold text-slate-900">
                Ordered Products
              </h4>
              <div className="rounded-lg border border-slate-200">
                <div className="divide-y divide-slate-200">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4">
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">
                          {item.product?.title || `Product #${item.productId}`}
                        </p>
                        <p className="text-sm text-slate-500">
                          Qty: {item.quantity} × ${item.unitPrice.toFixed(2)}
                        </p>
                      </div>
                      <p className="font-semibold text-slate-900">
                        ${item.totalPrice.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h4 className="mb-3 font-semibold text-slate-900">
                Order Summary
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Total</span>
                  <span className="font-medium text-slate-900">
                    ${selectedOrder.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Status */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h4 className="mb-3 font-semibold text-slate-900">
                Order Status
              </h4>
              <div className="flex gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${getOrderStatusBadgeColor(
                    selectedOrder.orderStatus,
                  )}`}
                >
                  {selectedOrder.orderStatus}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${getPaymentStatusBadgeColor(
                    selectedOrder.paymentStatus,
                  )}`}
                >
                  {selectedOrder.paymentStatus}
                </span>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Order Modal */}
      <Modal
        open={isEditModalOpen}
        title="Update Order"
        subtitle="Update order status and payment status."
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedOrder(null);
        }}
        size="lg"
      >
        {selectedOrder && (
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Order Status
              </label>
              <select
                value={selectedOrder.orderStatus}
                onChange={(e) =>
                  setSelectedOrder({
                    ...selectedOrder,
                    orderStatus: e.target.value as any,
                  })
                }
                className="w-full rounded-lg border border-slate-200 px-4 py-2 outline-none focus:border-blue-500"
              >
                {ORDER_STATUSES.slice(1).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Payment Status
              </label>
              <select
                value={selectedOrder.paymentStatus}
                onChange={(e) =>
                  setSelectedOrder({
                    ...selectedOrder,
                    paymentStatus: e.target.value as any,
                  })
                }
                className="w-full rounded-lg border border-slate-200 px-4 py-2 outline-none focus:border-blue-500"
              >
                {PAYMENT_STATUSES.slice(1).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Notes
              </label>
              <textarea
                value={selectedOrder.notes || ''}
                onChange={(e) =>
                  setSelectedOrder({
                    ...selectedOrder,
                    notes: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-slate-200 px-4 py-2 outline-none focus:border-blue-500"
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setSelectedOrder(null);
                }}
                className="rounded-lg border border-slate-200 px-4 py-2 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  handleUpdateOrder({
                    orderStatus: selectedOrder.orderStatus,
                    paymentStatus: selectedOrder.paymentStatus,
                    notes: selectedOrder.notes,
                  })
                }
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={isDeleteModalOpen}
        title="Delete Order"
        subtitle="Are you sure you want to delete this order? This action cannot be undone."
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedOrder(null);
        }}
        size="sm"
      >
        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              setIsDeleteModalOpen(false);
              setSelectedOrder(null);
            }}
            className="rounded-lg border border-slate-200 px-4 py-2 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteOrder}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </Modal>

      {/* Create Order Modal */}
      <Modal
        open={isCreateModalOpen}
        title="Create New Order"
        subtitle="Create a new order for a customer."
        onClose={() => {
          setIsCreateModalOpen(false);
        }}
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              User ID
            </label>
            <input
              type="number"
              value={orderForm.userId}
              onChange={(e) => setOrderForm({ ...orderForm, userId: parseInt(e.target.value) })}
              className="w-full rounded-lg border border-slate-200 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Order Items
            </label>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              {orderForm.items.map((item, index) => (
                <div key={index} className="flex items-center gap-3 mb-2">
                  <div className="flex-1">
                    <label className="text-xs text-slate-500">Product ID</label>
                    <input
                      type="number"
                      value={item.productId}
                      onChange={(e) => {
                        const newItems = [...orderForm.items];
                        newItems[index].productId = parseInt(e.target.value);
                        setOrderForm({ ...orderForm, items: newItems });
                      }}
                      className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="w-24">
                    <label className="text-xs text-slate-500">Quantity</label>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => {
                        const newItems = [...orderForm.items];
                        newItems[index].quantity = parseInt(e.target.value);
                        setOrderForm({ ...orderForm, items: newItems });
                      }}
                      className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                  <button
                    onClick={() => {
                      const newItems = orderForm.items.filter((_, i) => i !== index);
                      setOrderForm({ ...orderForm, items: newItems });
                    }}
                    className="mt-4 text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => setOrderForm({ ...orderForm, items: [...orderForm.items, { productId: 0, quantity: 1 }] })}
                className="mt-2 text-sm text-blue-600 hover:text-blue-700"
              >
                + Add Item
              </button>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Shipping Address
            </label>
            <textarea
              value={orderForm.shippingAddress}
              onChange={(e) => setOrderForm({ ...orderForm, shippingAddress: e.target.value })}
              className="w-full rounded-lg border border-slate-200 px-4 py-2 outline-none focus:border-blue-500"
              rows={2}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Billing Address
            </label>
            <textarea
              value={orderForm.billingAddress}
              onChange={(e) => setOrderForm({ ...orderForm, billingAddress: e.target.value })}
              className="w-full rounded-lg border border-slate-200 px-4 py-2 outline-none focus:border-blue-500"
              rows={2}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Payment Method
            </label>
            <select
              value={orderForm.paymentMethod}
              onChange={(e) => setOrderForm({ ...orderForm, paymentMethod: e.target.value })}
              className="w-full rounded-lg border border-slate-200 px-4 py-2 outline-none focus:border-blue-500"
            >
              <option value="CREDIT_CARD">Credit Card</option>
              <option value="DEBIT_CARD">Debit Card</option>
              <option value="PAYPAL">PayPal</option>
              <option value="BANK_TRANSFER">Bank Transfer</option>
              <option value="CASH_ON_DELIVERY">Cash on Delivery</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Payment Status
            </label>
            <select
              value={orderForm.paymentStatus}
              onChange={(e) => setOrderForm({ ...orderForm, paymentStatus: e.target.value })}
              className="w-full rounded-lg border border-slate-200 px-4 py-2 outline-none focus:border-blue-500"
            >
              <option value="PENDING">Pending</option>
              <option value="PAID">Paid</option>
              <option value="FAILED">Failed</option>
              <option value="REFUNDED">Refunded</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Order Status
            </label>
            <select
              value={orderForm.orderStatus}
              onChange={(e) => setOrderForm({ ...orderForm, orderStatus: e.target.value })}
              className="w-full rounded-lg border border-slate-200 px-4 py-2 outline-none focus:border-blue-500"
            >
              <option value="PROCESSING">Processing</option>
              <option value="SHIPPED">Shipped</option>
              <option value="DELIVERED">Delivered</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Notes
            </label>
            <textarea
              value={orderForm.notes}
              onChange={(e) => setOrderForm({ ...orderForm, notes: e.target.value })}
              className="w-full rounded-lg border border-slate-200 px-4 py-2 outline-none focus:border-blue-500"
              rows={2}
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="rounded-lg border border-slate-200 px-4 py-2 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateOrder}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Create Order
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Orders;
