import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Outlet } from 'react-router-dom';
export function MainLayout() {
    return (_jsx(_Fragment, { children: _jsx("main", { children: _jsx(Outlet, {}) }) }));
}
export default MainLayout;
