import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useForgotPassword } from '@/hooks/useAuth';
import { EyeIcon } from '@/assets/icons/EyeIcon';
import { EyeOffIcon } from '@/assets/icons/EyeOffIcon';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPasswordMode, setIsForgotPasswordMode] = useState(false);
  const [forgotMessage, setForgotMessage] = useState('');
  const [forgotError, setForgotError] = useState('');

  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const forgotPasswordMutation = useForgotPassword();

  const from = (location.state as any)?.from?.pathname || '/admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});
    setIsLoading(true);

    try {
      await login(email, password);

      // Check if user is ADMIN after login
      if (user?.role !== 'ADMIN') {
        setError('You are not authorized to access the admin panel.');
        return;
      }

      navigate(from, { replace: true });
    } catch (err: any) {
      if (err.errors) {
        const hasEmptyField = !email || !password;
        if (!hasEmptyField) {
          setFieldErrors(err.errors);
        }
      } else {
        setError(err.message || 'Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError('');
    setForgotMessage('');
    setFieldErrors({});
    setIsLoading(true);

    try {
      // Use TanStack Query mutation for forgot password
      await forgotPasswordMutation.mutateAsync(email);
      setIsForgotPasswordMode(false);
      setEmail('');
    } catch (err: any) {
      if (err.errors) {
        setFieldErrors(err.errors);
      } else {
        setForgotError(
          err.message || 'Failed to send reset email. Please try again.',
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">MegaMart</h1>
          <h2 className="mt-6 text-2xl font-semibold text-gray-700">
            {isForgotPasswordMode ? 'Reset Password' : 'Welcome Back'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isForgotPasswordMode
              ? 'Enter your email to reset password'
              : 'Sign in to access the admin dashboard'}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Forgot Password Error */}
        {isForgotPasswordMode && forgotError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {forgotError}
          </div>
        )}

        {/* Form */}
        <form
          className="mt-8 space-y-6"
          onSubmit={isForgotPasswordMode ? handleForgotPassword : handleSubmit}
        >
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="admin@megamart.com"
                />
                {isForgotPasswordMode && fieldErrors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {fieldErrors.email[0]}
                  </p>
                )}
              </div>
            </div>

            {/* Password */}
            {!isForgotPasswordMode && (
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Remember Me & Forgot Password */}
            {!isForgotPasswordMode && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>

                <button
                  type="button"
                  onClick={() => setIsForgotPasswordMode(true)}
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {isForgotPasswordMode && (
              <button
                type="button"
                onClick={() => {
                  setIsForgotPasswordMode(false);
                  setForgotMessage('');
                  setForgotError('');
                }}
                className="text-sm text-gray-600 pl-35 underline decoration-gray-500  hover:text-blue-600 hover:decoration-blue-400"
              >
                Back to login
              </button>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {isForgotPasswordMode ? 'Sending...' : 'Signing in...'}
              </span>
            ) : isForgotPasswordMode ? (
              'Send Reset Link'
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center text-sm text-gray-600">
          <p>
            Need customer access?{' '}
            <a href="/" className="text-blue-600 hover:text-blue-500">
              Go to customer site
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
