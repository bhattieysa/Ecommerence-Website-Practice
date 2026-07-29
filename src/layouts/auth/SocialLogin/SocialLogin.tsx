import { Button } from '@/components/Button';
import { cn } from '@/lib/utils/cn';

import { socialLoginVariants } from './SocialLogin.variants';
import type { SocialLoginProps } from './SocialLogin.types';

export function SocialLogin({
  providers,
  columns,
  className,
}: SocialLoginProps) {
  return (
    <div
      className={cn(
        socialLoginVariants({
          columns,
        }),
        className,
      )}
    >
      {providers.map((provider) => {
        const Icon = provider.icon;

        return (
          <Button
            key={provider.id}
            variant="outline"
            size="lg"
            onClick={provider.onClick}
            className="justify-start gap-3"
          >
            <Icon className="h-5 w-5" />

            <span>{provider.label}</span>
          </Button>
        );
      })}
    </div>
  );
}
