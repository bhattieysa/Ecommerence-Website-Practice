import { forwardRef } from 'react';

import { cn } from '@/lib/utils/cn';

import { CheckboxVariants } from '@/components/Checkbox/CheckboxVariants';
import type { CheckboxProps } from './Checkbox.types';

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, size, label, id, children, ...props }, ref) => {
    const checkboxId =
      id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="flex items-center space-x-2">
        <input
          ref={ref}
          id={checkboxId}
          type="checkbox"
          className={cn(CheckboxVariants({ size }), className)}
          {...props}
        />
        {(label || children) && (
          <label
            htmlFor={checkboxId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label || children}
          </label>
        )}
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';
