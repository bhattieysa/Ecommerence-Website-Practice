import { jsx as _jsx } from "react/jsx-runtime";
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/Button';
import { cn } from '@/lib/utils/cn';
import { PRODUCT_CARD_ARIA_LABELS } from '@/components/commerce/ProductCard/ProductCard.constants';
import { isInStock } from '@/components/commerce/ProductCard/ProductCard.utils';
import { ProductCardFooterVariants } from '@/components/commerce/ProductCard/ProductCardVariants';
export function ProductCardFooter({ product, onAddToCart, className, }) {
    const available = isInStock(product);
    const handleAddToCart = () => {
        if (!available)
            return;
        onAddToCart?.(product);
    };
    return (_jsx("div", { className: cn(ProductCardFooterVariants(), className), children: _jsx(Button, { className: "w-full", leftIcon: _jsx(ShoppingCart, { className: "h-4 w-4" }), disabled: !available, "aria-label": PRODUCT_CARD_ARIA_LABELS.addToCart, onClick: handleAddToCart, children: available
                ? PRODUCT_CARD_ARIA_LABELS.addToCart
                : PRODUCT_CARD_ARIA_LABELS.outOfStock }) }));
}
