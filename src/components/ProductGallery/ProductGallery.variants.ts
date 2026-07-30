import { cva } from 'class-variance-authority';

export const productGalleryVariants = cva('flex flex-col gap-5', {
  variants: {
    thumbnailPosition: {
      bottom: '',
    },
  },

  defaultVariants: {
    thumbnailPosition: 'bottom',
  },
});
