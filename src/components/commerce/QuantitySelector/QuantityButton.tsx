import { Minus, Plus } from 'lucide-react';

import type { ComponentPropsWithoutRef } from 'react';

import { IconButton } from '@/components/IconButton';
import { cn } from '@/lib/utils/cn';

import { QUANTITY_ARIA_LABELS } from '@/components/commerce/QuantitySelector/Quantity.constants';

type QuantityAction = 'increment' | 'decrement';

interface QuantityButtonProps extends Omit<
  ComponentPropsWithoutRef<typeof IconButton>,
  'children'
> {
  action: QuantityAction;
}

export function QuantityButton({
  action,
  disabled = false,
  onClick,
  className,
  size = 'sm',
  ...props
}: QuantityButtonProps & { size?: 'sm' | 'md' | 'lg' }) {
  const Icon = action === 'increment' ? Plus : Minus;

  const ariaLabel =
    action === 'increment'
      ? QUANTITY_ARIA_LABELS.increment
      : QUANTITY_ARIA_LABELS.decrement;

  return (
    <IconButton
      type="button"
      variant="ghost"
      size={size}
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick}
      className={cn('rounded-none', className)}
      {...props}
    >
      <Icon className="h-4 w-4" />
    </IconButton>
  );
}
