import type { ProductCardData } from '@/components/commerce/ProductCard/ProductCard.types';

/**
 * Returns true when the product has a valid discount.
 */
export function hasDiscount(price: number, originalPrice?: number): boolean {
  return originalPrice !== undefined && originalPrice > price;
}

/**
 * Calculates the discount percentage.
 */
export function getDiscountPercentage(
  price: number,
  originalPrice?: number,
): number {
  if (!hasDiscount(price, originalPrice)) {
    return 0;
  }

  return Math.round(((originalPrice! - price) / originalPrice!) * 100);
}

/**
 * Returns whether the product has rating data.
 */
export function hasRating(rating?: number, reviewCount?: number): boolean {
  return rating !== undefined && reviewCount !== undefined && reviewCount > 0;
}

/**
 * Returns whether a badge should be displayed.
 */
export function hasBadge(product: ProductCardData): boolean {
  return Boolean(product.badge?.trim());
}

/**
 * Returns whether the product is in stock.
 */
export function isInStock(product: ProductCardData): boolean {
  return product.inStock ?? true;
}
