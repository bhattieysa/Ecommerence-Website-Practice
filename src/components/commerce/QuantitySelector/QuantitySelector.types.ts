import type { ComponentPropsWithoutRef } from 'react';

import type { VariantProps } from 'class-variance-authority';

import {
  quantitySelectorVariants,
} from '@/components/commerce/QuantitySelector/QuantityVariants';

export interface QuantitySelectorProps
  extends
    ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof quantitySelectorVariants> {
  value: number;

  onValueChange: (value: number) => void;

  min?: number;

  max?: number;

  step?: number;

  disabled?: boolean;

  showInput?: boolean;
}
