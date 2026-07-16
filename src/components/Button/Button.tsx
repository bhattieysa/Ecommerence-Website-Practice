import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

import { cn } from '@/utils/cn';

import { buttonVariants } from '@/components/Button/ButtonVariants';
import type { ButtonProps } from './Button.types';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      isLoading,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          buttonVariants({
            variant,
            size,
            fullWidth,
          }),
          className,
        )}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
