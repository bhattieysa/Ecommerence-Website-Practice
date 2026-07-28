import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Container } from '@/components/Container';
import { Typography } from '@/components/Typography';
import { cn } from '@/lib/utils/cn';
import { FooterBottom } from './FooterBottom';
import { FooterColumn } from './FooterColumn';
import { footerBrandVariants, footerColumnsVariants, footerContactItemVariants, footerContactVariants, footerContentVariants, footerDownloadVariants, footerVariants, } from './FooterVariants';
export function Footer({ logo, contacts, downloadApps, columns, copyright, className, ...props }) {
    return (_jsx("footer", { className: cn(footerVariants(), className), ...props, children: _jsxs(Container, { size: "hero", children: [_jsxs("div", { className: footerContentVariants(), children: [_jsxs("div", { className: footerBrandVariants(), children: [logo, contacts && contacts.length > 0 && (_jsx("div", { className: footerContactVariants(), children: contacts.map((contact) => (_jsxs("div", { className: footerContactItemVariants(), children: [_jsx("span", { className: "p-2 bg-white/10 rounded-lg", children: contact.icon }), _jsxs("div", { className: "flex flex-col", children: [_jsx(Typography, { variant: "caption", className: "text-blue-100", children: contact.label }), _jsx(Typography, { variant: "body", className: "text-white", children: contact.value })] })] }, contact.label))) })), downloadApps && downloadApps.length > 0 && (_jsx("div", { className: cn(footerDownloadVariants()), children: downloadApps.map((app) => (_jsx("div", { children: app.button }, app.label))) }))] }), _jsx("div", { className: footerColumnsVariants(), children: columns.map((column) => (_jsx(FooterColumn, { ...column }, column.id))) })] }), _jsx(FooterBottom, { copyright: copyright })] }) }));
}
