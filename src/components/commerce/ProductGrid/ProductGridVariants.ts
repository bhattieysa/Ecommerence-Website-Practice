import { cva } from 'class-variance-authority';
import {
  PRODUCT_GRID_DEFAULTS,
  PRODUCT_GRID_LAYOUT,
} from './ProductGrid.constants';

export const ProductGridVariants = cva('grid', {
  variants: {
    columns: {
      '2': 'grid-cols-1 sm:grid-cols-2',

      '3': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',

      '4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',

      auto: `grid-cols-[repeat(auto-fit,minmax(${PRODUCT_GRID_LAYOUT.minCardWidth},1fr))]`,
    },

    gap: {
      sm: PRODUCT_GRID_LAYOUT.gaps.sm,
      md: PRODUCT_GRID_LAYOUT.gaps.md,
      lg: PRODUCT_GRID_LAYOUT.gaps.lg,
    },
  },

  defaultVariants: {
    columns: PRODUCT_GRID_DEFAULTS.columns,
    gap: PRODUCT_GRID_DEFAULTS.gap,
  },
});
