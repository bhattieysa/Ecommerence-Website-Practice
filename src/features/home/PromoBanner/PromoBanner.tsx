import { Badge } from '@/components/badge';
import { Button } from '@/components/Button';
import { Typography } from '@/components/Typography';

import { cn } from '@/lib/utils/cn';

import {
  MarketingLayout,
  MarketingLayoutContent,
  MarketingLayoutHeading,
  MarketingLayoutImage,
} from '../MarketingLayout';

import type { PromoBannerProps } from './PromoBanner.types';
import { promoBannerActionVariants } from './PromoBannerVariants';

export function PromoBanner({
  badge,
  title,
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
        className={cn(alignment === 'center' ? 'items-center text-center' : '')}
      >
        {badge && <Badge variant="secondary">{badge}</Badge>}

        <MarketingLayoutHeading>
          <Typography variant="heading1" className="max-w-xl">
            {title}
          </Typography>

          {description && (
            <Typography variant="body" className="max-w-lg opacity-90">
              {description}
            </Typography>
          )}
        </MarketingLayoutHeading>

        {primaryAction || secondaryAction ? (
          <div className={promoBannerActionVariants()}>
            {primaryAction}
            {secondaryAction}
          </div>
        ) : (
          <div className={promoBannerActionVariants()}>
            <Button size="lg">Shop Now</Button>

            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        )}
      </MarketingLayoutContent>

      {image && <MarketingLayoutImage src={image} alt={imageAlt} />}
    </MarketingLayout>
  );
}
