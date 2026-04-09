import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAppSelector } from '../../hooks/useAppSelector';

export default function ProtectedRoute() {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
