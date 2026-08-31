import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/authService';
import type {
  LoginDto,
  RegisterDto,
  User,
  AuthResponse,
} from '../services/authService';

export type { User };

export const authQueryKeys = {
  currentUser: ['auth', 'currentUser'] as const,
  isAuthenticated: ['auth', 'isAuthenticated'] as const,
};


export const useCurrentUser = () => {
  return useQuery({
    queryKey: authQueryKeys.currentUser,
    queryFn: async () => {
      const response = await authService.getCurrentUser();
      return response.data;
    },
    enabled: authService.isAuthenticated(), 
    staleTime: 1000 * 60 * 5,
    retry: false, 
  });
};


export const useIsAuthenticated = () => {
  return useQuery({
    queryKey: authQueryKeys.isAuthenticated,
    queryFn: () => authService.isAuthenticated(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};


export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginDto): Promise<AuthResponse> => {
      return await authService.login(credentials);
    },
    onSuccess: (data) => {
      // Invalidate current user query to trigger refetch
      queryClient.invalidateQueries({ queryKey: authQueryKeys.currentUser });
      queryClient.invalidateQueries({
        queryKey: authQueryKeys.isAuthenticated,
      });
    },
    onError: (error) => {
      console.error('Login error:', error);
    },
  });
};


export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: RegisterDto): Promise<AuthResponse> => {
      return await authService.register(userData);
    },
    onSuccess: (data) => {
      // Invalidate current user query to trigger refetch
      queryClient.invalidateQueries({ queryKey: authQueryKeys.currentUser });
      queryClient.invalidateQueries({
        queryKey: authQueryKeys.isAuthenticated,
      });
    },
    onError: (error) => {
      console.error('Registration error:', error);
    },
  });
};


export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await authService.logout();
    },
    onSuccess: () => {
      // Clear all auth-related queries from cache
      queryClient.invalidateQueries({ queryKey: authQueryKeys.currentUser });
      queryClient.invalidateQueries({
        queryKey: authQueryKeys.isAuthenticated,
      });
      // Clear entire query cache to remove any user-specific data
      queryClient.clear();
    },
    onError: (error) => {
      console.error('Logout error:', error);
      // Still clear cache even if logout fails
      queryClient.clear();
    },
  });
};


export const useRefreshToken = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return await authService.refreshToken();
    },
    onSuccess: () => {
      // Invalidate current user query to trigger refetch with new token
      queryClient.invalidateQueries({ queryKey: authQueryKeys.currentUser });
    },
    onError: (error) => {
      console.error('Token refresh error:', error);
      // On refresh error, user should be logged out
      queryClient.clear();
    },
  });
};


export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      await authService.forgotPassword(email);
    },
    onError: (error) => {
      console.error('Forgot password error:', error);
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async ({
      token,
      newPassword,
    }: {
      token: string;
      newPassword: string;
    }) => {
      await authService.resetPassword(token, newPassword);
    },
    onError: (error) => {
      console.error('Reset password error:', error);
    },
  });
};
