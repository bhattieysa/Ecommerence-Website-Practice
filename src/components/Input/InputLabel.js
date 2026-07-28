import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '@/lib/utils/cn';
export function InputLabel({ children, required, className, ...props }) {
    return (_jsxs("label", { className: cn('mb-2 block text-sm font-medium text-text', className), ...props, children: [children, required && _jsx("span", { className: "ml-1 text-danger", children: "*" })] }));
}
