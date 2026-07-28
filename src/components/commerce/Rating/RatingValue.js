import { jsx as _jsx } from "react/jsx-runtime";
import { Typography } from '@/components/Typography';
import { cn } from '@/lib/utils/cn';
import { ratingValueVariants } from './ratingVariants';
export function RatingValue({ value, precision = 1, size = 'md', variant = 'default', className, }) {
    return (_jsx(Typography, { variant: "bodySm", className: cn(ratingValueVariants({ size, variant }), className), children: value.toFixed(precision) }));
}
