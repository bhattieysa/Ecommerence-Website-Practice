import { Badge } from '@/components/badge';
import { Typography } from '@/components/Typography';

import { cn } from '@/lib/utils/cn';

import {
  MarketingLayout,
  MarketingLayoutContent,
  MarketingLayoutHeading,
  MarketingLayoutImage,
} from '../MarketingLayout';

import type { PromoBannerProps } from './PromoBanner.types';

export function PromoBanner({
  badge,
  badgeVariant,
  title,
  subtitle,
  description,
  image,
  imageAlt = '',
  primaryAction,
  secondaryAction,
  imagePosition,
  alignment,
  variant,
  size,
  rounded,
  showDecoration = true,
  className,
  ...props
}: PromoBannerProps) {
  return (
    <MarketingLayout
      variant={variant}
      size={size}
      rounded={rounded}
      imagePosition={imagePosition}
      alignment={alignment}
      showDecoration={showDecoration}
      className={className}
      {...props}
    >
      <MarketingLayoutContent
        className={cn(
          alignment === 'center' ? 'items-center text-center' : '',
          'h-full'
        )}
      >
        <MarketingLayoutHeading className="gap-4 h-full flex flex-col justify-center">
          {badge && (
            <Badge
              variant={badgeVariant || 'sale'}
              className="text-s font-bold py-5 rounded-xl w-35 h-10 px-0"
            >
              {badge}
            </Badge>
          )}

          <Typography
            variant="heading1"
            className={cn(
              'max-w-xl text-2xl font-bold line-clamp-3',
              variant === 'Featured' ? 'text-white' : '',
            )}
          >
            {title}
          </Typography>

          {description && (
            <Typography
              variant="body"
              className={cn(
                'max-w-lg text-sm line-clamp-2',
                variant === 'BestSeller' ? 'text-white opacity-90' : 'opacity-90',
              )}
            >
              {description}
            </Typography>
          )}
        </MarketingLayoutHeading>
      </MarketingLayoutContent>

      {image && <MarketingLayoutImage src={image} alt={imageAlt} />}
    </MarketingLayout>
  );
}
