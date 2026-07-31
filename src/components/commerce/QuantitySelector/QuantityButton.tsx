import { Minus, Plus } from 'lucide-react';

import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils/cn';

import { QUANTITY_ARIA_LABELS } from '@/components/commerce/QuantitySelector/Quantity.constants';

type QuantityAction = 'increment' | 'decrement';

interface QuantityButtonProps extends ComponentPropsWithoutRef<'button'> {
  action: QuantityAction;
}

export function QuantityButton({
  action,
  disabled = false,
  onClick,
  className,
  ...props
}: QuantityButtonProps) {
  const Icon = action === 'increment' ? Plus : Minus;

  const ariaLabel =
    action === 'increment'
      ? QUANTITY_ARIA_LABELS.increment
      : QUANTITY_ARIA_LABELS.decrement;

  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick}
      className={cn(
        'flex items-center justify-center p-1 hover:bg-gray-200/50 text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
        className,
      )}
      {...props}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
