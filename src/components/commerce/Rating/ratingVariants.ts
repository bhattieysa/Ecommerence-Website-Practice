import { cva } from 'class-variance-authority';

export const ratingVariants = cva(
  ['inline-flex items-center gap-2', 'transition-colors duration-200'],
  {
    variants: {
      size: {
        sm: '',
        md: '',
        lg: '',
      },
      variant: {
        default: '',
        compact: 'gap-1',
        minimal: 'gap-0.5',
        review: 'gap-1.5',
      },
      interactive: {
        true: 'cursor-pointer',
        false: '',
      },
      disabled: {
        true: 'pointer-events-none opacity-50',
        false: '',
      },
      readonly: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
      interactive: false,
      disabled: false,
      readonly: false,
    },
  },
);

export const starVariants = cva(['transition-colors duration-200'], {
  variants: {
    size: {
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-6',
    },
    state: {
      full: '',
      half: '',
      empty: '',
    },
    interactive: {
      true: 'hover:scale-110',
      false: '',
    },
    disabled: {
      true: '',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    state: 'full',
    interactive: false,
    disabled: false,
  },
});

export const ratingValueVariants = cva(['font-medium'], {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
    variant: {
      default: '',
      compact: 'text-xs',
      minimal: 'text-xs',
      review: 'text-sm',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
});

export const ratingCountVariants = cva([], {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
    variant: {
      default: '',
      compact: 'text-xs',
      minimal: 'text-xs',
      review: 'text-sm',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
});
