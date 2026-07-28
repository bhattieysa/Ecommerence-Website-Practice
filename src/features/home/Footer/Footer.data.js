import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FaWhatsapp, FaFacebookF, FaTwitter, FaInstagram, FaYoutube, } from 'react-icons/fa';
import { FiPhoneCall } from 'react-icons/fi';
import { Typography } from '@/components/Typography';
import { GooglePlayButton, AppStoreButton } from 'react-mobile-app-button';
const iosUrl = 'https://apple.com';
const androidUrl = 'https://google.com';
export const footerLogo = (_jsx(Typography, { variant: "heading1", children: "MegaMart" }));
export const footerDescription = (_jsxs("div", { className: "space-y-5", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Typography, { variant: "heading5", className: "text-white", children: "Contact Us" }), _jsx(Typography, { variant: "body", className: "text-muted-foreground max-w-[24rem]", children: "Reach us on WhatsApp or call our support team for order help, returns, or app downloads." })] }), _jsx(Typography, { variant: "caption", className: "text-muted-foreground uppercase tracking-[0.18em]", children: "Download App" })] }));
export const footerContacts = [
    {
        icon: _jsx(FaWhatsapp, { size: 20, className: "text-green-500" }),
        label: 'WhatsApp',
        value: '+92 220-918-2132',
    },
    {
        icon: _jsx(FiPhoneCall, { size: 20, className: "text-blue-500" }),
        label: 'Call us',
        value: '+92 220-918-2132',
    },
];
export const footerDownloadApps = [
    {
        label: 'App Store',
        href: iosUrl,
        type: 'apple',
        button: (_jsx("div", { className: "h-20 w-52", children: _jsx(AppStoreButton, { url: iosUrl, theme: "dark", height: 80, width: 208 }) })),
    },
    {
        label: 'Google Play',
        href: androidUrl,
        type: 'google',
        button: (_jsx("div", { className: "h-20 w-52", children: _jsx(GooglePlayButton, { url: androidUrl, theme: "dark", height: 80, width: 208 }) })),
    },
];
export const footerColumns = [
    {
        id: 'categories',
        title: 'Most Popular Categories',
        links: [
            { label: 'Staples', href: '#' },
            { label: 'Beverages', href: '#' },
            { label: 'Personal Care', href: '#' },
            { label: 'Home Care', href: '#' },
            { label: 'Baby Care', href: '#' },
            { label: 'Vegetables & Fruits', href: '#' },
            { label: 'Snacks & Foods', href: '#' },
            { label: 'Dairy & Bakery', href: '#' },
        ],
    },
    {
        id: 'services',
        title: 'Customer Services',
        links: [
            { label: 'About Us', href: '#' },
            { label: 'Terms & Conditions', href: '#' },
            { label: 'FAQ', href: '#' },
            { label: 'Privacy Policy', href: '#' },
            { label: 'E-wallet Policy', href: '#' },
            { label: 'Cancellation & Return Policy', href: '#' },
        ],
    },
];
export const footerCopyright = '© 2022 All rights reserved. Reliance Retail Ltd.';
export const footerBottomLinks = [];
export const footerSocials = [
    {
        icon: _jsx(FaFacebookF, { size: 20 }),
        href: '#',
        label: 'Facebook',
    },
    {
        icon: _jsx(FaTwitter, { size: 20 }),
        href: '#',
        label: 'Twitter',
    },
    {
        icon: _jsx(FaInstagram, { size: 20 }),
        href: '#',
        label: 'Instagram',
    },
    {
        icon: _jsx(FaYoutube, { size: 20 }),
        href: '#',
        label: 'YouTube',
    },
];
