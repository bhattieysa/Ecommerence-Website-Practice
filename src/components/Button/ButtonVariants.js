import { cva } from 'class-variance-authority';
import { RADIUS } from '@/theme';
export const ButtonVariants = cva(
// Base Classes
[
    'inline-flex items-center justify-center font-medium',
    'transition-all duration-200 ease-in-out',
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-offset-2',
    'disabled:pointer-events-none',
    'disabled:opacity-50',
], {
    variants: {
        variant: {
            primary: 'bg-primary text-white hover:bg-blue-700 focus-visible:ring-blue-500',
            secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
            outline: 'border border-gray-300 bg-transparent hover:bg-gray-100',
            ghost: 'hover:bg-gray-100',
            destructive: 'bg-danger text-white hover:bg-red-700',
        },
        size: {
            sm: 'text-sm',
            md: 'text-sm',
            lg: 'text-base',
        },
        layout: {
            default: '',
            icon: '',
        },
        fullWidth: {
            true: 'w-full',
            false: '',
        },
    },
    compoundVariants: [
        {
            layout: 'default',
            size: 'sm',
            class: `${RADIUS.button} h-9 px-4`,
        },
        {
            layout: 'default',
            size: 'md',
            class: `${RADIUS.button} h-10 px-5`,
        },
        {
            layout: 'default',
            size: 'lg',
            class: `${RADIUS.button} h-12 px-6`,
        },
        {
            layout: 'icon',
            size: 'sm',
            class: `${RADIUS.button} h-9 w-9 p-0`,
        },
        {
            layout: 'icon',
            size: 'md',
            class: `${RADIUS.button} h-10 w-10 p-0`,
        },
        {
            layout: 'icon',
            size: 'lg',
            class: `${RADIUS.button} h-12 w-12 p-0`,
        },
    ],
    defaultVariants: {
        variant: 'primary',
        size: 'md',
        layout: 'default',
    },
});
