import type { ProductCardData } from '@/components/commerce/ProductCard/ProductCard.types';
export declare function hasDiscount(price: number, originalPrice?: number): boolean;
export declare function getDiscountPercentage(price: number, originalPrice?: number): number;
export declare function hasRating(rating?: number, reviewCount?: number): boolean;
export declare function hasBadge(product: ProductCardData): boolean;
export declare function isInStock(product: ProductCardData): boolean;
