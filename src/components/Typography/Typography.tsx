import { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import type { TypographyProps } from '@/components/Typography/Typography.types';
import { TypographyVariants } from '@/components/Typography/TypographyVariants';

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  (
    { as, variant, color, align, weight, className, children, ...props },
    ref,
  ) => {
    const Component = as ?? 'p';

    return (
      <Component
        ref={ref}
        className={cn(
          TypographyVariants({
            variant,
            color,
            align,
            weight,
          }),
          className,
        )}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Typography.displayName = 'Typography';
