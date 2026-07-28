import { cva } from 'class-variance-authority';
export const NavbarVariants = cva('w-full bg-blue-50 transition-all duration-200', {
    variants: {
        sticky: {
            true: 'sticky top-0 z-50',
            false: 'relative',
        },
        bordered: {
            true: 'border-b',
        },
        elevated: {
            true: 'shadow-sm',
        },
    },
    defaultVariants: {
        sticky: false,
        bordered: true,
        elevated: false,
    },
});
