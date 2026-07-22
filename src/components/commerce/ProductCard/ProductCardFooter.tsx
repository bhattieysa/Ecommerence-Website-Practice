import { ShoppingCart } from 'lucide-react';

import { Button } from '@/components/Button';
import { cn } from '@/lib/utils/cn';

import type { ProductCardData } from '@/components/commerce/ProductCard/ProductCard.types';
import { PRODUCT_CARD_ARIA_LABELS } from '@/components/commerce/ProductCard/ProductCard.constants';
import { isInStock } from '@/components/commerce/ProductCard/ProductCard.utils';
import { ProductCardFooterVariants } from '@/components/commerce/ProductCard/ProductCardVariants';

interface ProductCardFooterProps {
  product: ProductCardData;

  onAddToCart?: (product: ProductCardData) => void;

  className?: string;
}

export function ProductCardFooter({
  product,
  onAddToCart,
  className,
}: ProductCardFooterProps) {
  const available = isInStock(product);

  const handleAddToCart = () => {
    if (!available) return;

    onAddToCart?.(product);
  };

  return (
    <div className={cn(ProductCardFooterVariants(), className)}>
      <Button
        className="w-full"
        leftIcon={<ShoppingCart className="h-4 w-4" />}
        disabled={!available}
        aria-label={PRODUCT_CARD_ARIA_LABELS.addToCart}
        onClick={handleAddToCart}
      >
        {available
          ? PRODUCT_CARD_ARIA_LABELS.addToCart
          : PRODUCT_CARD_ARIA_LABELS.outOfStock}
      </Button>
    </div>
  );
}
