import { cva } from 'class-variance-authority';
export const productSectionVariants = cva('w-full');
export const productSectionContentVariants = cva(['flex', 'flex-col', 'gap-8']);
export const productSectionHeaderVariants = cva([
    'flex',
    'flex-col',
    'gap-4',
    'sm:flex-row',
    'sm:items-end',
    'sm:justify-between',
], {
    variants: {
        alignment: {
            left: '',
            center: 'items-center text-center',
        },
        spacing: {
            compact: 'gap-6',
            default: 'gap-8',
            large: 'gap-12',
        },
    },
    defaultVariants: {
        alignment: 'left',
        spacing: 'default',
    },
});
export const productSectionHeadingVariants = cva(['flex', 'flex-col', 'gap-2']);
export const productSectionActionVariants = cva([
    'flex',
    'items-center',
    'justify-start',
    'sm:justify-end',
    'shrink-0',
]);
export const productSectionGridWrapperVariants = cva(['w-full']);
