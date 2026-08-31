import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, Package, ShoppingBag, Users, ArrowRight } from 'lucide-react';

import { adminService, type Order } from '../../services/adminService';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    products: 0,
    customers: 0,
  });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [ordersResponse, usersResponse] = await Promise.all([
        adminService.getAllOrders({ limit: 5 }),
        adminService.getAllUsers({ limit: 10 }),
      ]);

      const totalRevenue = ordersResponse.orders
        .filter((order) => order.paymentStatus === 'PAID')
        .reduce((sum, order) => sum + order.totalAmount, 0);

      setStats({
        revenue: totalRevenue,
        orders: ordersResponse.pagination.total,
        products: 0, // Will need to add product count API
        customers: usersResponse.pagination.total,
      });

      setRecentOrders(ordersResponse.orders);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const statsCards = [
    {
      title: 'Revenue',
      value: `$${stats.revenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      title: 'Orders',
      value: stats.orders.toString(),
      icon: ShoppingBag,
      color: 'bg-blue-500',
    },
    {
      title: 'Products',
      value: stats.products.toString(),
      icon: Package,
      color: 'bg-orange-500',
    },
    {
      title: 'Customers',
      value: stats.customers.toString(),
      icon: Users,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Admin Dashboard</h2>

        <p className="mt-2 text-slate-500">
          Welcome back! Here's an overview of your store.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {loading ? (
          <div className="col-span-4 flex items-center justify-center py-12">
            <p className="text-slate-500">Loading dashboard...</p>
          </div>
        ) : (
          statsCards.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">{stat.title}</p>

                    <h3 className="mt-2 text-3xl font-bold text-slate-900">
                      {stat.value}
                    </h3>
                  </div>

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}
                  >
                    <Icon className="text-white" size={22} />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Recent Orders & Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Orders */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recent Orders</h3>
            <button
              onClick={() => navigate('/admin/orders')}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
            >
              View All <ArrowRight size={16} />
            </button>
          </div>

          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <p className="text-slate-500">Loading orders...</p>
            </div>
          ) : recentOrders.length === 0 ? (
            <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-slate-300">
              <p className="text-slate-500">No orders yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between rounded-lg border border-slate-200 p-4 hover:bg-slate-50"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <p className="font-medium text-slate-900">{order.orderNumber}</p>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${getOrderStatusBadgeColor(
                          order.orderStatus,
                        )}`}
                      >
                        {order.orderStatus}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">
                      {order.customer?.firstName} {order.customer?.lastName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">
                      ${order.totalAmount.toFixed(2)}
                    </p>
                    <p className="text-xs text-slate-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold">Quick Actions</h3>

          <div className="space-y-3">
            <button
              onClick={() => navigate('/admin/products')}
              className="w-full rounded-lg bg-blue-600 px-4 py-3 text-white transition hover:bg-blue-700"
            >
              + Add Product
            </button>

            <button
              onClick={() => navigate('/admin/customers')}
              className="w-full rounded-lg border border-slate-200 px-4 py-3 transition hover:bg-slate-100"
            >
              Manage Customers
            </button>

            <button
              onClick={() => navigate('/admin/orders')}
              className="w-full rounded-lg border border-slate-200 px-4 py-3 transition hover:bg-slate-100"
            >
              View Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
