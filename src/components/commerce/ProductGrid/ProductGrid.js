import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '@/lib/utils/cn';
import { ProductCard } from '../ProductCard';
import { PRODUCT_GRID_DEFAULTS, PRODUCT_GRID_LABELS, } from './ProductGrid.constants';
import { ProductGridVariants } from './ProductGridVariants';
export function ProductGrid({ products, actions, emptyState, columns = PRODUCT_GRID_DEFAULTS.columns, gap = PRODUCT_GRID_DEFAULTS.gap, className, ...props }) {
    if (products.length === 0) {
        return (emptyState ?? (_jsx("div", { className: "flex min-h-[240px] items-center justify-center rounded-lg border border-dashed", children: _jsx("p", { className: "text-sm text-muted-foreground", children: PRODUCT_GRID_LABELS.empty }) })));
    }
    return (_jsx("div", { className: cn(ProductGridVariants({
            columns,
            gap,
        }), className), ...props, children: products.map((product) => (_jsx(ProductCard, { product: product, onProductClick: actions?.onProductClick, onAddToCart: actions?.onAddToCart }, product.id))) }));
}
