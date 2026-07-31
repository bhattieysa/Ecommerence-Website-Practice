import { useState } from 'react';
import { cn } from '@/lib/utils/cn';

import { FacebookIcon } from '@/assets/icons/FacebookIcon';
import { GoogleIcon } from '@/assets/icons/GoogleIcon';
import { LinkedinIcon } from '@/assets/icons/LinkedinIcon';

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

  const theme = colorThemes[colorTheme];
  const sizeConfig = sizes[size];
  const animationDuration = animations[animation];

  return (
    <div className={cn(baseStyles.container, sizeConfig.container, className)}>
      <div className="relative h-full w-full flex flex-col md:flex-row">
        {/* Login Form */}
        <div
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
            Sign in
          </h2>
          <p className={cn(baseStyles.subtitle, sizeConfig.subtitle)}>
            Use your email account
          </p>

          {/* Social Icons */}
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

          <p className={baseStyles.divider}>or use your email</p>

          {/* Form Fields */}
          <div className="w-full max-w-xs md:max-w-sm space-y-3 md:space-y-4">
            <input
              type="email"
              placeholder="Email"
              className={cn(baseStyles.input, sizeConfig.input, theme.focus)}
            />
            <input
              type="password"
              placeholder="Password"
              className={cn(baseStyles.input, sizeConfig.input, theme.focus)}
            />
          </div>

          <p
            className={cn(
              baseStyles.divider,
              'mb-4 md:mb-6 mt-3 md:mt-4 cursor-pointer',
              theme.hover,
            )}
          >
            Forgot your password?
          </p>

          <button
            className={cn(
              baseStyles.primaryButton,
              sizeConfig.button,
              theme.from,
              theme.to,
              theme.fromHover,
              theme.toHover,
            )}
          >
            SIGN IN
          </button>

          {/* Mobile toggle button */}
          <button
            onClick={() => setIsSignUp(true)}
            className="md:hidden mt-4 text-sm text-blue-600 hover:underline"
          >
            Don't have an account? Sign up
          </button>
        </div>

        {/* Register Form */}
        <div
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

          <p className={baseStyles.divider}>
            or use your email for registration
          </p>

          {/* Form Fields */}
          <div className="w-full max-w-xs md:max-w-sm space-y-3 md:space-y-4">
            <input
              type="text"
              placeholder="Name"
              className={cn(baseStyles.input, sizeConfig.input, theme.focus)}
            />
            <input
              type="email"
              placeholder="Email"
              className={cn(baseStyles.input, sizeConfig.input, theme.focus)}
            />
            <input
              type="password"
              placeholder="Password"
              className={cn(baseStyles.input, sizeConfig.input, theme.focus)}
            />
          </div>

          <button
            className={cn(
              'mt-4 md:mt-6',
              baseStyles.primaryButton,
              sizeConfig.button,
              theme.from,
              theme.to,
              theme.fromHover,
              theme.toHover,
            )}
          >
            SIGN UP
          </button>

          {/* Mobile toggle button */}
          <button
            onClick={() => setIsSignUp(false)}
            className="md:hidden mt-4 text-sm text-blue-600 hover:underline"
          >
            Already have an account? Sign in
          </button>
        </div>

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
