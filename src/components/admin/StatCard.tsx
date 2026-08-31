import type { LucideIcon } from 'lucide-react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;

  icon: LucideIcon;

  change?: number;
  changeLabel?: string;

  iconColor?: string;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  change,
  changeLabel,
  iconColor = 'bg-blue-600',
}: StatCardProps) => {
  const positive = (change ?? 0) >= 0;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">{value}</h2>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl text-white ${iconColor}`}
        >
          <Icon size={22} />
        </div>
      </div>

      {change !== undefined && (
        <div className="mt-5 flex items-center gap-2">
          <span
            className={`flex items-center text-sm font-medium ${
              positive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {positive ? (
              <ArrowUpRight size={16} />
            ) : (
              <ArrowDownRight size={16} />
            )}
            {Math.abs(change)}%
          </span>

          <span className="text-sm text-slate-500">{changeLabel}</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
