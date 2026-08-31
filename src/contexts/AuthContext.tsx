import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import {
  useCurrentUser,
  useLogin,
  useRegister,
  useLogout,
  type User,
} from '@/hooks/useAuth';
import { fetchCart } from '@/store/slices/cartSlice';

// User interface is now imported from useAuth hook

export interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<void>;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch();
  
  // Use TanStack Query for user data fetching
  const { data: currentUser, isLoading: userLoading } = useCurrentUser();

  // Local state for tokens (still needed for localStorage management)
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  // TanStack Query mutations for auth operations
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();

  const user = currentUser || null;
  const isAuthenticated = !!accessToken && !!user;
  const isLoading = userLoading;

  // Fetch cart when user becomes authenticated
  useEffect(() => {
    if (isAuthenticated && accessToken) {
      dispatch(fetchCart() as any);
    }
  }, [isAuthenticated, accessToken, dispatch]);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedRefreshToken = localStorage.getItem('refreshToken');

    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }
    if (storedRefreshToken) {
      setRefreshToken(storedRefreshToken);
    }
  }, []);

  // Listen for token refresh events from apiClient interceptor
  useEffect(() => {
    const handleRefreshed = (e: any) => {
      const token = e?.detail?.accessToken;
      if (token) setAccessToken(token);
    };
    const handleCleared = () => {
      setAccessToken(null);
      setRefreshToken(null);
    };

    window.addEventListener('megamar:accessTokenRefreshed', handleRefreshed as EventListener);
    window.addEventListener('megamar:accessTokenCleared', handleCleared as EventListener);

    return () => {
      window.removeEventListener('megamar:accessTokenRefreshed', handleRefreshed as EventListener);
      window.removeEventListener('megamar:accessTokenCleared', handleCleared as EventListener);
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Use TanStack Query mutation for login
      const response = await loginMutation.mutateAsync({ email, password });

      if (response.success && response.data) {
        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken || null);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      // Use TanStack Query mutation for register
      const response = await registerMutation.mutateAsync(data);

      if (response.success && response.data) {
        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken || null);
        // Cart will be fetched automatically by the useEffect when isAuthenticated becomes true
      }
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Use TanStack Query mutation for logout
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setAccessToken(null);
      setRefreshToken(null);
      // Clear local cart on logout
      dispatch({ type: 'cart/clearCart' });
    }
  };

  const getCurrentUser = async () => {
    // getCurrentUser is now handled by useCurrentUser hook
    // This method is kept for backward compatibility
    console.log('getCurrentUser is now handled by useCurrentUser hook');
  };

  const value: AuthContextType = {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    getCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
