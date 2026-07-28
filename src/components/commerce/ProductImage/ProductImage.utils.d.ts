import { PRODUCT_IMAGE_OBJECT_FIT } from '@/components/commerce/ProductImage/ProductImage.constants';
/**
 * Maps object-fit variants to Tailwind classes.
 */
export declare const objectFitClasses: Record<keyof typeof PRODUCT_IMAGE_OBJECT_FIT, string>;
/**
 * Determines whether an image source is valid.
 */
export declare function hasValidImageSource(src?: string | null): src is string;
/**
 * Returns the appropriate loading strategy.
 */
export declare function getImageLoading(priority?: boolean): 'lazy' | 'eager';
/**
 * Returns the appropriate fetch priority.
 */
export declare function getFetchPriority(priority?: boolean): 'high' | 'auto';
/**
 * Returns the image source.
 * Falls back when the provided source is invalid.
 */
export declare function resolveImageSource(src?: string | null, fallbackSrc?: string): string | undefined;
