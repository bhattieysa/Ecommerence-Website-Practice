import { cva } from 'class-variance-authority';
import { TYPOGRAPHY } from '@/theme';
export const TypographyVariants = cva('', {
    variants: {
        variant: {
            // Display variants
            displayXl: TYPOGRAPHY.displayXl,
            display: TYPOGRAPHY.display,
            // Heading variants
            h1: TYPOGRAPHY.h1,
            h2: TYPOGRAPHY.h2,
            h3: TYPOGRAPHY.h3,
            h4: TYPOGRAPHY.h4,
            h5: TYPOGRAPHY.h5,
            h6: TYPOGRAPHY.h6,
            // Semantic variants
            title: TYPOGRAPHY.title,
            subtitle: TYPOGRAPHY.subtitle,
            // Body variants
            bodyLg: TYPOGRAPHY.bodyLg,
            body: TYPOGRAPHY.body,
            bodySm: TYPOGRAPHY.bodySm,
            // Small text variants
            caption: TYPOGRAPHY.caption,
            overline: TYPOGRAPHY.overline,
            // Legacy aliases for backward compatibility
            heading1: TYPOGRAPHY.h1,
            heading2: TYPOGRAPHY.h2,
            heading3: TYPOGRAPHY.h3,
            heading4: TYPOGRAPHY.h4,
            heading5: TYPOGRAPHY.h5,
            heading6: TYPOGRAPHY.h6,
            bodyLarge: TYPOGRAPHY.bodyLg,
            bodySmallAlias: TYPOGRAPHY.bodySm,
        },
        weight: {
            light: 'font-light',
            normal: 'font-normal',
            medium: 'font-medium',
            semibold: 'font-semibold',
            bold: 'font-bold',
            extrabold: 'font-extrabold',
            black: 'font-black',
        },
        color: {
            default: 'text-text',
            muted: 'text-text-muted',
            primary: 'text-primary',
            success: 'text-success',
            danger: 'text-danger',
            white: 'text-white',
        },
        align: {
            start: 'text-start',
            center: 'text-center',
            end: 'text-end',
        },
        truncate: {
            true: 'truncate',
        },
        lineClamp: {
            1: 'line-clamp-1',
            2: 'line-clamp-2',
            3: 'line-clamp-3',
            4: 'line-clamp-4',
            5: 'line-clamp-5',
        },
    },
    defaultVariants: {
        variant: 'body',
        color: 'default',
        align: 'start',
    },
});
