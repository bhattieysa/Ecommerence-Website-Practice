import type { HTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

export function InputGroup({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('relative flex items-center', className)} {...props}>
      {children}
    </div>
  );
}
