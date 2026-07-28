import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ProductGrid } from '@/components/commerce/ProductGrid/ProductGrid';
import { cn } from '@/lib/utils/cn';
import { ProductSectionHeader } from './ProductSectionHeader';
import { productSectionContentVariants, productSectionGridWrapperVariants, productSectionVariants, } from './ProductSectionVariants';
export function ProductSection({ title, subtitle, products, action, limit, className, }) {
    const displayedProducts = products.slice(0, limit ?? products.length);
    return (_jsx("section", { className: cn(productSectionVariants(), className), children: _jsxs("div", { className: productSectionContentVariants(), children: [_jsx(ProductSectionHeader, { title: title, subtitle: subtitle, action: action }), _jsx("div", { className: productSectionGridWrapperVariants(), children: _jsx(ProductGrid, { products: displayedProducts }) })] }) }));
}
