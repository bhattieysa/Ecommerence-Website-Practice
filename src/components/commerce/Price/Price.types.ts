import type { HTMLAttributes } from 'react';

/**
 * Price component props
 *
 * All monetary values are in minor units (cents, paisa, etc.)
 * @example
 * // $49.99
 * <Price value={4999} />
 *
 * // PKR 1,250.00 with discount
 * <Price value={125000} originalValue={150000} currency="PKR" />
 */
export interface PriceProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Current price in minor units (integer)
   */
  readonly value: number;

  /**
   * Original price in minor units (integer)
   */
  readonly originalValue?: number;

  /**
   * Currency code (ISO 4217)
   */
  readonly currency?: string;

  /**
   * Locale for number formatting
   */
  readonly locale?: string;

  /**
   * Number of fraction digits to display
   */
  readonly fractionDigits?: number;

  /**
   * Whether to show discount badge
   */
  readonly showDiscount?: boolean;

  /**
   * Whether to show original price
   */
  readonly showOriginalPrice?: boolean;
}
