import { ProductImage } from '@/components/commerce/ProductImage/ProductImage';

import { cn } from '@/lib/utils/cn';

import type { MarketingLayoutProps } from './MarketingLayout.types';
import {
  marketingLayoutContentVariants,
  marketingLayoutHeadingVariants,
  marketingLayoutImageContainerVariants,
  marketingLayoutImageVariants,
  marketingLayoutVariants,
} from '../MarketingLayoutVariants';

export function MarketingLayout({
  variant,
  size,
  rounded,
  imagePosition,
  alignment,
  showDecoration = true,
  className,
  children,
  ...props
}: MarketingLayoutProps) {
  return (
    <section
      className={cn(
        marketingLayoutVariants({
          variant,
          size,
          rounded,
          imagePosition,
          alignment,
        }),
        className,
      )}
      {...props}
    >
      {showDecoration && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -left-12 -bottom-12 h-32 w-32 rounded-full bg-white/5 blur-xl" />
          <div className="absolute right-1/4 top-1/4 h-24 w-24 rounded-full bg-white/5 blur-lg" />
        </div>
      )}

      {children}
    </section>
  );
}

export function MarketingLayoutContent({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn(marketingLayoutContentVariants(), className)}>
      {children}
    </div>
  );
}

export function MarketingLayoutHeading({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn(marketingLayoutHeadingVariants(), className)}>
      {children}
    </div>
  );
}

export function MarketingLayoutImage({
  src,
  alt = '',
  maxWidth = 'md',
  className,
}: {
  src: string;
  alt?: string;
  maxWidth?: 'sm' | 'md';
  className?: string;
}) {
  return (
    <div className={marketingLayoutImageContainerVariants()}>
      <ProductImage
        src={src}
        alt={alt}
        className={cn(marketingLayoutImageVariants({ maxWidth }), className)}
      />
    </div>
  );
}
