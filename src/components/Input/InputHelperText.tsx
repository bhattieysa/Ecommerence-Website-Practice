import type { HTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

interface InputHelperTextProps extends HTMLAttributes<HTMLParagraphElement> {
  id?: string;
}

export function InputHelperText({
  id,
  className,
  children,
  ...props
}: InputHelperTextProps) {
  return (
    <p
      id={id}
      className={cn('mt-1 text-sm text-text-muted', className)}
      {...props}
    >
      {children}
    </p>
  );
}
