import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import {
  Eye,
  Pencil,
  Search,
  Users,
  Shield,
  Crown,
  Phone,
  Mail,
  Calendar,
  ShoppingBag,
  Trash2,
  UserPlus,
} from 'lucide-react';

import Modal from '../../components/admin/Modal';
import { adminService, type User } from '../../services/adminService';


interface CustomerForm {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password?: string;
  role: 'ADMIN' | 'CUSTOMER';
  isActive: boolean;
  isVerified: boolean;
}

interface Filters {
  accountStatus: string;
  role: string;
}

interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
}


const ACCOUNT_STATUSES = ['All', 'Active', 'Disabled'] as const;
const ROLES = ['All', 'ADMIN', 'CUSTOMER'] as const;


const Customers = () => {

  const [customers, setCustomers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Filters>({
    accountStatus: 'All',
    role: 'All',
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
  const [selectedCustomer, setSelectedCustomer] = useState<User | null>(null);
  const [editingCustomer, setEditingCustomer] = useState<User | null>(null);

  // Form state
  const [customerForm, setCustomerForm] = useState<CustomerForm>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    role: 'CUSTOMER',
    isActive: true,
    isVerified: false,
  });


  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await adminService.getAllUsers({
        page: pagination.currentPage,
        limit: pagination.itemsPerPage,
        search: search || undefined,
        role: filters.role === 'All' ? undefined : filters.role,
      });
      setCustomers(response.users);
      setPagination((prev) => ({
        ...prev,
        totalPages: response.pagination.totalPages,
      }));
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [pagination.currentPage, pagination.itemsPerPage, search, filters.role]);


  // Get account status badge color
  const getAccountStatusBadgeColor = (isActive: boolean): string => {
    return isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
  };

  // Get role badge color
  const getRoleBadgeColor = (role: string): string => {
    switch (role) {
      case 'ADMIN':
        return 'bg-purple-100 text-purple-700';
      case 'CUSTOMER':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  // Filter customers (client-side for demo, should be server-side)
  const getFilteredCustomers = (): User[] => {
    return customers.filter((customer) => {
      const matchesSearch =
        customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
        customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
        customer.email.toLowerCase().includes(search.toLowerCase());

      const matchesAccountStatus =
        filters.accountStatus === 'All' ||
        (filters.accountStatus === 'Active' && customer.isActive) ||
        (filters.accountStatus === 'Disabled' && !customer.isActive);

      const matchesRole =
        filters.role === 'All' || customer.role === filters.role;

      return matchesSearch && matchesAccountStatus && matchesRole;
    });
  };

  // Get paginated customers
  const getPaginatedCustomers = (filtered: User[]): User[] => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    return filtered.slice(startIndex, endIndex);
  };

  // ==================== FORM HANDLERS ====================

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setCustomerForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const resetForm = () => {
    setCustomerForm({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
      role: 'CUSTOMER',
      isActive: true,
      isVerified: false,
    });
    setEditingCustomer(null);
  };


  const handleOpenViewModal = (customer: User) => {
    setSelectedCustomer(customer);
    setIsViewModalOpen(true);
  };

  const handleOpenEditModal = (customer: User) => {
    setEditingCustomer(customer);
    setCustomerForm({
      firstName: customer.firstName,
      lastName: customer.lastName,
      phone: customer.phone || '',
      email: customer.email,
      role: customer.role,
      isActive: customer.isActive,
      isVerified: customer.isVerified,
    });
    setIsEditModalOpen(true);
  };

  const handleOpenCreateModal = () => {
    resetForm();
    setIsCreateModalOpen(true);
  };

  const handleCreateCustomer = async () => {
    if (!customerForm.password) {
      alert('Password is required');
      return;
    }
    try {
      const newUser = await adminService.createUser({
        firstName: customerForm.firstName,
        lastName: customerForm.lastName,
        email: customerForm.email,
        phone: customerForm.phone,
        password: customerForm.password,
        role: customerForm.role,
      });
      setCustomers((prev) => [...prev, newUser]);
      setIsCreateModalOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };

  const handleUpdateCustomer = async () => {
    if (!editingCustomer) return;
    try {
      const updatedUser = await adminService.updateUser(editingCustomer.id, customerForm);
      setCustomers((prev) =>
        prev.map((customer) =>
          customer.id === editingCustomer.id ? updatedUser : customer,
        ),
      );
      setIsEditModalOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  const handleToggleAccountStatus = async () => {
    if (!selectedCustomer) return;
    try {
      const updatedUser = await adminService.updateUser(selectedCustomer.id, {
        isActive: !selectedCustomer.isActive,
      });
      setCustomers((prev) =>
        prev.map((customer) =>
          customer.id === selectedCustomer.id ? updatedUser : customer,
        ),
      );
      setIsViewModalOpen(false);
      setSelectedCustomer(null);
    } catch (error) {
      console.error('Error toggling account status:', error);
    }
  };

  const handleOpenDeleteModal = (customer: User) => {
    setSelectedCustomer(customer);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCustomer = async () => {
    if (!selectedCustomer) return;
    try {
      await adminService.deleteUser(selectedCustomer.id);
      setCustomers((prev) => prev.filter((customer) => customer.id !== selectedCustomer.id));
      setIsDeleteModalOpen(false);
      setSelectedCustomer(null);
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };


  const filteredCustomers = getFilteredCustomers();
  const paginatedCustomers = getPaginatedCustomers(filteredCustomers);
  const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage + 1;
  const endIndex = Math.min(
    startIndex + pagination.itemsPerPage - 1,
    filteredCustomers.length,
  );

  // Dashboard stats
  const totalCustomers = customers.length;
  const adminCount = customers.filter((c) => c.role === 'ADMIN').length;
  const activeCustomers = customers.filter((c) => c.isActive).length;
  const totalOrders = customers.reduce((sum, c) => sum + c.orderCount, 0);


  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Customers</h2>
          <p className="mt-1 text-slate-500">
            Manage all customers and their accounts.
          </p>
        </div>
        <button
          onClick={handleOpenCreateModal}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <UserPlus size={18} />
          Add Customer
        </button>
      </div>

      {/* Dashboard Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Customers</p>
              <h3 className="mt-2 text-3xl font-bold text-slate-900">
                {totalCustomers}
              </h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Users size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500">Admin Users</p>
              <h3 className="mt-2 text-3xl font-bold text-slate-900">
                {adminCount}
              </h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600 text-white">
              <Crown size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500">Active Customers</p>
              <h3 className="mt-2 text-3xl font-bold text-slate-900">
                {activeCustomers}
              </h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-white">
              <Shield size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Orders</p>
              <h3 className="mt-2 text-3xl font-bold text-slate-900">
                {totalOrders}
              </h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <ShoppingBag size={22} />
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
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 outline-none focus:border-blue-500"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <select
              value={filters.accountStatus}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  accountStatus: e.target.value,
                }))
              }
              className="rounded-lg border border-slate-200 px-4 py-2.5 outline-none focus:border-blue-500"
            >
              {ACCOUNT_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status === 'All' ? 'All Status' : status}
                </option>
              ))}
            </select>

            <select
              value={filters.role}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  role: e.target.value,
                }))
              }
              className="rounded-lg border border-slate-200 px-4 py-2.5 outline-none focus:border-blue-500"
            >
              {ROLES.map((role) => (
                <option key={role} value={role}>
                  {role === 'All' ? 'All Roles' : role}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      {loading ? (
        <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-white py-16">
          <div className="text-slate-500">Loading customers...</div>
        </div>
      ) : filteredCustomers.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white py-16">
          <Users size={48} className="mb-4 text-slate-300" />
          <h3 className="text-lg font-semibold text-slate-900">
            No Customers Found
          </h3>
          <p className="mt-1 text-slate-500">
            Customers will appear here after they register.
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
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Phone
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Orders
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Joined Date
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedCustomers.map((customer) => (
                    <tr
                      key={customer.id}
                      className="border-b border-slate-100 hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-medium">
                            {customer.firstName[0]}{customer.lastName[0]}
                          </div>
                          <span className="font-medium text-slate-900">
                            {customer.firstName} {customer.lastName}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {customer.email}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {customer.phone || '-'}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {customer.orderCount}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${getAccountStatusBadgeColor(
                            customer.isActive,
                          )}`}
                        >
                          {customer.isActive ? 'Active' : 'Disabled'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${getRoleBadgeColor(
                            customer.role,
                          )}`}
                        >
                          {customer.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {new Date(customer.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleOpenViewModal(customer)}
                            className="rounded-lg p-2 hover:bg-slate-100"
                            title="View"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => handleOpenEditModal(customer)}
                            className="rounded-lg p-2 hover:bg-slate-100"
                            title="Edit"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => handleOpenDeleteModal(customer)}
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
              Showing {startIndex}–{endIndex} of {filteredCustomers.length}{' '}
              customers
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

      {/* View Customer Modal */}
      <Modal
        open={isViewModalOpen}
        title="Customer Details"
        subtitle="View complete customer information."
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedCustomer(null);
        }}
        size="xl"
      >
        {selectedCustomer && (
          <div className="space-y-6">
            {/* Profile Information */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h4 className="mb-3 font-semibold text-slate-900">
                Profile Information
              </h4>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500">Email</p>
                    <p className="text-sm font-medium text-slate-900">
                      {selectedCustomer.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500">Phone</p>
                    <p className="text-sm font-medium text-slate-900">
                      {selectedCustomer.phone || '-'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500">Joined Date</p>
                    <p className="text-sm font-medium text-slate-900">
                      {new Date(selectedCustomer.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ShoppingBag size={16} className="text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500">Total Orders</p>
                    <p className="text-sm font-medium text-slate-900">
                      {selectedCustomer.orderCount}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Status */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h4 className="mb-3 font-semibold text-slate-900">
                Account Status
              </h4>
              <div className="flex items-center gap-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${getAccountStatusBadgeColor(
                    selectedCustomer.isActive,
                  )}`}
                >
                  {selectedCustomer.isActive ? 'Active' : 'Disabled'}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${getRoleBadgeColor(
                    selectedCustomer.role,
                  )}`}
                >
                  {selectedCustomer.role}
                </span>
                {selectedCustomer.isVerified && (
                  <span className="rounded-full px-3 py-1 text-xs font-medium bg-green-100 text-green-700">
                    Verified
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                onClick={handleToggleAccountStatus}
                className={`rounded-lg px-4 py-2 font-medium ${
                  selectedCustomer.isActive
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {selectedCustomer.isActive ? 'Disable Account' : 'Enable Account'}
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Customer Modal */}
      <Modal
        open={isEditModalOpen}
        title="Edit Customer"
        subtitle="Update customer information."
        onClose={() => {
          setIsEditModalOpen(false);
          resetForm();
        }}
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={customerForm.firstName}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 px-4 py-2 outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={customerForm.lastName}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 px-4 py-2 outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={customerForm.phone}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Role
            </label>
            <select
              name="role"
              value={customerForm.role}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 px-4 py-2 outline-none focus:border-blue-500"
            >
              <option value="CUSTOMER">Customer</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isActive"
                checked={customerForm.isActive}
                onChange={handleChange}
                className="rounded border-slate-300"
              />
              <span className="text-sm text-slate-700">Active</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isVerified"
                checked={customerForm.isVerified}
                onChange={handleChange}
                className="rounded border-slate-300"
              />
              <span className="text-sm text-slate-700">Verified</span>
            </label>
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                setIsEditModalOpen(false);
                resetForm();
              }}
              className="rounded-lg border border-slate-200 px-4 py-2 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateCustomer}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={isDeleteModalOpen}
        title="Delete Customer"
        subtitle="Are you sure you want to delete this customer? This action cannot be undone."
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedCustomer(null);
        }}
        size="sm"
      >
        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              setIsDeleteModalOpen(false);
              setSelectedCustomer(null);
            }}
            className="rounded-lg border border-slate-200 px-4 py-2 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteCustomer}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </Modal>

      {/* Create Customer Modal */}
      <Modal
        open={isCreateModalOpen}
        title="Add New Customer"
        subtitle="Create a new customer account."
        onClose={() => {
          setIsCreateModalOpen(false);
          resetForm();
        }}
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={customerForm.firstName}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 px-4 py-2 outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={customerForm.lastName}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 px-4 py-2 outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={customerForm.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={customerForm.phone}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={customerForm.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Role
            </label>
            <select
              name="role"
              value={customerForm.role}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 px-4 py-2 outline-none focus:border-blue-500"
            >
              <option value="CUSTOMER">Customer</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                setIsCreateModalOpen(false);
                resetForm();
              }}
              className="rounded-lg border border-slate-200 px-4 py-2 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateCustomer}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Create Customer
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Customers;
