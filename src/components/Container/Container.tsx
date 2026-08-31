import { forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';
import type { ContainerProps } from '@/components/Container/Container.types';
import { containerVariants } from '@/components/Container/ContainerVariant';

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(containerVariants({ size }), className)}
        {...props}
      />
    );
  },
);

Container.displayName = 'Container';
