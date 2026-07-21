export const PRODUCT_IMAGE_ASPECT_RATIOS = {
  square: 'square',
  portrait: 'portrait',
  landscape: 'landscape',
  auto: 'auto',
} as const;

export const PRODUCT_IMAGE_OBJECT_FIT = {
  cover: 'cover',
  contain: 'contain',
  fill: 'fill',
} as const;

export const PRODUCT_IMAGE_RADII = {
  none: 'none',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  full: 'full',
} as const;

export const PRODUCT_IMAGE_DEFAULTS = {
  loading: 'lazy',
  priority: false ,
} as const;

export const PRODUCT_IMAGE_FALLBACK_ALT = 'Product image unavailable';
