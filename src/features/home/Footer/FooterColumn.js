import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { Typography } from '@/components/Typography';
import { footerColumnVariants, footerLinkVariants, footerLinksVariants, } from './FooterVariants';
export function FooterColumn({ title, links }) {
    return (_jsxs("div", { className: footerColumnVariants(), children: [_jsx(Typography, { variant: "heading5", className: "text-lg font-semibold text-white border-b-2 border-white pb-2 mb-2", children: title }), _jsx("nav", { "aria-label": title, className: footerLinksVariants(), children: links.map((link) => (_jsxs(Link, { to: link.href, className: footerLinkVariants(), children: [_jsx("span", { className: "mr-2", children: "\u2022" }), link.label] }, link.label))) })] }));
}
