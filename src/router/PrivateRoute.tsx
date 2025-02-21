// PrivateRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import LoadingSpinner from '@/components/LoadingSpinner';

import { useAuth } from './AuthContext';

interface PrivateRouteProps {
  element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
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

  return isAuthenticated ? element : <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
