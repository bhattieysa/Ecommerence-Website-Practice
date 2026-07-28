import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { starVariants } from './ratingVariants';
export function StarIcon({ state, size, className }) {
    return (_jsxs("span", { className: "relative inline-flex", "aria-hidden": "true", children: [_jsx(Star, { className: cn(starVariants({ size, state }), 'text-gray-300 dark:text-gray-600', className) }), state !== 'empty' && (_jsx("span", { className: cn('absolute inset-0 overflow-hidden', state === 'half' ? 'w-1/2' : 'w-full'), children: _jsx(Star, { fill: "currentColor", className: cn(starVariants({ size, state }), 'text-yellow-400 dark:text-yellow-500') }) }))] }));
}
