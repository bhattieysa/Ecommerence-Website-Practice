import { jsxs as _jsxs } from "react/jsx-runtime";
import { Typography } from '@/components/Typography';
import { cn } from '@/lib/utils/cn';
import { ratingCountVariants } from './ratingVariants';
export function RatingCount({ count, size = 'md', variant = 'default', className, }) {
    return (_jsxs(Typography, { variant: "bodySm", color: "muted", className: cn(ratingCountVariants({ size, variant }), className), children: ["(", count.toLocaleString(), ")"] }));
}
