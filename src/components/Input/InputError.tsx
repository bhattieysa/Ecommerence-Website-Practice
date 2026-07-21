import type { HTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

interface InputErrorProps extends HTMLAttributes<HTMLParagraphElement> {
  id?: string;
}

export function InputError({
  id,
  className,
  children,
  ...props
}: InputErrorProps) {
  if (!children) {
    return null;
  }

  return (
    <p
      id={id}
      role="alert"
      className={cn('mt-1 text-sm text-danger', className)}
      {...props}
    >
      {children}
    </p>
  );
}
