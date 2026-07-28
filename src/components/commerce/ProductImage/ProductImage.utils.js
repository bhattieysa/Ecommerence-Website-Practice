import { PRODUCT_IMAGE_DEFAULTS } from '@/components/commerce/ProductImage/ProductImage.constants';
import { PRODUCT_IMAGE_OBJECT_FIT } from '@/components/commerce/ProductImage/ProductImage.constants';
/**
 * Maps object-fit variants to Tailwind classes.
 */
export const objectFitClasses = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
};
/**
 * Determines whether an image source is valid.
 */
export function hasValidImageSource(src) {
    return Boolean(src?.trim());
}
/**
 * Returns the appropriate loading strategy.
 */
export function getImageLoading(priority = PRODUCT_IMAGE_DEFAULTS.priority || false) {
    return priority ? 'eager' : PRODUCT_IMAGE_DEFAULTS.loading;
}
/**
 * Returns the appropriate fetch priority.
 */
export function getFetchPriority(priority = PRODUCT_IMAGE_DEFAULTS.priority || false) {
    return priority ? 'high' : 'auto';
}
/**
 * Returns the image source.
 * Falls back when the provided source is invalid.
 */
export function resolveImageSource(src, fallbackSrc) {
    if (hasValidImageSource(src)) {
        return src;
    }
    return fallbackSrc;
}
