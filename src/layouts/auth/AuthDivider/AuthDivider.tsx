import { Typography } from '@/components/Typography';
import { cn } from '@/lib/utils/cn';

import { authDividerVariants } from './AuthDivider.variants';
import type { AuthDividerProps } from './AuthDivider.types';

export function AuthDivider({
  label = 'OR',
  spacing,
  className,
}: AuthDividerProps) {
  return (
    <div
      className={cn(
        authDividerVariants({
          spacing,
        }),
        className,
      )}
    >
      <div className="h-px flex-1 bg-border" />

      <Typography
        variant="body-sm"
        className="mx-4 whitespace-nowrap text-muted-foreground uppercase tracking-wide"
      >
        {label}
      </Typography>

      <div className="h-px flex-1 bg-border" />
    </div>
  );
}
