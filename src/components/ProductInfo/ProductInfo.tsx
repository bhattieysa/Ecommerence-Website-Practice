import { Heart } from 'lucide-react';

import { Badge } from '@/components/badge';
import { Button } from '@/components/Button';
// import { IconButton } from '@/components/icon-button';
import { QuantitySelector } from '@/components/commerce/QuantitySelector';
import { Rating } from '@/components/commerce/Rating';
import { Typography } from '@/components/Typography';

import { cn } from '@/lib/utils/cn';

import { calculateDiscountPercentage } from './ProductInfo.utils';
import { productInfoVariants } from './ProductInfo.variants';
import type { ProductInfoProps } from './ProductInfo.types';

export function ProductInfo({
  product,
  quantity = 1,
  onQuantityChange,
  onAddToCart,
  onBuyNow,
  onWishlist,
  className,
}: ProductInfoProps) {
  const discount = calculateDiscountPercentage(
    product.price.current,
    product.price.original,
  );

  return (
    <aside className={cn(productInfoVariants(), className)}>
      {/* ---------------------------------------------------------------- */}
      {/* Product Identity */}
      {/* ---------------------------------------------------------------- */}

      <section className="space-y-4">
        <Typography
          variant="body-sm"
          className="font-semibold uppercase tracking-wider text-primary"
        >
          {product.brand}
        </Typography>

        <Typography variant="h3" className="leading-tight">
          {product.title}
        </Typography>

        {(product.rating?.value ?? 0) > 0 && (
          <div className="flex items-center gap-3">
            <Rating value={product.rating.value} readonly />

            {(product.rating.reviewCount ?? 0) > 0 && (
              <Typography variant="body-sm" className="text-muted-foreground">
                ({product.rating.reviewCount} Reviews)
              </Typography>
            )}
          </div>
        )}
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Price */}
      {/* ---------------------------------------------------------------- */}

      <section className="space-y-5 border-y py-6">
        <div className="flex flex-wrap items-center gap-3">
          <Typography variant="h2" className="font-bold text-primary">
            ${product.price.current.toFixed(2)}
          </Typography>

          {product.price.original &&
            product.price.original > product.price.current && (
              <Typography
                variant="body-lg"
                className="text-muted-foreground line-through"
              >
                ${product.price.original.toFixed(2)}
              </Typography>
            )}

          {discount && (
            <Badge variant="success" size="md">
              {discount}% OFF
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Typography variant="body-md" className="font-medium">
            Availability
          </Typography>

          <Badge variant={product.stockQuantity > 0 ? 'success' : 'danger'}>
            {product.stockQuantity > 0
              ? `In Stock (${product.stockQuantity})`
              : 'Out of Stock'}
          </Badge>
        </div>

        {product.sku && (
          <div className="flex gap-2">
            <Typography variant="body-md" className="font-medium">
              SKU:
            </Typography>

            <Typography variant="body-md" className="text-muted-foreground">
              {product.sku}
            </Typography>
          </div>
        )}
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Purchase */}
      {/* ---------------------------------------------------------------- */}

      <section className="space-y-6">
        <div className="space-y-2">
          <Typography variant="body-md" className="font-medium">
            Quantity
          </Typography>

          <QuantitySelector
            value={quantity}
            min={1}
            max={Math.max(product.stockQuantity, 1)}
            onValueChange={onQuantityChange}
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            size="lg"
            className="flex-1"
            disabled={product.stockQuantity === 0}
            onClick={() => onAddToCart?.(quantity)}
          >
            Add to Cart
          </Button>

          <Button
            variant="secondary"
            size="lg"
            className="flex-1"
            disabled={product.stockQuantity === 0}
            onClick={() => onBuyNow?.(quantity)}
          >
            Buy Now
          </Button>
        </div>

        <Button
          variant="outline"
          size="lg"
          className="justify-center gap-2"
          onClick={onWishlist}
        >
          <Heart className="h-5 w-5" />
          Add to Wishlist
        </Button>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Delivery */}
      {/* ---------------------------------------------------------------- */}
      {/* ---------------------------------------------------------------- */}
      {/* Delivery & Services */}
      {/* ---------------------------------------------------------------- */}

      {product.deliveryOptions?.length ? (
        <section className="space-y-4 border-t pt-6">
          {product.deliveryOptions.map((option) => (
            <div
              key={option.id}
              className="flex items-start gap-4 rounded-xl border p-4"
            >
              {option.icon && (
                <div className="mt-1 shrink-0">{option.icon}</div>
              )}

              <div className="space-y-1">
                <Typography variant="body-md" className="font-semibold">
                  {option.title}
                </Typography>

                <Typography variant="body-sm" className="text-muted-foreground">
                  {option.description}
                </Typography>
              </div>
            </div>
          ))}
        </section>
      ) : null}
    </aside>
  );
}
