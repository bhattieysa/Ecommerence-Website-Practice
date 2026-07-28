import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';
import { TypographyVariants } from '@/components/Typography/TypographyVariants';
const defaultElement = {
    display: 'h1',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    heading1: 'h1',
    heading2: 'h2',
    heading3: 'h3',
    heading4: 'h4',
    heading5: 'h5',
    heading6: 'h6',
    bodyLg: 'p',
    body: 'p',
    bodySm: 'p',
    bodyLarge: 'p',
    bodySmallAlias: 'p',
    caption: 'span',
    overline: 'span',
};
const TypographyInner = forwardRef(({ as, variant = 'body', color, align, weight, className, children, ...props }, ref) => {
    const Component = as ?? defaultElement[variant];
    return (_jsx(Component, { ref: ref, className: cn(TypographyVariants({
            variant,
            color,
            align,
            weight,
        }), className), ...props, children: children }));
});
export const Typography = TypographyInner;
TypographyInner.displayName = 'Typography';
