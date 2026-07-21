import {
  PRODUCT_IMAGE_ASPECT_RATIOS,
  PRODUCT_IMAGE_OBJECT_FIT,
} from '@/components/commerce/ProductImage/ProductImage.constants';

export const PRODUCT_CARD_DEFAULTS = {
  imageAspectRatio: PRODUCT_IMAGE_ASPECT_RATIOS.square,
  imageObjectFit: PRODUCT_IMAGE_OBJECT_FIT.cover,
  radius: 'lg',
  showCategory: true,
  showRating: true,
  showOriginalPrice: true,
  showAddToCart: true,
} as const;

export const PRODUCT_CARD_LAYOUT = {
  imageHeight: 'h-64',
  contentSpacing: 'space-y-2',
  footerSpacing: 'mt-4',
} as const;

export const PRODUCT_CARD_ARIA_LABELS = {
  addToCart: 'Add product to cart',
  outOfStock: 'Out of Stock',
  productImage: 'Product image',
  productRating: 'Product rating',
} as const;
