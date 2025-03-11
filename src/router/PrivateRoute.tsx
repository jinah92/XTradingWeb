// PrivateRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import LoadingSpinner from '@/components/LoadingSpinner';
import MainLayout from '@/layout/MainLayout';

import { useAuth } from './AuthContext';

interface PrivateRouteProps {
  layout?: React.ReactNode;
}

const PrivateRoute = ({ layout }: PrivateRouteProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  console.log(isAuthenticated);

  // 상태가 결정될 때까지 로딩 상태를 보여줍니다.
  if (isAuthenticated === null) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return isAuthenticated ? (layout ?? <MainLayout />) : <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
