import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { Typography } from '@/components/Typography';
import { cn } from '@/lib/utils/cn';
import { featureCardVariants, featureContentVariants, featureIconVariants, } from './FeatureSectionVariants';
export function FeatureCard({ feature, size, variant, className, }) {
    const content = (_jsxs(_Fragment, { children: [_jsx("div", { className: featureIconVariants({ size }), children: feature.icon }), _jsxs("div", { className: featureContentVariants(), children: [_jsx(Typography, { variant: "heading5", children: feature.title }), _jsx(Typography, { variant: "caption", className: "text-muted-foreground", children: feature.description })] })] }));
    if (feature.href) {
        return (_jsx(Link, { to: feature.href, className: cn(featureCardVariants({
                size,
                variant,
            }), className), children: content }));
    }
    return (_jsx("article", { className: cn(featureCardVariants({
            size,
            variant,
        }), className), children: content }));
}
