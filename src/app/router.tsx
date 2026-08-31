import { createBrowserRouter } from 'react-router-dom';

import { MainLayout } from '@/layouts/MainLayout';
import AdminLayout from '@/layouts/AdminLayout';
import { ProtectedAdminRoute } from '@/components/auth/ProtectedAdminRoute';
import { HomePage } from '@/pages/Home';
import { ProductPage } from '@/pages/productPages/ProductViewPage';
import { CategoryPage } from '@/pages/categoryPages/CategoryViewPage';
import { ContactPage } from '@/pages/ContactPage';
import { ProductsPage } from '@/pages/ProductsPage';
import { CategoriesPage } from '@/pages/CategoriesPage';
import { DealsPage } from '@/pages/DealsPage';
import { WishlistPage } from '@/pages/WishlistPage';
import { AboutPage } from '@/pages/AboutPage';
import { AdminLogin } from '@/pages/auth/AdminLogin';
import Dashboard from '@/pages/admin/Dashboard';
import AddProduct from '@/pages/admin/AddProduct';
import AddCategory from '@/pages/admin/AddCategory';
import Orders from '@/pages/admin/Orders';
import Customers from '@/pages/admin/Customers';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'products/:slug',
        element: <ProductPage />,
      },
      {
        path: 'categories/:slug',
        element: <CategoryPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: 'categories',
        element: <CategoriesPage />,
      },
      {
        path: 'deals',
        element: <DealsPage />,
      },
      {
        path: 'wishlist',
        element: <WishlistPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
    ],
  },
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedAdminRoute>
        <AdminLayout />
      </ProtectedAdminRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'products',
        element: <AddProduct />,
      },
      {
        path: 'categories',
        element: <AddCategory />,
      },
      {
        path: 'orders',
        element: <Orders />,
      },
      {
        path: 'customers',
        element: <Customers />,
      },
    ],
  },
]);
