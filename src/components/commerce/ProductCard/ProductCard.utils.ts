import type { ProductCardData } from '@/components/commerce/ProductCard/ProductCard.types';

export function hasDiscount(price: number, originalPrice?: number): boolean {
  return originalPrice !== undefined && originalPrice > price;
}

export function getDiscountPercentage(
  price: number,
  originalPrice?: number,
): number {
  if (!hasDiscount(price, originalPrice)) {
    return 0;
  }

  return Math.round(((originalPrice! - price) / originalPrice!) * 100);
}

export function hasRating(rating?: number, reviewCount?: number): boolean {
  return rating !== undefined && reviewCount !== undefined && reviewCount > 0;
}

export function hasBadge(product: ProductCardData): boolean {
  return Boolean(product.badge?.trim());
}

export function isInStock(product: ProductCardData): boolean {
  return product.inStock ?? true;
}
