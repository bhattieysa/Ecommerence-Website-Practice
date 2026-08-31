import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils/cn';
import { useAuth } from '@/contexts/AuthContext';
import { useForgotPassword } from '@/hooks/useAuth';

import { FacebookIcon } from '@/assets/icons/FacebookIcon';
import { GoogleIcon } from '@/assets/icons/GoogleIcon';
import { LinkedinIcon } from '@/assets/icons/LinkedinIcon';
import { EyeIcon } from '@/assets/icons/EyeIcon';
import { EyeOffIcon } from '@/assets/icons/EyeOffIcon';

import {
  baseStyles,
  colorThemes,
  sizes,
  animations,
} from './SlidingAuth.variants';
import type { SlidingAuthProps } from './SlidingAuth.types';

export function SlidingAuth({
  className,
  colorTheme = 'blue',
  size = 'md',
  animation = 'normal',
}: SlidingAuthProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerFirstName, setRegisterFirstName] = useState('');
  const [registerLastName, setRegisterLastName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [isForgotPasswordMode, setIsForgotPasswordMode] = useState(false);
  const [forgotMessage, setForgotMessage] = useState('');
  const [forgotError, setForgotError] = useState('');

  const { login, register, user } = useAuth();
  const navigate = useNavigate();
  const forgotPasswordMutation = useForgotPassword();

  const theme = colorThemes[colorTheme];
  const sizeConfig = sizes[size];
  const animationDuration = animations[animation];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(loginEmail, loginPassword);

      // If CUSTOMER, close modal and stay on page
      window.location.reload(); // Simple way to close modal and refresh state
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});
    setIsLoading(true);

    try {
      await register({
        firstName: registerFirstName,
        lastName: registerLastName,
        email: registerEmail,
        password: registerPassword,
      });

      // Registration always creates CUSTOMER, so just close modal
      window.location.reload();
    } catch (err: any) {
      if (err.errors) {
        // Only show field errors if all fields have values
        const hasEmptyField =
          !registerFirstName ||
          !registerLastName ||
          !registerEmail ||
          !registerPassword;
        if (!hasEmptyField) {
          setFieldErrors(err.errors);
        }
      } else {
        setError(err.message || 'Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminLoginRedirect = () => {
    navigate('/admin/login');
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError('');
    setForgotMessage('');
    setFieldErrors({});
    setIsLoading(true);

    try {
      // Use TanStack Query mutation for forgot password
      await forgotPasswordMutation.mutateAsync(loginEmail);
      setIsForgotPasswordMode(false);
      setLoginEmail('');
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
    <div className={cn(baseStyles.container, sizeConfig.container, className)}>
      <div className="relative h-full w-full flex flex-col md:flex-row">
        {/* Login Form */}
        <form
          onSubmit={isForgotPasswordMode ? handleForgotPassword : handleLogin}
          className={cn(
            baseStyles.formPanel,
            baseStyles.leftPanel,
            baseStyles.transition,
            animationDuration,
            !isSignUp ? baseStyles.active : baseStyles.inactive,
            isSignUp ? 'hidden md:flex' : 'flex',
          )}
        >
          <h2 className={cn(baseStyles.heading, sizeConfig.heading)}>
            {isForgotPasswordMode ? 'Reset Password' : 'Sign in'}
          </h2>
          <p className={cn(baseStyles.subtitle, sizeConfig.subtitle)}>
            {isForgotPasswordMode
              ? 'Enter your email to reset password'
              : 'Use your email account'}
          </p>

          {/* Social Icons */}
          {!isForgotPasswordMode && (
            <div className="mb-6 md:mb-8 flex gap-4">
              <button className={cn(baseStyles.socialButton, theme.hover)}>
                <FacebookIcon className="h-4 w-4 md:h-5 md:w-5" />
              </button>
              <button className={cn(baseStyles.socialButton, theme.hover)}>
                <GoogleIcon className="h-4 w-4 md:h-5 md:w-5" />
              </button>
              <button className={cn(baseStyles.socialButton, theme.hover)}>
                <LinkedinIcon className="h-4 w-4 md:h-5 md:w-5" />
              </button>
            </div>
          )}

          {!isForgotPasswordMode && (
            <p className={baseStyles.divider}>or use your email</p>
          )}

          {/* Forgot Password Messages */}
          {isForgotPasswordMode && forgotError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {forgotError}
            </div>
          )}

          {/* Form Fields */}
          <div className="w-full max-w-xs md:max-w-sm space-y-3 md:space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className={cn(baseStyles.input, sizeConfig.input, theme.focus)}
                required
              />
              {isForgotPasswordMode && fieldErrors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {fieldErrors.email[0]}
                </p>
              )}
            </div>
            {!isForgotPasswordMode && (
              <div className="relative">
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className={cn(
                    baseStyles.input,
                    sizeConfig.input,
                    theme.focus,
                    'pr-10',
                  )}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showLoginPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            )}
          </div>

          {!isForgotPasswordMode && (
            <button
              type="button"
              onClick={() => setIsForgotPasswordMode(true)}
              className={cn(
                baseStyles.divider,
                'mb-4 md:mb-6 mt-3 md:mt-4 cursor-pointer',
                theme.hover,
              )}
            >
              Forgot your password?
            </button>
          )}

          {isForgotPasswordMode && (
            <div className="flex gap-3   md:mb-2 mt-3 md:mt-4 underline decoration-gray-500 hover:decoration-blue-500">
              <button
                type="button"
                onClick={() => {
                  setIsForgotPasswordMode(false);
                  setForgotMessage('');
                  setForgotError('');
                }}
                className={cn(
                  baseStyles.divider,
                  'cursor-pointer',
                  theme.hover,
                )}
              >
                Back to login
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              baseStyles.primaryButton,
              sizeConfig.button,
              theme.from,
              theme.to,
              theme.fromHover,
              theme.toHover,
              'disabled:opacity-50 disabled:cursor-not-allowed',
            )}
          >
            {isLoading
              ? isForgotPasswordMode
                ? 'Sending...'
                : 'Signing in...'
              : isForgotPasswordMode
                ? 'Send Reset Link'
                : 'SIGN IN'}
          </button>

          {/* Mobile toggle button */}
          <button
            type="button"
            onClick={() => setIsSignUp(true)}
            className="md:hidden mt-4 text-sm text-blue-600 hover:underline"
          >
            Don't have an account? Sign up
          </button>
        </form>

        {/* Register Form */}
        <form
          onSubmit={handleRegister}
          className={cn(
            baseStyles.formPanel,
            baseStyles.rightPanel,
            baseStyles.transition,
            animationDuration,
            isSignUp ? baseStyles.active : baseStyles.inactive,
            isSignUp ? 'flex' : 'hidden md:flex',
          )}
        >
          <h2 className={cn(baseStyles.heading, sizeConfig.heading)}>
            Create Account
          </h2>
          <p className={cn(baseStyles.subtitle, sizeConfig.subtitle)}>
            Use your email for registration
          </p>

          {/* Social Icons */}
          <div className="mb-6 md:mb-8 flex gap-4">
            <button
              type="button"
              className={cn(baseStyles.socialButton, theme.hover)}
            >
              <FacebookIcon className="h-4 w-4 md:h-5 md:w-5" />
            </button>
            <button
              type="button"
              className={cn(baseStyles.socialButton, theme.hover)}
            >
              <GoogleIcon className="h-4 w-4 md:h-5 md:w-5" />
            </button>
            <button
              type="button"
              className={cn(baseStyles.socialButton, theme.hover)}
            >
              <LinkedinIcon className="h-4 w-4 md:h-5 md:w-5" />
            </button>
          </div>

          <p className={baseStyles.divider}>
            or use your email for registration
          </p>

          {/* Form Fields */}
          <div className="w-full max-w-xs md:max-w-sm space-y-3 md:space-y-4">
            <div>
              <input
                type="text"
                placeholder="First Name"
                value={registerFirstName}
                onChange={(e) => setRegisterFirstName(e.target.value)}
                className={cn(baseStyles.input, sizeConfig.input, theme.focus)}
                required
              />
              {fieldErrors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {fieldErrors.firstName[0]}
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Last Name"
                value={registerLastName}
                onChange={(e) => setRegisterLastName(e.target.value)}
                className={cn(baseStyles.input, sizeConfig.input, theme.focus)}
                required
              />
              {fieldErrors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {fieldErrors.lastName[0]}
                </p>
              )}
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                className={cn(baseStyles.input, sizeConfig.input, theme.focus)}
                required
              />
              {fieldErrors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {fieldErrors.email[0]}
                </p>
              )}
            </div>
            <div>
              <div className="relative">
                <input
                  type={showRegisterPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  className={cn(
                    baseStyles.input,
                    sizeConfig.input,
                    theme.focus,
                    'pr-10',
                  )}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showRegisterPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {fieldErrors.password[0]}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              'mt-4 md:mt-6',
              baseStyles.primaryButton,
              sizeConfig.button,
              theme.from,
              theme.to,
              theme.fromHover,
              theme.toHover,
              'disabled:opacity-50 disabled:cursor-not-allowed',
            )}
          >
            {isLoading ? 'Creating account...' : 'SIGN UP'}
          </button>

          {/* Mobile toggle button */}
          <button
            type="button"
            onClick={() => setIsSignUp(false)}
            className="md:hidden mt-4 text-sm text-blue-600 hover:underline"
          >
            Already have an account? Sign in
          </button>
        </form>

        {/* Green Panel - Slides left/right (desktop only) */}
        <div
          className={cn(
            baseStyles.greenPanel,
            theme.from,
            theme.to,
            baseStyles.panelTransition,
            animationDuration,
            isSignUp ? baseStyles.panelLeft : baseStyles.panelRight,
          )}
        >
          {!isSignUp ? (
            <>
              <h2 className={cn(baseStyles.panelHeading, sizeConfig.heading)}>
                Hello, Friend!
              </h2>
              <p
                className={cn(
                  baseStyles.panelSubtitle,
                  theme.panelSubtitle,
                  sizeConfig.subtitle,
                )}
              >
                Enter your personal details and start your journey with us
              </p>
              <button
                onClick={() => setIsSignUp(true)}
                className={cn(
                  baseStyles.panelButton,
                  sizeConfig.button,
                  theme.hover,
                )}
              >
                SIGN UP
              </button>
            </>
          ) : (
            <>
              <h2 className={cn(baseStyles.panelHeading, sizeConfig.heading)}>
                Welcome Back!
              </h2>
              <p
                className={cn(
                  baseStyles.panelSubtitle,
                  theme.panelSubtitle,
                  sizeConfig.subtitle,
                )}
              >
                To keep connected with us please login with your personal info
              </p>
              <button
                onClick={() => setIsSignUp(false)}
                className={cn(
                  baseStyles.panelButton,
                  sizeConfig.button,
                  theme.hover,
                )}
              >
                SIGN IN
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
