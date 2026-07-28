import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Typography } from '@/components/Typography';
import { Rating } from '@/components/commerce/Rating';
import { Price } from '@/components/commerce/Price';
import { hasRating, hasDiscount, } from '@/components/commerce/ProductCard/ProductCard.utils';
import { cn } from '@/lib/utils/cn';
export function ProductCardContent({ product, showCategory = true, showRating = true, showOriginalPrice = true, className, }) {
    const productHasRating = hasRating(product.rating, product.reviewCount);
    const productHasDiscount = hasDiscount(product.price, product.originalPrice);
    return (_jsxs("div", { className: cn('flex', 'flex-col', 'gap-2', className), children: [showCategory && product.category && (_jsx(Typography, { variant: "overline", color: "muted", children: product.category })), _jsx(Typography, { variant: "h4", className: "\n          line-clamp-2\n          transition-colors\n          duration-200\n          group-hover:text-primary\n        ", children: product.title }), showRating && productHasRating && (_jsx(Rating, { value: product.rating ?? 0, reviewCount: product.reviewCount })), _jsx(Price, { value: product.price, originalValue: showOriginalPrice && productHasDiscount
                    ? product.originalPrice
                    : undefined })] }));
}
