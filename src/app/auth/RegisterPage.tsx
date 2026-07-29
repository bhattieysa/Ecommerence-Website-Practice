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

export function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-10">
      <div className="w-full max-w-6xl">
        <AuthLayout
          panel={
            <AuthPanel
              title="Hello, Friend!"
              description="Create your account and start shopping with thousands of amazing products."
              button={
                <Link to="/auth/login">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full border-white text-white hover:bg-white hover:text-primary"
                  >
                    Sign In
                  </Button>
                </Link>
              }
            />
          }
        >
          <AuthForm
            title="Create Account"
            subtitle="Join our marketplace today."
            socialLogin={<SocialLogin providers={DEFAULT_SOCIAL_PROVIDERS} />}
            footer={
              <Typography
                variant="body-sm"
                className="text-center text-muted-foreground"
              >
                Already have an account?{' '}
                <Link
                  to="/auth/login"
                  className="font-medium text-primary hover:underline"
                >
                  Sign In
                </Link>
              </Typography>
            }
          >
            <InputField label="Full Name" placeholder="John Doe" />

            <InputField
              label="Email"
              type="email"
              placeholder="john@example.com"
            />

            <InputField
              label="Password"
              type="password"
              placeholder="Enter password"
            />

            <InputField
              label="Confirm Password"
              type="password"
              placeholder="Confirm password"
            />

            <Checkbox label="I agree to the Terms & Conditions" />

            <Button size="lg" className="w-full">
              Create Account
            </Button>
          </AuthForm>
        </AuthLayout>
      </div>
    </div>
  );
}
