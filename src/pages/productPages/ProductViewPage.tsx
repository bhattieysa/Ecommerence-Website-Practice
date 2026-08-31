import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Typography } from '@/components/Typography';

import { cn } from '@/lib/utils/cn';

import { ProductGallery } from '@/components/ProductGallery';
import { ProductInfo } from '@/components/ProductInfo/ProductInfo';

import { productPageVariants } from '../../features/product/ProductPage.variants';

import type { ProductPageProps } from '../../features/product/ProductPage.types';
import { useProducts } from '@/hooks/useProducts';
import { useAppDispatch } from '@/store/hooks';
import { addToCartBackend } from '@/store/slices/cartSlice';

export function ProductPage({ className }: ProductPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();

  // Get all products to find by slug since backend uses ID
  const { data: products, isLoading } = useProducts({ limit: 100 });
  const product = products?.find((p: any) => p.slug === slug);

  if (isLoading) {
    return (
      <Section spacing="large">
        <Container size="hero">
          <div className="text-center py-12">
            <Typography variant="bodyLg" className="text-gray-600">
              Loading product...
            </Typography>
          </div>
        </Container>
      </Section>
    );
  }

  if (!product) {
    return (
      <Section spacing="large">
        <Container size="hero">
          <div className="text-center py-12">
            <Typography variant="h2" className="text-2xl font-bold mb-4">
              Product not found
            </Typography>
          </div>
        </Container>
      </Section>
    );
  }

  // Transform backend images to ProductGallery format
  const productImage = product.images && product.images.length > 0
    ? {
        thumbnail: {
          src: product.images[0].url,
          alt: product.title,
        },
        others: product.images.slice(1).map(img => ({
          src: img.url,
          alt: product.title,
        })),
      }
    : {
        thumbnail: {
          src: product.image?.thumbnail?.src || '',
          alt: product.title,
        },
        others: product.image?.others || [],
      };

  return (
    <Section spacing="large">
      <Container size="hero">
        <div className={cn(productPageVariants(), className)}>
          <ProductGallery productImage={productImage} />

          <ProductInfo
            product={product}
            quantity={quantity}
            onQuantityChange={setQuantity}
            onAddToCart={(qty) => {
              // Add the product to cart with the specified quantity
              for (let i = 0; i < qty; i++) {
                dispatch(addToCartBackend(product));
              }
            }}
            onBuyNow={(quantity) => console.log('Buy Now', quantity)}
            onWishlist={() => console.log('Wishlist')}
          />
        </div>
      </Container>
    </Section>
  );
}
