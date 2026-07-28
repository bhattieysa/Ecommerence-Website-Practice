import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils/cn';
import { badgeVariants } from '@/components/badge/BadgeVariants';
export const Badge = forwardRef(({ asChild = false, className, variant, size, shape, children, ...props }, ref) => {
    const Component = asChild ? Slot : 'span';
    const componentProps = props;
    return (_jsx(Component, { ref: ref, className: cn(badgeVariants({
            variant,
            size,
            shape,
        }), className), ...componentProps, children: children }));
});
Badge.displayName = 'Badge';
