/**
 * Commerce-related type definitions
 */

/**
 * Money value stored in minor units (cents, paisa, etc.)
 * 
 * @example
 * // $49.99 is stored as 4999
 * // PKR 1,250.00 is stored as 125000
 */
export interface Money {
  /**
   * Amount in minor units (integer)
   */
  readonly amount: number;

  /**
   * Currency code (ISO 4217)
   */
  readonly currency: string;
}

/**
 * Money formatting options
 */
export interface MoneyFormatOptions {
  /**
   * Locale for number formatting
   */
  readonly locale?: string;

  /**
   * Number of fraction digits to display
   */
  readonly fractionDigits?: number;

  /**
   * Currency display mode
   */
  readonly currencyDisplay?: "symbol" | "code" | "name";
}

/**
 * Discount calculation result
 */
export interface DiscountResult {
  /**
   * Discount percentage (0-100)
   */
  readonly percentage: number;

  /**
   * Discount amount in minor units
   */
  readonly amount: number;
}
