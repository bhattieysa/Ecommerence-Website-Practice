import { jsx as _jsx } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils/cn';
import { brandCardVariants, brandLogoVariants } from './BrandSectionVariants';
export function BrandCard({ brand, size, variant, className }) {
    const content = (_jsx("img", { src: brand.logo.src, alt: brand.logo.alt, loading: "lazy", className: brandLogoVariants() }));
    if (brand.href) {
        return (_jsx(Link, { to: brand.href, "aria-label": `Browse ${brand.name}`, className: cn(brandCardVariants({
                size,
                variant,
            }), className), children: content }));
    }
    return (_jsx("article", { className: cn(brandCardVariants({
            size,
            variant,
        }), className), children: content }));
}
