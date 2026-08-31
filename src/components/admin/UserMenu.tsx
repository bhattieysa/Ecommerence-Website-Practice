import { ChevronDown } from 'lucide-react';

const UserMenu = () => {
  return (
    <button
      className="
        flex items-center gap-3
        rounded-lg
        border border-slate-200
        bg-white
        px-3 py-2
        transition
        hover:bg-slate-50
      "
    >
      {/* Avatar */}
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
        A
      </div>

      {/* User Info */}
      <div className="hidden text-left md:block">
        <p className="text-sm font-semibold text-slate-900">Admin</p>

        <p className="text-xs text-slate-500">admin@megamart.com</p>
      </div>

      <ChevronDown size={18} className="hidden text-slate-500 md:block" />
    </button>
  );
};

export default UserMenu;
