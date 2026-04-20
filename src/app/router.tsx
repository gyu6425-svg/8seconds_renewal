/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy, type ReactNode } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '../components/layout/MainLayout';
import ProtectedRoute from '../components/routes/ProtectedRoute';
import PageSkeleton from '../components/common/PageSkeleton';

const Landing = lazy(() => import('../pages/landing/Landing'));
const Men = lazy(() => import('../pages/men/Men'));
const Women = lazy(() => import('../pages/women/Women'));
const Login = lazy(() => import('../pages/login/Login'));
const Signup = lazy(() => import('../pages/signup/Signup'));
const Cart = lazy(() => import('../pages/cart/Cart'));
const MyPage = lazy(() => import('../pages/mypage/MyPage'));
const RoutePlaceholder = lazy(() => import('../pages/placeholder/RoutePlaceholder'));
const NotFound = lazy(() => import('../pages/not-found/NotFound'));

const withSuspense = (element: ReactNode) => (
  <Suspense fallback={<PageSkeleton />}>{element}</Suspense>
);

export const router = createBrowserRouter([
  { path: '/', element: withSuspense(<Landing />) },
  {
    element: <MainLayout />,
    children: [
      { path: '/men', element: withSuspense(<Men />) },
      { path: '/women', element: withSuspense(<Women />) },
      { path: '/bag-shoes', element: withSuspense(<RoutePlaceholder />) },
      { path: '/life', element: withSuspense(<RoutePlaceholder />) },
      { path: '/outlet', element: withSuspense(<RoutePlaceholder />) },
      { path: '/new', element: withSuspense(<RoutePlaceholder />) },
      { path: '/special', element: withSuspense(<RoutePlaceholder />) },
      { path: '/products/:productId', element: withSuspense(<RoutePlaceholder />) },
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/cart', element: withSuspense(<Cart />) },
          { path: '/mypage', element: withSuspense(<MyPage />) },
          { path: '/mypage/orders', element: withSuspense(<RoutePlaceholder />) },
          { path: '/mypage/profile', element: withSuspense(<RoutePlaceholder />) },
        ],
      },
      { path: '/login', element: withSuspense(<Login />) },
      { path: '/signup', element: withSuspense(<Signup />) },
      { path: '*', element: withSuspense(<NotFound />) },
    ],
  },
]);
