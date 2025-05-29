import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/hook';
import { getRemainingSessionTime } from '../../api/auth';

interface PrivateRouteProps {
  children: JSX.Element;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const location = useLocation();
  const { user, initialized } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Check session time remaining periodically
    const checkSession = () => {
      const remainingTime = getRemainingSessionTime();
      if (remainingTime <= 0) {
        window.location.reload();
      }
    };
    
    const interval = setInterval(checkSession, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!initialized) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};