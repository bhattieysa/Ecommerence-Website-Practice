import { Outlet } from 'react-router-dom';

export function MainLayout() {
  return (
    <>
      {/* Navbar */}

      <main>
        <Outlet />
      </main>

      {/* Footer */}
    </>
  );
}

export default MainLayout;
