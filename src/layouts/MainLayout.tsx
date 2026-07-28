import { Outlet } from 'react-router-dom';

import { AppNavbar } from '@/layouts/Navbar';

export function MainLayout() {
  return (
    <>
      <AppNavbar />
      <Outlet />
    </>
  );
}

export default MainLayout;
