import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '@/lib/utils/cn';
export function InputHelperText({ id, className, children, ...props }) {
    return (_jsx("p", { id: id, className: cn('mt-1 text-sm text-text-muted', className), ...props, children: children }));
}
