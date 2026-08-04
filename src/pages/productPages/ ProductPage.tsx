import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Container } from '@/components/Container';
import { Section } from '@/components/Section';

import { cn } from '@/lib/utils/cn';

import { ProductGallery } from '@/components/ProductGallery';
import { ProductInfo } from '@/components/ProductInfo/ProductInfo';

import { productPageVariants } from '../../features/product/ProductPage.variants';

import type { ProductPageProps } from '../../features/product/ProductPage.types';
import { getProductBySlug } from '@/data';

export function ProductPage({ className }: ProductPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || '');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return null;
  }

  return (
    <Section spacing="large">
      <Container size="hero">
        <div className={cn(productPageVariants(), className)}>
          <ProductGallery productImage={product.image} />

          <ProductInfo
            product={product}
            quantity={quantity}
            onQuantityChange={setQuantity}
            onAddToCart={(quantity) => console.log('Add to Cart', quantity)}
            onBuyNow={(quantity) => console.log('Buy Now', quantity)}
            onWishlist={() => console.log('Wishlist')}
          />
        </div>
      </Container>
    </Section>
  );
}
