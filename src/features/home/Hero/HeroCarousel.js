import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconButton } from '@/components/IconButton';
import { HERO_SLIDES } from '@/data/hero.data';
import { Hero } from './Hero';
import { heroArrowButtonVariants, heroArrowContainerVariants, heroCarouselVariants, heroPaginationDotVariants, heroPaginationVariants, heroSlideVariants, heroTrackVariants, heroViewportVariants, } from './HeroVariants';
import { useHeroCarousel } from './UseHeroCarousel';
export function HeroCarousel() {
    const { emblaRef, selectedIndex, scrollSnaps, scrollPrev, scrollNext, scrollTo, } = useHeroCarousel();
    return (_jsxs("section", { className: heroCarouselVariants(), children: [_jsx("div", { className: heroArrowContainerVariants({
                    side: 'left',
                    visibility: 'desktop',
                }), children: _jsx(IconButton, { icon: "previous", variant: "secondary", size: "lg", "aria-label": "Previous slide", onClick: scrollPrev, className: heroArrowButtonVariants() }) }), _jsx("div", { className: heroArrowContainerVariants({
                    side: 'right',
                    visibility: 'desktop',
                }), children: _jsx(IconButton, { icon: "next", variant: "secondary", size: "lg", "aria-label": "Next slide", onClick: scrollNext, className: heroArrowButtonVariants() }) }), _jsx("div", { ref: emblaRef, className: heroViewportVariants(), children: _jsx("div", { className: heroTrackVariants(), children: HERO_SLIDES.map((slide) => (_jsx("div", { className: heroSlideVariants(), children: _jsx(Hero, { ...slide, size: "md" }) }, slide.id))) }) }), _jsx("div", { className: heroPaginationVariants(), children: scrollSnaps.map((_, index) => (_jsx("button", { type: "button", "aria-label": `Go to slide ${index + 1}`, "aria-current": selectedIndex === index, onClick: () => scrollTo(index), className: heroPaginationDotVariants({
                        active: selectedIndex === index,
                    }) }, index))) })] }));
}
