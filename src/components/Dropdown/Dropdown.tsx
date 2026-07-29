import { forwardRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils/cn';

import { DropdownVariants } from '@/components/Dropdown/DropdownVariants';
import type { DropdownProps } from './Dropdown.types';

export const Dropdown = forwardRef<HTMLButtonElement, DropdownProps>(
  (
    { className, size, isActive, label, children, onActiveChange, ...props },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
      setIsClicked(true);
      setIsOpen(!isOpen);
      onActiveChange?.(!isOpen);
      setTimeout(() => setIsClicked(false), 150);
    };

    return (
      <div className="relative">
        <button
          ref={ref}
          className={cn(
            DropdownVariants({
              size,
              isActive,
            }),
            isClicked && 'scale-95 transition-transform duration-100',
            className,
          )}
          onClick={handleClick}
          {...props}
        >
          <span>{label}</span>
          <ChevronDown className="h-4 w-4" />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-50">
            {children}
          </div>
        )}
      </div>
    );
  },
);

Dropdown.displayName = 'Dropdown';
