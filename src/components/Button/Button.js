import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { ButtonVariants } from '@/components/Button/ButtonVariants';
export const Button = forwardRef(({ className, variant, size, layout, fullWidth, isLoading, disabled, children, ...props }, ref) => {
    return (_jsxs("button", { ref: ref, disabled: disabled || isLoading, className: cn(ButtonVariants({
            variant,
            size,
            layout,
            fullWidth,
        }), className), ...props, children: [isLoading && _jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), children] }));
});
Button.displayName = 'Button';
