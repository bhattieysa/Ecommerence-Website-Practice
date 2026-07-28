import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Typography } from '@/components/Typography';
import { cn } from '@/lib/utils/cn';
import { HeroVariants, heroBackgroundVariants, heroBadgeVariants, heroCircleVariants, heroContentVariants, heroDescriptionVariants, heroGridVariants, heroImageElementVariants, heroImageVariants, heroSubtitleVariants, heroTitleVariants, } from './HeroVariants';
export function Hero({ badge, title, subtitle, description, image, imageAlt, size, alignment, imagePosition, className, ...props }) {
    return (_jsxs("div", { className: cn(HeroVariants({
            size,
            alignment,
            imagePosition,
        }), className), ...props, children: [_jsxs("div", { className: heroBackgroundVariants(), children: [_jsx("div", { className: heroCircleVariants({ position: 'topLarge' }) }), _jsx("div", { className: heroCircleVariants({ position: 'topSmall' }) }), _jsx("div", { className: heroCircleVariants({ position: 'bottomLarge' }) })] }), _jsxs("div", { className: cn(heroGridVariants(), imagePosition === 'left' && 'lg:[&>*:first-child]:order-2'), children: [_jsxs("div", { className: heroContentVariants({
                            alignment,
                        }), children: [badge && (_jsx(Typography, { variant: "caption", className: heroBadgeVariants(), children: badge })), _jsx(Typography, { variant: "display", className: heroTitleVariants(), children: title }), subtitle && (_jsx(Typography, { variant: "heading1", className: heroSubtitleVariants(), children: subtitle })), description && (_jsx(Typography, { variant: "body", className: heroDescriptionVariants(), children: description }))] }), _jsx("div", { className: heroImageVariants(), children: _jsx("img", { src: image, alt: imageAlt, className: heroImageElementVariants(), loading: "eager", draggable: false }) })] })] }));
}
