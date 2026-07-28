import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '@/lib/utils/cn';
export function InputGroup({ className, children, ...props }) {
    return (_jsx("div", { className: cn('relative flex items-center', className), ...props, children: children }));
}
