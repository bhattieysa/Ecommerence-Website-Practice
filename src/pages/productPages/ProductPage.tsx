import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { Container } from '@/components/Container';
import { Section } from '@/components/Section';

import { cn } from '@/lib/utils/cn';

import { ProductGallery } from '@/components/ProductGallery';
import { ProductInfo } from '@/components/ProductInfo/ProductInfo';

import { productPageVariants } from '@/features/product/ProductPage.variants';

import type { ProductPageProps } from '@/features/product/ProductPage.types';

import { getProductBySlug } from '@/data';

export function ProductPage({ className }: ProductPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const product = getProductBySlug(slug || '');

  if (!product) {
    return (
      <Section spacing="large" className="p-20">
        <Container size="hero">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <button
              onClick={() => navigate('/')}
              className="text-primary hover:underline"
            >
              Return to Home
            </button>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section spacing="large" className="p-20">
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
