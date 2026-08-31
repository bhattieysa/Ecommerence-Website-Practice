import { Bell, Menu, Search } from 'lucide-react';
import { useLocation } from 'react-router-dom';

import UserMenu from './UserMenu';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const { pathname } = useLocation();
  const { user } = useAuth();

  const getPageTitle = () => {
    switch (pathname) {
      case '/admin':
        return 'Dashboard';

      case '/admin/products':
        return 'Products';

      case '/admin/categories':
        return 'Categories';

      case '/admin/banners':
        return 'Banners';

      case '/admin/orders':
        return 'Orders';

      case '/admin/customers':
        return 'Customers';

      case '/admin/settings':
        return 'Settings';

      default:
        return 'MegaMart Admin';
    }
  };

  return (
    <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
      {/* Left */}
      <div className="flex items-center gap-5">
        {/* Mobile menu (later) */}
        <button
          className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
          onClick={onMenuClick}
        >
          <Menu size={22} />
        </button>

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome
          </h1>

          <p className="text-lg text-slate-500">
            Hi 👋, {user?.firstName ? `${user.firstName} ${user.lastName || ''}` : 'Admin'}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden lg:block">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="h-11 w-72 rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
          />
        </div>

        {/* Notifications */}
        <button className="relative rounded-lg border border-slate-200 p-2 hover:bg-slate-50">
          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* User */}
        <UserMenu />
      </div>
    </header>
  );
};

export default Header;
