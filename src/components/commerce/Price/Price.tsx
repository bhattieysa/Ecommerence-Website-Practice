import { cn } from "@/utils/cn";

import { Typography } from "@/components/Typography";

import { COMMERCE_CONFIG } from "@/config/commerce";
import { formatMoney, calculateDiscount } from "@/lib/money";

import type { PriceProps } from "@/components/commerce/Price/Price.types";

import { PriceDiscount } from "@/components/commerce/Price/PriceDiscount";
import { PriceOriginal } from "@/components/commerce/Price/PriceOriginal";

export function Price({
  value,
  originalValue,
  currency = COMMERCE_CONFIG.currency,
  locale = COMMERCE_CONFIG.locale,
  fractionDigits = COMMERCE_CONFIG.fractionDigits,
  showDiscount = true,
  showOriginalPrice = true,
  className,
  ...props
}: PriceProps) {
  const formattedPrice = formatMoney(
    value,
    currency,
    { locale, fractionDigits }
  );

  const formattedOriginal =
    originalValue &&
    formatMoney(
      originalValue,
      currency,
      { locale, fractionDigits }
    );

  const discount =
    originalValue &&
    calculateDiscount(
      originalValue,
      value
    );

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        className
      )}
      {...props}
    >
      <Typography
        variant="heading5"
        className="font-bold"
      >
        {formattedPrice}
      </Typography>

      {showOriginalPrice &&
        formattedOriginal && (
          <PriceOriginal
            value={formattedOriginal}
          />
        )}

      {showDiscount &&
        discount && (
          <PriceDiscount
            percentage={discount.percentage}
          />
        )}
    </div>
  );
}