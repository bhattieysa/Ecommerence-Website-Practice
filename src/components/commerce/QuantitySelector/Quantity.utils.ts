import { QUANTITY_DEFAULTS } from '@/components/commerce/QuantitySelector/Quantity.constants';

export function clampQuantity(
  value: number,
  min: number = QUANTITY_DEFAULTS.min,
  max: number = QUANTITY_DEFAULTS.max,
): number {
  return Math.min(Math.max(value, min), max);
}

export function isValidQuantity(
  value: number,
  min: number = QUANTITY_DEFAULTS.min,
  max: number = QUANTITY_DEFAULTS.max,
): boolean {
  return value >= min && value <= max;
}

export function incrementQuantity(
  value: number,
  step: number,
  min: number,
  max: number,
): number {
  return clampQuantity(value + step, min, max);
}

export function decrementQuantity(
  value: number,
  step: number,
  min: number,
  max: number,
): number {
  return clampQuantity(value - step, min, max);
}

export function parseQuantity(
  value: string,
  min: number = QUANTITY_DEFAULTS.min,
  max: number = QUANTITY_DEFAULTS.max,
): number {
  const parsed = Number.parseInt(value, 10);

  if (Number.isNaN(parsed)) {
    return min;
  }

  return clampQuantity(parsed, min, max);
}

export function canIncrement(
  value: number,
  max: number = QUANTITY_DEFAULTS.max,
): boolean {
  return value < max;
}

export function canDecrement(
  value: number,
  min: number = QUANTITY_DEFAULTS.min,
): boolean {
  return value > min;
}
export function validateQuantityRange(min: number, max: number): void {
  if (min > max) {
    throw new Error('QuantitySelector: min cannot be greater than max.');
  }
}
    