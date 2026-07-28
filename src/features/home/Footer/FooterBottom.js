import { jsx as _jsx } from "react/jsx-runtime";
import { Typography } from '@/components/Typography';
import { footerBottomVariants } from './FooterVariants';
export function FooterBottom({ copyright }) {
    return (_jsx("div", { className: footerBottomVariants(), children: _jsx(Typography, { variant: "caption", className: "text-blue-100 text-center w-full", children: copyright }) }));
}
