/**
 * Centralized commerce configuration
 * 
 * This file contains all default settings for commerce-related functionality.
 * It is designed to be extensible for future features like tax configuration,
 * rounding modes, display currency codes, and VAT settings.
 */

export const COMMERCE_CONFIG = {
  /**
   * Default currency code (ISO 4217)
   */
  currency: "USD",

  /**
   * Default locale for number formatting
   */
  locale: "en-US",

  /**
   * Default number of fraction digits for currency display
   */
  fractionDigits: 2,

  /**
   * Currency display mode (symbol, code, or name)
   */
  currencyDisplay: "symbol" as const,

  /**
   * Rounding mode for calculations
   * Future: Can be extended for different rounding strategies
   */
  roundingMode: "halfEven" as const,

  /**
   * Whether to display currency code alongside the symbol
   * Future: Can be configured per component
   */
  displayCurrencyCode: false,
} as const;

export type CommerceConfig = typeof COMMERCE_CONFIG;
