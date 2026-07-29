import { Button } from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
import { InputField } from '@/components/Input/InputField';
import { Typography } from '@/components/Typography';
import { Link } from 'react-router-dom';

import {
  AuthForm,
  AuthLayout,
  AuthPanel,
  DEFAULT_SOCIAL_PROVIDERS,
  SocialLogin,
} from '@/layouts/auth';

export function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-10">
      <div className="w-full max-w-6xl">
        <AuthLayout
          panel={
            <AuthPanel
              title="Welcome Back!"
              description="To keep connected with us please login with your personal information."
              button={
                <Link to="/auth/register">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full border-white text-white hover:bg-white hover:text-primary"
                  >
                    Sign Up
                  </Button>
                </Link>
              }
            />
          }
        >
          <AuthForm
            title="Sign In"
            subtitle="Sign in to continue shopping."
            socialLogin={<SocialLogin providers={DEFAULT_SOCIAL_PROVIDERS} />}
            footer={
              <Typography
                variant="body-sm"
                className="text-center text-muted-foreground"
              >
                Don't have an account?{' '}
                <Link
                  to="/auth/register"
                  className="font-medium text-primary hover:underline"
                >
                  Sign Up
                </Link>
              </Typography>
            }
          >
            <InputField
              label="Email"
              type="email"
              placeholder="Enter your email"
            />

            <InputField
              label="Password"
              type="password"
              placeholder="Enter your password"
            />

            <div className="flex items-center justify-between">
              <Checkbox label="Remember me" />

              <button className="text-sm font-medium text-primary hover:underline">
                Forgot password?
              </button>
            </div>

            <Button size="lg" className="w-full">
              Sign In
            </Button>
          </AuthForm>
        </AuthLayout>
      </div>
    </div>
  );
}
