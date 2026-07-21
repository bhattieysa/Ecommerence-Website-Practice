export const QUANTITY_DEFAULTS = {
  value: 1,
  min: 1,
  max: Number.MAX_SAFE_INTEGER,
  step: 1,
} as const;

export const QUANTITY_SIZES = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
} as const;

export const QUANTITY_ARIA_LABELS = {
  increment: 'Increase quantity',
  decrement: 'Decrease quantity',
  input: 'Product quantity',
} as const;

export const QUANTITY_LAYOUT = {
  inputWidth: 'w-16',
} as const;
