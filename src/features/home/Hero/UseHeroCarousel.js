import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
export function useHeroCarousel() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const AUTOPLAY_OPTIONS = {
        delay: 5000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
    };
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'center',
        loop: true,
        duration: 30,
        skipSnaps: false,
    }, [Autoplay(AUTOPLAY_OPTIONS)]);
    const [scrollSnaps, setScrollSnaps] = useState([]);
    const scrollPrev = useCallback(() => {
        emblaApi?.scrollPrev();
    }, [emblaApi]);
    const scrollNext = useCallback(() => {
        emblaApi?.scrollNext();
    }, [emblaApi]);
    const scrollTo = useCallback((index) => {
        emblaApi?.scrollTo(index);
    }, [emblaApi]);
    const onSelect = useCallback(() => {
        if (!emblaApi)
            return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);
    useEffect(() => {
        if (!emblaApi)
            return;
        setScrollSnaps(emblaApi.scrollSnapList());
        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
        return () => {
            emblaApi.off('select', onSelect);
            emblaApi.off('reInit', onSelect);
        };
    }, [emblaApi, onSelect]);
    return {
        emblaRef,
        emblaApi,
        selectedIndex,
        scrollSnaps,
        scrollPrev,
        scrollNext,
        scrollTo,
    };
}
