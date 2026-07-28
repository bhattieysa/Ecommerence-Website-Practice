import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '@/lib/utils/cn';
import { Section } from '@/components/Section';
import { Typography } from '@/components/Typography/Typography';
import { ProductGrid } from '@/components/commerce/ProductGrid/ProductGrid';
import { PRODUCT_SECTION_DEFAULTS } from './ProductSection.constants';
import { ProductSectionVariants } from './ ProductSectionVariants';
export function ProductSection({ title, description, products, actions, columns = PRODUCT_SECTION_DEFAULTS.columns, gap = PRODUCT_SECTION_DEFAULTS.gap, spacing, emptyState, action, viewAll, className, ...props }) {
    return (_jsxs(Section, { className: cn(ProductSectionVariants({
            spacing,
        }), className), ...props, children: [_jsxs("div", { className: "flex items-end justify-between gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Typography, { variant: "h2", children: title }), description && (_jsx(Typography, { variant: "body", color: "muted", children: description }))] }), _jsxs("div", { className: "flex items-center gap-3", children: [action, viewAll] })] }), _jsx(ProductGrid, { products: products, actions: actions, columns: columns, gap: gap, emptyState: emptyState })] }));
}
