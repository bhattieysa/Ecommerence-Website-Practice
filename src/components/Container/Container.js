import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';
import { containerVariants } from '@/components/Container/ContainerVariant';
export const Container = forwardRef(({ className, size, ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: cn(containerVariants({ size }), className), ...props }));
});
Container.displayName = "Container";
