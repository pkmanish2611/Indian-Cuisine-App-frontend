import React, { useEffect } from 'react';
import { useAppDispatch } from '../../store/hook';
import { initializeAuth } from '../../api/auth';
import { setInitialized } from '../../store/authSlice';

export const AuthInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    initializeAuth();
    dispatch(setInitialized());
  }, [dispatch]);

  return <>{children}</>;
};