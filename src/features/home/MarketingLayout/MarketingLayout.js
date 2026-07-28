import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ProductImage } from '@/components/commerce/ProductImage/ProductImage';
import { cn } from '@/lib/utils/cn';
import { marketingLayoutContentVariants, marketingLayoutHeadingVariants, marketingLayoutImageContainerVariants, marketingLayoutImageVariants, marketingLayoutVariants, } from '../MarketingLayoutVariants';
export function MarketingLayout({ variant, size, rounded, imagePosition, alignment, showDecoration = true, className, children, ...props }) {
    return (_jsxs("section", { className: cn(marketingLayoutVariants({
            variant,
            size,
            rounded,
            imagePosition,
            alignment,
        }), className), ...props, children: [showDecoration && (_jsxs("div", { className: "pointer-events-none absolute inset-0 overflow-hidden", children: [_jsx("div", { className: "absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" }), _jsx("div", { className: "absolute bottom-0 right-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" })] })), children] }));
}
export function MarketingLayoutContent({ className, children, }) {
    return _jsx("div", { className: cn(marketingLayoutContentVariants(), className), children: children });
}
export function MarketingLayoutHeading({ className, children, }) {
    return _jsx("div", { className: cn(marketingLayoutHeadingVariants(), className), children: children });
}
export function MarketingLayoutImage({ src, alt = '', maxWidth = 'md', className, }) {
    return (_jsx("div", { className: marketingLayoutImageContainerVariants(), children: _jsx(ProductImage, { src: src, alt: alt, className: cn(marketingLayoutImageVariants({ maxWidth }), className) }) }));
}
