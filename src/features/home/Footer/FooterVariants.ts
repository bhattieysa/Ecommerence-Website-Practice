import { cva } from 'class-variance-authority';

export const footerVariants = cva([
  'w-full',
  'bg-sky-700',
  'text-white',
  'py-12',
  'lg:py-16',
]);

export const footerContentVariants = cva([
  'w-full',
  'flex',
  'flex-col',
  'gap-20',
  'lg:flex-row',
  'lg:justify-between',
]);

export const footerBrandVariants = cva(['flex', 'flex-col', 'gap-6']);

export const footerColumnsVariants = cva([
  'grid',
  'gap-12',
  'grid-cols-1',
  'sm:grid-cols-2',
  'lg:grid-cols-3',
]);

export const footerColumnVariants = cva(['flex', 'flex-col', 'gap-4']);

export const footerLinksVariants = cva(['flex', 'flex-col', 'gap-3']);

export const footerLinkVariants = cva([
  'text-sm',
  'text-blue-100',
  'transition-colors',
  'hover:text-white',
  'focus-visible:ring-2',
  'focus-visible:ring-ring',
  'focus-visible:outline-none',
]);

export const footerContactVariants = cva(['flex', 'flex-col', 'gap-3']);

export const footerContactItemVariants = cva(['flex', 'items-start', 'gap-3']);

export const footerDownloadVariants = cva([
  'flex',
  'flex-row',
  'gap-4',
  'items-start',
]);

export const footerSocialVariants = cva(['flex', 'gap-3', 'mt-5']);

export const footerSocialIconVariants = cva([
  'flex',
  'items-center',
  'justify-center',
  'w-9',
  'h-9',
  'rounded-full',
  'bg-primary/10',
  'hover:bg-primary',
  'hover:text-white',
  'transition-all',
  'duration-300',
  'focus-visible:ring-2',
  'focus-visible:ring-ring',
  'focus-visible:outline-none',
]);

export const footerBottomVariants = cva([
  'mt-12',
  'border-t',
  'border-blue-500',
  'pt-6',
  'flex',
  'flex-col',
  'gap-4',
  'justify-center',
  'items-center',
]);

export const footerBottomLinksVariants = cva(['flex', 'flex-wrap', 'gap-6']);

export const footerBottomLinkVariants = cva([
  'text-sm',
  'text-muted-foreground',
  'transition-colors',
  'hover:text-primary',
  'focus-visible:ring-2',
  'focus-visible:ring-ring',
  'focus-visible:outline-none',
]);
