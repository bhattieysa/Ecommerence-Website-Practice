import type { LabelHTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

interface InputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export function InputLabel({
  children,
  required,
  className,
  ...props
}: InputLabelProps) {
  return (
    <label
      className={cn('mb-2 block text-sm font-medium text-text', className)}
      {...props}
    >
      {children}

      {required && <span className="ml-1 text-danger">*</span>}
    </label>
  );
}
