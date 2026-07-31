import { Outlet, useLocation } from 'react-router-dom';

import { AppNavbar } from '@/layouts/Navbar';
import { AnnouncementBar } from '@/layouts/AnnouncementBar';
import { Footer } from '@/features/home/Footer';
import {
  footerLogo,
  footerContacts,
  footerDownloadApps,
  footerColumns,
  footerCopyright,
} from '@/features/home/Footer/Footer.data';

import { CategoryDropdowns } from '@/components/Dropdown';

export function MainLayout() {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith('/auth');

  return (
    <>
      <AnnouncementBar />
      <AppNavbar />
      {!isAuthPage && (
        <div className="relative z-10">
          <CategoryDropdowns />
        </div>
      )}
      <Outlet />
      <Footer
        logo={footerLogo}
        contacts={footerContacts}
        downloadApps={footerDownloadApps}
        columns={footerColumns}
        copyright={footerCopyright}
      />
    </>
  );
}

export default MainLayout;
