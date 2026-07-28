export const PRODUCT_GRID_COLUMNS = ['2', '3', '4', '5', '6', 'auto'] as const;

export type ProductGridColumn = (typeof PRODUCT_GRID_COLUMNS)[number];

export const PRODUCT_GRID_GAPS = ['sm', 'md', 'lg'] as const;

export type ProductGridGap = (typeof PRODUCT_GRID_GAPS)[number];

export const PRODUCT_GRID_LAYOUT = {
  minCardWidth: '280px',

  gaps: {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  },
} as const;
export const PRODUCT_GRID_DEFAULTS = {
  columns: 'auto',
  gap: 'md',
} as const;

export const PRODUCT_GRID_LABELS = {
  empty: 'No products found.',
} as const;
