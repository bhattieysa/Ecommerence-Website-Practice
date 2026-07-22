import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils/cn';
import type { BadgeProps } from '@/components/badge/Badge.types';
import { badgeVariants } from '@/components/badge/BadgeVariants';

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { asChild = false, className, variant, size, shape, children, ...props },
    ref,
  ) => {
    const Component = asChild ? Slot : 'span';
    const componentProps = props as Record<string, unknown>;

    return (
      <Component
        ref={ref}
        className={cn(
          badgeVariants({
            variant,
            size,
            shape,
          }),
          className,
        )}
        {...componentProps}
      >
        {children}
      </Component>
    );
  },
);

Badge.displayName = 'Badge';
