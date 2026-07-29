import type { VariantProps } from 'class-variance-authority';

import { socialLoginVariants } from './SocialLogin.variants';
import type { ComponentType } from 'react';

export interface SocialProvider {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  onClick?: () => void;
}

export interface SocialLoginProps extends VariantProps<
  typeof socialLoginVariants
> {
  providers: SocialProvider[];
  className?: string;
}
