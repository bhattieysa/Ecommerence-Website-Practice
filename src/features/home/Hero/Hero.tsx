import { Typography } from '@/components/Typography';

import { cn } from '@/lib/utils/cn';

import type { HeroProps } from './Hero.types';

import {
  HeroVariants,
  heroBackgroundVariants,
  heroBadgeVariants,
  heroCircleVariants,
  heroContentVariants,
  heroDescriptionVariants,
  heroGridVariants,
  heroImageElementVariants,
  heroImageVariants,
  heroSubtitleVariants,
  heroTitleVariants,
} from './HeroVariants';

export function Hero({
  badge,
  title,
  subtitle,
  description,
  image,
  imageAlt,
  size,
  alignment,
  imagePosition,
  className,
  ...props
}: HeroProps) {
  return (
    <div
      className={cn(
        HeroVariants({
          size,
          alignment,
          imagePosition,
        }),

        className,
      )}
      {...props}
    >
      {/* Decorative Background */}
      <div className={heroBackgroundVariants()}>
        <div className={heroCircleVariants({ position: 'topLarge' })} />
        <div className={heroCircleVariants({ position: 'topSmall' })} />
        <div className={heroCircleVariants({ position: 'bottomLarge' })} />
      </div>

      <div
        className={cn(
          heroGridVariants(),
          imagePosition === 'left' && 'lg:[&>*:first-child]:order-2',
        )}
      >
        {/* Content */}
        <div
          className={heroContentVariants({
            alignment,
          })}
        >
          {badge && (
            <Typography variant="caption" className={heroBadgeVariants()}>
              {badge}
            </Typography>
          )}

          <Typography variant="display" className={heroTitleVariants()}>
            {title}
          </Typography>

          {subtitle && (
            <Typography variant="heading1" className={heroSubtitleVariants()}>
              {subtitle}
            </Typography>
          )}

          {description && (
            <Typography variant="body" className={heroDescriptionVariants()}>
              {description}
            </Typography>
          )}
        </div>

        {/* Image */}
        <div className={heroImageVariants()}>
          <img
            src={image}
            alt={imageAlt}
            className={heroImageElementVariants()}
            loading="eager"
            draggable={false}
          />
        </div>
      </div>
      {/* </Container> */}
    </div>
  );
}
