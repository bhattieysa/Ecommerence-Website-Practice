import { PRODUCT_IMAGE_DEFAULTS } from '@/components/commerce/ProductImage/ProductImage.constants';
import {PRODUCT_IMAGE_OBJECT_FIT} from '@/components/commerce/ProductImage/ProductImage.constants';
/**
 * Maps object-fit variants to Tailwind classes.
 */
export const objectFitClasses : Record<keyof typeof PRODUCT_IMAGE_OBJECT_FIT, string> = {
  cover: 'object-cover',
  contain: 'object-contain',
  fill: 'object-fill',
} as const;

/**
 * Determines whether an image source is valid.
 */
export function hasValidImageSource(src?: string | null): src is string {
  return Boolean(src?.trim());
}

/**
 * Returns the appropriate loading strategy.
 */
export function getImageLoading(
  priority = PRODUCT_IMAGE_DEFAULTS.priority || false,
): 'lazy' | 'eager' {
  return priority ? 'eager' : PRODUCT_IMAGE_DEFAULTS.loading;
}

/**
 * Returns the appropriate fetch priority.
 */
export function getFetchPriority(
  priority = PRODUCT_IMAGE_DEFAULTS.priority || false,
): 'high' | 'auto' {
  return priority ? 'high' : 'auto';
}

/**
 * Returns the image source.
 * Falls back when the provided source is invalid.
 */
export function resolveImageSource(
  src?: string | null,
  fallbackSrc?: string,
): string | undefined {
  if (hasValidImageSource(src)) {
    return src;
  }

  return fallbackSrc;
}
