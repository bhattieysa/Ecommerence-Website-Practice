import { cva } from 'class-variance-authority';
export const brandSectionVariants = cva('w-full');
export const brandSectionContentVariants = cva(['flex', 'flex-col', 'gap-8']);
export const brandGridVariants = cva(['grid', 'gap-5'], {
    variants: {
        columns: {
            auto: [
                'grid-cols-2',
                'sm:grid-cols-3',
                'md:grid-cols-4',
                'lg:grid-cols-5',
            ],
            four: ['grid-cols-2', 'md:grid-cols-4'],
            five: ['grid-cols-2', 'sm:grid-cols-3', 'lg:grid-cols-5'],
            six: ['grid-cols-2', 'sm:grid-cols-3', 'lg:grid-cols-6'],
        },
    },
    defaultVariants: {
        columns: 'auto',
    },
});
export const brandCardVariants = cva([
    'group',
    'flex',
    'items-center',
    'justify-center',
    'rounded-2xl',
    'border',
    'border-border',
    'bg-card',
    'transition-all',
    'duration-300',
    'hover:-translate-y-1',
    'hover:shadow-lg',
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-primary',
    'focus-visible:ring-offset-2',
], {
    variants: {
        variant: {
            filled: '',
            outlined: ['border-2', 'bg-transparent'],
            elevated: ['shadow-sm', 'hover:shadow-xl'],
        },
        size: {
            sm: 'h-24 p-4',
            md: 'h-28 p-6',
            lg: 'h-32 p-8',
        },
    },
    defaultVariants: {
        variant: 'filled',
        size: 'md',
    },
});
export const brandLogoVariants = cva([
    'max-h-12',
    'w-auto',
    'object-contain',
    'transition-all',
    'duration-300',
    'grayscale',
    'opacity-70',
    'group-hover:grayscale-0',
    'group-hover:opacity-100',
]);
