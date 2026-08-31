import { IconButton } from '@/components/IconButton';

import { Hero } from './Hero';
import {
  heroArrowButtonVariants,
  heroArrowContainerVariants,
  heroCarouselVariants,
  heroPaginationDotVariants,
  heroPaginationVariants,
  heroSlideVariants,
  heroTrackVariants,
  heroViewportVariants,
} from './HeroVariants';
import { useHeroCarousel } from './UseHeroCarousel';
import { useBanners } from '@/hooks/useBanners';

export function HeroCarousel() {
  const { data: banners } = useBanners();
  
  const {
    emblaRef,
    selectedIndex,
    scrollSnaps,
    scrollPrev,
    scrollNext,
    scrollTo,
  } = useHeroCarousel();

  return (
    <section className={heroCarouselVariants()}>
      {/* Previous Button */}
      <div
        className={heroArrowContainerVariants({
          side: 'left',
          visibility: 'desktop',
        })}
      >
        <IconButton
          icon="previous"
          variant="secondary"
          size="lg"
          aria-label="Previous slide"
          onClick={scrollPrev}
          className={heroArrowButtonVariants()}
        />
      </div>

      {/* Next Button */}
      <div
        className={heroArrowContainerVariants({
          side: 'right',
          visibility: 'desktop',
        })}
      >
        <IconButton
          icon="next"
          variant="secondary"
          size="lg"
          aria-label="Next slide"
          onClick={scrollNext}
          className={heroArrowButtonVariants()}
        />
      </div>

      {/* Embla Viewport */}
      <div ref={emblaRef} className={heroViewportVariants()}>
        <div className={heroTrackVariants()}>
          {(banners || []).map((slide) => (
            <div key={slide.id} className={heroSlideVariants()}>
              <Hero {...slide} size="sm" />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className={heroPaginationVariants()}>
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={selectedIndex === index}
            onClick={() => scrollTo(index)}
            className={heroPaginationDotVariants({
              active: selectedIndex === index,
            })}
          />
        ))}
      </div>
    </section>
  );
}
