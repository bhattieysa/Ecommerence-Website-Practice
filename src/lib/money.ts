/**
 * Money formatting and calculation utilities
 * 
 * All monetary values are stored in minor units (cents, paisa, etc.)
 * to avoid floating-point precision issues.
 */

import { COMMERCE_CONFIG } from "@/config/commerce";
import type { Money, MoneyFormatOptions, DiscountResult } from "@/types/commerce";

/**
 * Converts minor units to major units
 * 
 * @example
 * minorToMajor(4999) // 49.99
 * minorToMajor(125000) // 1250.00
 */
export function minorToMajor(amount: number): number {
  return amount / 100;
}

/**
 * Converts major units to minor units
 * 
 * @example
 * majorToMinor(49.99) // 4999
 * majorToMinor(1250.00) // 125000
 */
export function majorToMinor(amount: number): number {
  return Math.round(amount * 100);
}

/**
 * Formats a monetary value for display
 * 
 * @param amount - Amount in minor units (integer)
 * @param currency - Currency code (ISO 4217)
 * @param options - Formatting options
 * @returns Formatted currency string
 * 
 * @example
 * formatMoney(4999, "USD") // "$49.99"
 * formatMoney(125000, "PKR", { locale: "en-PK" }) // "PKR 1,250.00"
 */
export function formatMoney(
  amount: number,
  currency: string,
  options?: Readonly<MoneyFormatOptions>
): string {
  const {
    locale = COMMERCE_CONFIG.locale,
    fractionDigits = COMMERCE_CONFIG.fractionDigits,
    currencyDisplay = COMMERCE_CONFIG.currencyDisplay,
  } = options || {};

  const majorAmount = minorToMajor(amount);

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
    currencyDisplay,
  }).format(majorAmount);
}

/**
 * Calculates discount percentage and amount
 * 
 * @param originalAmount - Original price in minor units
 * @param currentAmount - Current price in minor units
 * @returns Discount result or null if invalid
 * 
 * @example
 * calculateDiscount(10000, 7500) // { percentage: 25, amount: 2500 }
 * calculateDiscount(10000, 10000) // null
 * calculateDiscount(0, 7500) // null
 */
export function calculateDiscount(
  originalAmount: number,
  currentAmount: number
): DiscountResult | null {
  // Validate inputs
  if (
    originalAmount <= 0 ||
    currentAmount <= 0 ||
    currentAmount >= originalAmount
  ) {
    return null;
  }

  const discountAmount = originalAmount - currentAmount;
  const percentage = Math.round((discountAmount / originalAmount) * 100);

  return {
    percentage,
    amount: discountAmount,
  };
}

/**
 * Formats a Money object for display
 * 
 * @param money - Money object with amount and currency
 * @param options - Formatting options
 * @returns Formatted currency string
 * 
 * @example
 * formatMoneyObject({ amount: 4999, currency: "USD" }) // "$49.99"
 */
export function formatMoneyObject(
  money: Readonly<Money>,
  options?: Readonly<MoneyFormatOptions>
): string {
  return formatMoney(money.amount, money.currency, options);
}
