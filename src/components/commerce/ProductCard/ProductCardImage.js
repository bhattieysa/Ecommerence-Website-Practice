import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from '@/components/badge';
import { ProductImage } from '../ProductImage/ProductImage';
import { cn } from '@/lib/utils/cn';
import { hasBadge, isInStock, } from '@/components/commerce/ProductCard/ProductCard.utils';
export function ProductCardImage({ product, className, }) {
    const available = isInStock(product);
    return (_jsxs("div", { className: cn('relative overflow-hidden', 'aspect-square', className), children: [_jsx(ProductImage, { src: product.image.src, alt: product.title, className: "h-full w-full object-cover transition-all duration-300 ease-in-out group-hover:scale-105" }), hasBadge(product) && (_jsx(Badge, { className: "absolute left-3 top-3", children: product.badge })), !available && (_jsx("div", { className: cn('absolute inset-0', 'flex items-center justify-center', 'bg-white/70'), children: _jsx("span", { className: "text-sm font-medium text-gray-900", children: "Out of Stock" }) }))] }));
}
