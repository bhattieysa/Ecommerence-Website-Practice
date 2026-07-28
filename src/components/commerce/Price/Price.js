import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '@/lib/utils/cn';
import { Typography } from '@/components/Typography';
import { COMMERCE_CONFIG } from '@/config/commerce';
import { formatMoney, calculateDiscount } from '@/lib/money';
import { PriceDiscount } from '@/components/commerce/Price/PriceDiscount';
import { PriceOriginal } from '@/components/commerce/Price/PriceOriginal';
export function Price({ value, originalValue, currency = COMMERCE_CONFIG.currency, locale = COMMERCE_CONFIG.locale, fractionDigits = COMMERCE_CONFIG.fractionDigits, showDiscount = true, showOriginalPrice = true, className, ...props }) {
    const formattedPrice = formatMoney(value, currency, {
        locale,
        fractionDigits,
    });
    const formattedOriginal = originalValue &&
        formatMoney(originalValue, currency, { locale, fractionDigits });
    const discount = originalValue && calculateDiscount(originalValue, value);
    return (_jsxs("div", { className: cn('flex items-center gap-2', className), ...props, children: [_jsx(Typography, { variant: "heading5", className: "font-bold", children: formattedPrice }), showOriginalPrice && formattedOriginal && (_jsx(PriceOriginal, { value: formattedOriginal })), showDiscount && discount && (_jsx(PriceDiscount, { percentage: discount.percentage }))] }));
}
