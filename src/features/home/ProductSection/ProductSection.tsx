import { useNavigate } from 'react-router-dom';
import { ProductGrid } from '@/components/commerce/ProductGrid/ProductGrid';

import { cn } from '@/lib/utils/cn';

import { ProductSectionHeader } from './ProductSectionHeader';
import type { ProductSectionProps } from './ProductSection.types';
import {
  productSectionContentVariants,
  productSectionGridWrapperVariants,
  productSectionVariants,
} from './ProductSectionVariants';
import { useAppDispatch } from '@/store/hooks';
import { addToCartBackend } from '@/store/slices/cartSlice';

export function ProductSection({
  title,
  subtitle,
  products,
  action,
  limit,
  gridColumns,
  gridGap,
  cardProps,
  className,
}: ProductSectionProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const displayedProducts = products.slice(0, limit ?? products.length);

  const handleProductClick = (product: { slug: string }) => {
    navigate(`/products/${product.slug}`);
  };

  const handleAddToCart = (product: any) => {
    dispatch(addToCartBackend(product));
  };

  return (
    <section className={cn(productSectionVariants(), className)}>
      <div className={productSectionContentVariants()}>
        <ProductSectionHeader
          title={title}
          subtitle={subtitle}
          action={action}
        />

        <div className={productSectionGridWrapperVariants()}>
          <ProductGrid
            products={displayedProducts as any}
            columns={gridColumns}
            gap={gridGap}
            cardProps={cardProps}
            actions={{ onProductClick: handleProductClick, onAddToCart: handleAddToCart }}
          />
        </div>
      </div>
    </section>
  );
}
