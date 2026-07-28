export declare function useHeroCarousel(): {
    emblaRef: import("embla-carousel-react").EmblaViewportRefType;
    emblaApi: import("embla-carousel").EmblaCarouselType | undefined;
    selectedIndex: number;
    scrollSnaps: number[];
    scrollPrev: () => void;
    scrollNext: () => void;
    scrollTo: (index: number) => void;
};
