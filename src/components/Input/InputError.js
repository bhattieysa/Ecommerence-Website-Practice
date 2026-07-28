import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '@/lib/utils/cn';
export function InputError({ id, className, children, ...props }) {
    if (!children) {
        return null;
    }
    return (_jsx("p", { id: id, role: "alert", className: cn('mt-1 text-sm text-danger', className), ...props, children: children }));
}
