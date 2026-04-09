import { Suspense, lazy, type ReactNode } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '../components/layout/MainLayout';
import ProtectedRoute from '../components/routes/ProtectedRoute';

const Landing = lazy(() => import('../pages/landing/Landing'));
const Men = lazy(() => import('../pages/men/Men'));
const Women = lazy(() => import('../pages/women/Women'));
const Login = lazy(() => import('../pages/login/Login'));
const Signup = lazy(() => import('../pages/signup/Signup'));
const Cart = lazy(() => import('../pages/cart/Cart'));
const MyPage = lazy(() => import('../pages/mypage/MyPage'));
const NotFound = lazy(() => import('../pages/not-found/NotFound'));

const withSuspense = (element: ReactNode) => (
  <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>
);

export const router = createBrowserRouter([
  { path: '/', element: withSuspense(<Landing />) },
  {
    element: <MainLayout />,
    children: [
      { path: '/men', element: withSuspense(<Men />) },
      { path: '/women', element: withSuspense(<Women />) },
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/cart', element: withSuspense(<Cart />) },
          { path: '/mypage', element: withSuspense(<MyPage />) },
        ],
      },
      { path: '/login', element: withSuspense(<Login />) },
      { path: '/signup', element: withSuspense(<Signup />) },
      { path: '*', element: withSuspense(<NotFound />) },
    ],
  },
]);
