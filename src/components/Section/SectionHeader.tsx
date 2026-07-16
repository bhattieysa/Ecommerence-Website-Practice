import type { ReactNode } from 'react';
import { Typography } from '@/components/Typography/Typography';

interface SectionHeaderProps {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
}

export function SectionHeader({ title, subtitle, action }: SectionHeaderProps) {
  if (!title && !subtitle && !action) return null;
  return (
    <Typography as="header" variant="h1">
      {title && (
        <Typography as="h2" variant="h2">
          {title}
        </Typography>
      )}

      {subtitle && (
        <Typography as="p" variant="bodySm" color="muted">
          {subtitle}
        </Typography>
      )}

      {action && (
        <Typography variant="overline" color="muted">
          {action}
        </Typography>
      )}
    </Typography>
  );
}
