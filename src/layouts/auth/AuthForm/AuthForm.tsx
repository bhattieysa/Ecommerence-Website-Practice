import { Typography } from '@/components/Typography';
import { cn } from '@/lib/utils/cn';

import { AuthDivider } from '../AuthDivider';

import { authFormVariants } from './AuthForm.variants';
import type { AuthFormProps } from './AuthForm.types';

export function AuthForm({
  title,
  subtitle,
  socialLogin,
  children,
  footer,
  spacing,
  className,
}: AuthFormProps) {
  return (
    <div
      className={cn(
        authFormVariants({
          spacing,
        }),
        className,
      )}
    >
      {/* Header */}

      <div className="space-y-2">
        <Typography variant="h2">{title}</Typography>

        {subtitle && (
          <Typography variant="body-md" className="text-muted-foreground">
            {subtitle}
          </Typography>
        )}
      </div>

      {/* Social Login */}

      {socialLogin && (
        <>
          {socialLogin}
          <AuthDivider />
        </>
      )}

      {/* Fields */}

      <div className="space-y-4">{children}</div>

      {/* Footer */}

      {footer}
    </div>
  );
}
