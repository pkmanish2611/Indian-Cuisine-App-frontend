import axios from 'axios';
import { LoginCredentials, User } from './types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Login API call
export const login = async (credentials: LoginCredentials): Promise<User> => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
  
  if (!response.data.data.token) {
    throw new Error('Authentication token not received from server');
  }
  return response.data.data;
};

// Set authentication token in localStorage and axios headers
export const setAuthToken = (token: string): void => {
  if (!token) {
    console.error('Attempted to set empty token');
    return;
  }
  
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', token);
    localStorage.setItem('tokenExpiration', String(Date.now() + 3600000));
    console.log('Token stored in localStorage:', { authToken: token });
  }
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Clear authentication token from localStorage and axios headers
export const clearAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenExpiration');
    localStorage.removeItem('user');
  }
  delete axios.defaults.headers.common['Authorization'];
};

// Get authentication token from localStorage
export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken');
    const expiration = localStorage.getItem('tokenExpiration');
    
    if (!token) {
      return null;
    }
    
    if (expiration && Date.now() > parseInt(expiration)) {
      clearAuthToken();
      return null;
    }
    
    return token;
  }
  return null;
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

// Logout function (clears token and any user data)
export const logout = (): void => {
  clearAuthToken();
};