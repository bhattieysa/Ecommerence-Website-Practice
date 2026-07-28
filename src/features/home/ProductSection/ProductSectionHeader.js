import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import { Button } from '@/components /Button';
import { Typography } from '@/components/Typography';
import { cn } from '@/lib/utils/cn';
import { productSectionActionVariants, productSectionHeaderVariants, productSectionHeadingVariants, } from './ProductSectionVariants';
export function ProductSectionHeader({ title, subtitle, action, className, }) {
    return (_jsxs("header", { className: cn(productSectionHeaderVariants(), className), children: [_jsxs("div", { className: productSectionHeadingVariants(), children: [_jsx(Typography, { variant: "heading2", children: title }), subtitle && (_jsx(Typography, { variant: "body", className: "text-muted-foreground", children: subtitle }))] }), _jsx("div", { className: productSectionActionVariants(), children: action })] }));
}
