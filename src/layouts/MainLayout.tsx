import { Outlet } from 'react-router-dom';

import { AppNavbar } from '@/layouts/Navbar';
import { AnnouncementBar } from '@/layouts/AnnouncementBar';

export function MainLayout() {
  return (
    <>
      <AnnouncementBar />
      <AppNavbar />
      <Outlet />
    </>
  );
}

export default MainLayout;
