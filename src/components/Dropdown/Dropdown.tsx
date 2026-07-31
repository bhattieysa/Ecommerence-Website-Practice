import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils/cn';

import { DropdownVariants } from '@/components/Dropdown/DropdownVariants';
import type { DropdownProps } from './Dropdown.types';

export const Dropdown = forwardRef<HTMLButtonElement, DropdownProps>(
  (
    { className, size, isActive, label, children, onActiveChange, ...props },
    ref,
  ) => {
    const handleMouseEnter = () => {
      onActiveChange?.(true);
    };

    const handleMouseLeave = () => {
      onActiveChange?.(false);
    };

    return (
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          ref={ref}
          className={cn(
            DropdownVariants({
              size,
              isActive,
            }),
            'transition-all duration-200 ease-in-out',
            className,
          )}
          {...props}
        >
          <span>{label}</span>
          <ChevronDown className="h-4 w-4 transition-transform duration-200" />
        </button>

        {isActive && (
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-48 animate-in fade-in slide-in-from-top-2 transition-all duration-300 ease-in-out">
            {children}
          </div>
        )}
      </div>
    );
  },
);

Dropdown.displayName = 'Dropdown';
