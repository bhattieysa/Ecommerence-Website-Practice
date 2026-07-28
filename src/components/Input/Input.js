import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';
import { inputVariants } from '@/components/Input/InputVariants';
export const Input = forwardRef(({ className, variant, size, hasError, ...props }, ref) => {
    return (_jsx("input", { ref: ref, className: cn(inputVariants({
            variant,
            size,
            hasError,
        }), className), ...props }));
});
Input.displayName = 'Input';
