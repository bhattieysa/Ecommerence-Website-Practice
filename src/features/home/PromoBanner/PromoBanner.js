import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from '@/components/badge';
import { Button } from '@/components/Button';
import { Typography } from '@/components/Typography';
import { cn } from '@/lib/utils/cn';
import { MarketingLayout, MarketingLayoutContent, MarketingLayoutHeading, MarketingLayoutImage, } from '../MarketingLayout';
import { promoBannerActionVariants } from './PromoBannerVariants';
export function PromoBanner({ badge, title, description, image, imageAlt = '', primaryAction, secondaryAction, imagePosition, alignment, variant, size, rounded, showDecoration = true, className, ...props }) {
    return (_jsxs(MarketingLayout, { variant: variant, size: size, rounded: rounded, imagePosition: imagePosition, alignment: alignment, showDecoration: showDecoration, className: className, ...props, children: [_jsxs(MarketingLayoutContent, { className: cn(alignment === 'center' ? 'items-center text-center' : ''), children: [badge && _jsx(Badge, { variant: "secondary", children: badge }), _jsxs(MarketingLayoutHeading, { children: [_jsx(Typography, { variant: "heading1", className: "max-w-xl", children: title }), description && (_jsx(Typography, { variant: "body", className: "max-w-lg opacity-90", children: description }))] }), primaryAction || secondaryAction ? (_jsxs("div", { className: promoBannerActionVariants(), children: [primaryAction, secondaryAction] })) : (_jsxs("div", { className: promoBannerActionVariants(), children: [_jsx(Button, { size: "lg", children: "Shop Now" }), _jsx(Button, { variant: "outline", size: "lg", children: "Learn More" })] }))] }), image && _jsx(MarketingLayoutImage, { src: image, alt: imageAlt })] }));
}
