import { createBrowserRouter } from 'react-router-dom';

import { MainLayout } from '@/layouts/MainLayout';
import { HomePage } from '@/pages/Home';
import { LoginPage } from '@/pages/authPages/LoginPage';
import { RegisterPage } from '@/pages/authPages/RegisterPage';
import { ProductPage } from '@/pages/productPages/ProductPage';
import { CategoryPage } from '@/pages/categoryPages/CategoryPage';
import { PromotionPage } from '@/pages/promotionPages/PromotionPage';

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
        path: 'auth/login',
        element: <LoginPage />,
      },
      {
        path: 'auth/register',
        element: <RegisterPage />,
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
        path: 'promotions/:slug',
        element: <PromotionPage />,
      },
    ],
  },
]);
