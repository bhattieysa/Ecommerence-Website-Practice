import {
  LayoutDashboard,
  LogOut,
  Package,
  ShoppingCart,
  Tags,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import NavItem from './NavItem';

const Sidebar = () => {
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-200 bg-white">
      {/* Logo */}
      <div className="border-b border-slate-200 px-6 py-5">
        <Link to="/admin">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            MegaMart
          </h1>

          <p className="text-sm text-slate-500">Admin Dashboard</p>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {/* Main */}
        <div className="mb-8">
          <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Main
          </p>

          <div className="space-y-1">
            <NavItem to="/admin" label="Dashboard" icon={LayoutDashboard} />
          </div>
        </div>

        {/* Catalog */}
        <div className="mb-8">
          <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Catalog
          </p>

          <div className="space-y-1">
            <NavItem to="/admin/products" label="Products" icon={Package} />

            <NavItem to="/admin/categories" label="Categories" icon={Tags} />
          </div>
        </div>

        {/* Sales */}
        <div className="mb-8">
          <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Sales
          </p>

          <div className="space-y-1">
            <NavItem to="/admin/orders" label="Orders" icon={ShoppingCart} />
          </div>
        </div>

        {/* Customers */}
        <div>
          <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Customers
          </p>

          <div className="space-y-1">
            <NavItem to="/admin/customers" label="Customers" icon={Users} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
