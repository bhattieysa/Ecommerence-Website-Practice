import { apiClient } from './apiClient';

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: 'ADMIN' | 'CUSTOMER';
  avatar?: string;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    accessToken: string;
    refreshToken?: string;
  };
}

export const authService = {
  // Login user
  login: async (credentials: LoginDto): Promise<AuthResponse> => {
    const response = await apiClient.axiosInstance.post<AuthResponse>(
      '/auth/login',
      credentials,
    );

    // Store tokens in localStorage
    if (response.data.data.accessToken) {
      localStorage.setItem('accessToken', response.data.data.accessToken);
    }
    if (response.data.data.refreshToken) {
      localStorage.setItem('refreshToken', response.data.data.refreshToken);
    }

    return response.data;
  },

  // Register user
  register: async (userData: RegisterDto): Promise<AuthResponse> => {
    const response = await apiClient.axiosInstance.post<AuthResponse>(
      '/auth/register',
      userData,
    );

    // Store tokens in localStorage
    if (response.data.data.accessToken) {
      localStorage.setItem('accessToken', response.data.data.accessToken);
    }
    if (response.data.data.refreshToken) {
      localStorage.setItem('refreshToken', response.data.data.refreshToken);
    }

    return response.data;
  },

  // Logout user
  logout: async (): Promise<void> => {
    try {
      await apiClient.axiosInstance.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear tokens from localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  },

  // Refresh access token
  refreshToken: async (): Promise<{ accessToken: string }> => {
    const response = await apiClient.axiosInstance.post<{
      success: boolean;
      data: { accessToken: string };
    }>('/auth/refresh-token');

    if (response.data.data.accessToken) {
      localStorage.setItem('accessToken', response.data.data.accessToken);
    }

    return response.data.data;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await apiClient.axiosInstance.get<{
      success: boolean;
      data: User;
    }>('/auth/me');
    return response.data;
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('accessToken');
  },

  // Get stored access token
  getAccessToken: (): string | null => {
    return localStorage.getItem('accessToken');
  },

  // Forgot password
  forgotPassword: async (email: string): Promise<void> => {
    await apiClient.axiosInstance.post<{ success: boolean; message: string }>(
      '/auth/forgot-password',
      { email },
    );
  },

  // Reset password
  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    await apiClient.axiosInstance.post<{ success: boolean; message: string }>(
      '/auth/reset-password',
      { token, newPassword },
    );
  },
};
