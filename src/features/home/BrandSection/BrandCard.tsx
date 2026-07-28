import { Link } from 'react-router-dom';

import { cn } from '@/lib/utils/cn';

import type { BrandCardProps } from './BrandSection.types';
import { brandCardVariants, brandLogoVariants } from './BrandSectionVariants';

export function BrandCard({ brand, size, variant, className }: BrandCardProps) {
  const content = (
    <img
      src={brand.logo.src}
      alt={brand.logo.alt}
      loading="lazy"
      className={brandLogoVariants()}
    />
  );

  if (brand.href) {
    return (
      <Link
        to={brand.href}
        aria-label={`Browse ${brand.name}`}
        className={cn(
          brandCardVariants({
            size,
            variant,
          }),
          className,
        )}
      >
        {content}
      </Link>
    );
  }

  return (
    <article
      className={cn(
        brandCardVariants({
          size,
          variant,
        }),
        className,
      )}
    >
      {content}
    </article>
  );
}
