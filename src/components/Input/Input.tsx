import { forwardRef } from 'react';

import { cn } from '@/lib/utils/cn';

import type { InputProps } from '@/components/Input/Input.types';
import { inputVariants } from '@/components/Input/InputVariants';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, hasError, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          inputVariants({
            variant,
            size,
            hasError,
          }),
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';
