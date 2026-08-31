import type { LucideIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface NavItemProps {
  to: string;
  label: string;
  icon: LucideIcon;
}

const NavItem = ({ to, label, icon: Icon }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      end={to === '/admin'}
      className={({ isActive }) =>
        [
          'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200',
          isActive
            ? 'bg-blue-600 text-white shadow-sm'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
        ].join(' ')
      }
    >
      <Icon size={20} />

      <span>{label}</span>
    </NavLink>
  );
};

export default NavItem;
