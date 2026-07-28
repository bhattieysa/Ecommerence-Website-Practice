import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '@/lib/utils/cn';
import { Container } from '@/components/Container';
import { NavbarVariants } from './NavbarVariants';
export function Navbar({ left, center, right, sticky, bordered, elevated, className, ...props }) {
    return (_jsx("header", { role: "banner", className: cn(NavbarVariants({
            sticky,
            bordered,
            elevated,
        }), className), ...props, children: _jsx(Container, { size: "full", children: _jsxs("div", { className: "flex items-center justify-between gap-8 py-6 px-4 md:px-6 lg:px-8", children: [left && _jsx("div", { className: "flex items-center gap-4", children: left }), center && (_jsx("div", { className: "flex-1 max-w-3xl xl:max-w-7xl", children: center })), right && _jsx("div", { className: "flex items-center gap-3", children: right })] }) }) }));
}
