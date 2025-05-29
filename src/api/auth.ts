import axios from 'axios';
import { LoginCredentials, User } from './types';
import { store } from '../store/store';
import { loginSuccess, logout } from '../store/authSlice';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const SESSION_EXPIRY_HOURS = 1;
const MILLISECONDS_PER_HOUR = 60 * 60 * 1000;

// Login API call
export const login = async (credentials: LoginCredentials): Promise<User> => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
  
  if (!response.data.data.token) {
    throw new Error('Authentication token not received from server');
  }
  
  const userData = response.data.data;
  setAuthToken(userData.token);
  storeUserData(userData);
  return userData;
};

// Store user data in localStorage
const storeUserData = (user: User): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
    // Store login timestamp
    localStorage.setItem('loginTime', Date.now().toString());
  }
};

// Get user data from localStorage
export const getUserData = (): User | null => {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }
  return null;
};

// Set authentication token in localStorage and axios headers
export const setAuthToken = (token: string): void => {
  if (!token) {
    console.error('Attempted to set empty token');
    return;
  }
  
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', token);
    // Set expiration time (current time + 1 hour)
    const expirationTime = Date.now() + (SESSION_EXPIRY_HOURS * MILLISECONDS_PER_HOUR);
    localStorage.setItem('tokenExpiration', expirationTime.toString());
  }
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Check if session is expired
const isSessionExpired = (): boolean => {
  if (typeof window === 'undefined') return true;
  
  const expiration = localStorage.getItem('tokenExpiration');
  if (!expiration) return true;
  
  return Date.now() > parseInt(expiration);
};

// Clear authentication token from localStorage and axios headers
export const clearAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenExpiration');
    localStorage.removeItem('user');
    localStorage.removeItem('loginTime');
  }
  delete axios.defaults.headers.common['Authorization'];
};

// Get authentication token from localStorage
export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    if (isSessionExpired()) {
      clearAuthToken();
      store.dispatch(logout());
      return null;
    }
    return localStorage.getItem('authToken');
  }
  return null;
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

// Get remaining session time in minutes
export const getRemainingSessionTime = (): number => {
  if (typeof window === 'undefined') return 0;
  
  const expiration = localStorage.getItem('tokenExpiration');
  if (!expiration) return 0;
  
  const remainingMs = parseInt(expiration) - Date.now();
  return Math.max(0, Math.floor(remainingMs / 60000));
};

// Initialize auth state from localStorage
export const initializeAuth = (): void => {
  if (!isSessionExpired()) {
    const token = localStorage.getItem('authToken');
    const user = getUserData();
    if (token && user) {
      store.dispatch(loginSuccess(user));
      setAuthToken(token);
    }
  } else {
    clearAuthToken();
  }
};

// Logout function
export const logoutUser = (): void => {
  clearAuthToken();
  store.dispatch(logout());
};