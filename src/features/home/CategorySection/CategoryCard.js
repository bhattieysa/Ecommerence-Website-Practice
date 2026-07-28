import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { Typography } from '@/components/Typography';
import { cn } from '@/lib/utils/cn';
import { categoryCardVariants, categoryContentVariants, categoryImageVariants, categoryImageWrapperVariants, } from './CategorySectionVariants';
export function CategoryCard({ category, size, variant, className, }) {
    const { name, image, productCount, href = '#' } = category;
    return (_jsxs(Link, { to: href, className: cn(categoryCardVariants({
            size,
            variant,
        }), className), "aria-label": `Browse ${name} category`, children: [_jsx("div", { className: categoryImageWrapperVariants({ size }), children: _jsx("img", { src: image, alt: name, loading: "lazy", className: categoryImageVariants() }) }), _jsxs("div", { className: categoryContentVariants(), children: [_jsx(Typography, { variant: "heading5", className: "line-clamp-1", children: name }), _jsxs(Typography, { variant: "caption", className: "text-muted-foreground", children: [productCount, " ", productCount === 1 ? 'Product' : 'Products'] })] })] }));
}
