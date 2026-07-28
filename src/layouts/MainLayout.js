import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from 'react-router-dom';
import { AppNavbar } from '@/layouts/Navbar';
export function MainLayout() {
    return (_jsxs(_Fragment, { children: [_jsx(AppNavbar, {}), _jsx(Outlet, {})] }));
}
export default MainLayout;
