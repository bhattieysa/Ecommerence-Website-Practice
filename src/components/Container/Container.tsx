import { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import type { ContainerProps } from '@/components/Container/Container.types';
import { containerVariants } from '@/components/Container/ContainerVariant';

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, padding, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(containerVariants({ size, padding, className }))}
        {...props}
      >
        {children}
      </div>
    );
  },
);
