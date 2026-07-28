import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { ICONS } from '@/components/IconButton/IconButton.constants';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Box, } from '@mui/material';
import { IconButton } from '@/components/IconButton';
import { Input } from '@/components/Input';
import { Typography } from '@/components/Typography';
import { APP_BRAND, NAVBAR_LABELS, NAVBAR_LINKS } from './Navbar.constants';
import { Navbar } from './Navbar';
export function AppNavbar() {
    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    const DrawerList = (_jsxs(Box, { className: "w-80 h-full flex flex-col", role: "presentation", onClick: toggleDrawer(false), onKeyDown: toggleDrawer(false), children: [_jsxs(Box, { className: "flex items-center justify-between p-6 border-b border-gray-100", children: [_jsx(Typography, { variant: "h1", className: "font-bold tracking-tight text-blue-500 text-xl", children: APP_BRAND.name }), _jsx(IconButton, { icon: "close", "aria-label": "Close menu", onClick: toggleDrawer(false), variant: "ghost", size: "md", className: "text-gray-500 hover:text-gray-700 hover:bg-gray-100" })] }), _jsx(List, { className: "flex-1 py-4 px-3", children: NAVBAR_LINKS.map((link) => (_jsx(ListItem, { disablePadding: true, className: "mb-1", children: _jsxs(ListItemButton, { component: "a", href: link.href, className: "rounded-xl transition-all duration-200 hover:bg-blue-50 hover:shadow-sm active:bg-blue-100", sx: {
                            borderRadius: 2,
                            '&:hover': {
                                backgroundColor: '#eff6ff',
                            },
                            '&.Mui-selected': {
                                backgroundColor: '#dbeafe',
                            },
                        }, children: [link.icon && (_jsx(ListItemIcon, { className: "min-w-12", children: _jsx(IconButton, { icon: link.icon, className: "text-blue-500" }) })), _jsx(ListItemText, { primary: link.label, className: "text-gray-700 font-medium", slotProps: {
                                    primary: {
                                        className: 'font-medium text-gray-700',
                                    },
                                } })] }) }, link.label))) }), _jsx(Divider, { className: "border-gray-100" }), _jsx(Box, { className: "p-4 bg-gray-50", children: _jsxs(List, { className: "py-2", children: [_jsx(ListItem, { disablePadding: true, className: "mb-1", children: _jsxs(ListItemButton, { className: "rounded-xl transition-all duration-200 hover:bg-gray-100", sx: { borderRadius: 2 }, children: [_jsx(ListItemIcon, { className: "min-w-12", children: _jsx(IconButton, { icon: "user", className: "text-gray-500" }) }), _jsx(ListItemText, { primary: "Profile", className: "text-gray-600", slotProps: {
                                            primary: {
                                                className: 'text-gray-600',
                                            },
                                        } })] }) }), _jsx(ListItem, { disablePadding: true, children: _jsxs(ListItemButton, { className: "rounded-xl transition-all duration-200 hover:bg-gray-100", sx: { borderRadius: 2 }, children: [_jsx(ListItemIcon, { className: "min-w-12", children: _jsx(IconButton, { icon: "cart", className: "text-gray-500" }) }), _jsx(ListItemText, { primary: "Cart", className: "text-gray-600", slotProps: {
                                            primary: {
                                                className: 'text-gray-600',
                                            },
                                        } })] }) })] }) })] }));
    return (_jsxs(_Fragment, { children: [_jsx(Navbar, { left: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(IconButton, { icon: "menu", "aria-label": "Open menu", "aria-expanded": open, "aria-controls": "navigation-drawer", onClick: toggleDrawer(true), variant: "ghost", size: "lg", className: "bg-blue-100 text-blue-500 hover:bg-blue-200" }), _jsx(Typography, { variant: "h1", className: "font-bold tracking-tight text-blue-500", children: APP_BRAND.name })] }), center: _jsxs("div", { className: "relative hidden md:block", children: [_jsx("div", { className: "absolute inset-y-0 left-3 flex items-center", children: _jsx(ICONS.search, { className: "h-7 w-7 text-blue-500" }) }), _jsx(Input, { className: "pl-12 bg-blue-50 border-blue-200 h-15", placeholder: NAVBAR_LABELS.searchPlaceholder })] }), right: _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "hidden md:flex items-center gap-2", children: [_jsx(IconButton, { icon: "user", "aria-label": "User Profile", variant: "ghost", size: "lg", className: "text-blue-500 hover:text-blue-600" }), _jsx(Typography, { variant: "bodyLg", className: "font-medium text-gray-600", children: "Sign In" })] }), _jsx(IconButton, { icon: "user", "aria-label": "User Profile", variant: "ghost", size: "lg", className: "md:hidden text-blue-500 hover:text-blue-600" }), _jsxs("div", { className: "hidden lg:flex items-center gap-2", children: [_jsx(IconButton, { icon: "cart", "aria-label": "Shopping Cart", variant: "ghost", size: "lg", className: "text-blue-500 hover:text-blue-600" }), _jsx(Typography, { variant: "bodyLg", className: "font-medium text-gray-600", children: "Cart" })] }), _jsx(IconButton, { icon: "cart", "aria-label": "Shopping Cart", variant: "ghost", size: "lg", className: "lg:hidden text-blue-500 hover:text-blue-600" })] }) }), _jsx("div", { className: "md:hidden px-4 py-4 border-b bg-background", children: _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-3 flex items-center", children: _jsx(ICONS.search, { className: "h-6 w-6 text-blue-500" }) }), _jsx(Input, { className: "pl-10 bg-blue-50 border-blue-200 h-12", placeholder: NAVBAR_LABELS.searchPlaceholder })] }) }), _jsx(Drawer, { open: open, onClose: toggleDrawer(false), slotProps: {
                    paper: {
                        className: 'border-r border-gray-200 shadow-xl',
                        sx: {
                            borderTopRightRadius: 16,
                            borderBottomRightRadius: 16,
                        },
                    },
                }, children: DrawerList })] }));
}
