export const PRODUCT_SECTION_DEFAULTS = {
  columns: 'auto',
  gap: 'md',
  showViewAll: false,
} as const;

export const PRODUCT_SECTION_LABELS = Object.freeze({
  viewAll: 'View All',
});

export const PRODUCT_SECTION_SPACING = {
  sm: 'gap-6',
  md: 'gap-8',
  lg: 'gap-10',
} as const;
