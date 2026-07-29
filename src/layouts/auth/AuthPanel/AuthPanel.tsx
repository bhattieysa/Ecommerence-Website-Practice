import { Typography } from '@/components/Typography';
import { cn } from '@/lib/utils/cn';

import { AuthPanelBackground } from './AuthPanel.utils';
import { authPanelVariants } from './AuthPanel.variants';
import type { AuthPanelProps } from './AuthPanel.types';

export function AuthPanel({
  title,
  description,
  logo,
  button,
  footer,
  theme = 'primary',
  align = 'center',
  className,
}: AuthPanelProps) {
  return (
    <aside
      className={cn(
        authPanelVariants({
          theme,
          align,
        }),
        className,
      )}
    >
      {/* Background Decorations */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <AuthPanelBackground />
      </div>

      {/* Logo */}

      {logo && <div className="absolute left-8 top-8 z-10">{logo}</div>}

      {/* Content */}

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-6">
        <Typography variant="h2" className="text-white">
          {title}
        </Typography>

        <Typography variant="body-lg" className="max-w-sm text-white/90">
          {description}
        </Typography>

        {button}
      </div>

      {/* Footer */}

      {footer && <div className="relative z-10 mt-auto">{footer}</div>}
    </aside>
  );
}
