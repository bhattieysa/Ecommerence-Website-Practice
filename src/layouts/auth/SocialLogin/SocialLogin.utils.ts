import { GoogleIcon } from '@/assets/icons/GoogleIcon';
import { FacebookIcon } from '@/assets/icons/FacebookIcon';
import { GitHubIcon } from '@/assets/icons/GitHubIcon';

import type { SocialProvider } from './SocialLogin.types';

export const DEFAULT_SOCIAL_PROVIDERS: SocialProvider[] = [
  {
    id: 'google',
    label: 'Continue with Google',
    icon: GoogleIcon,
  },
  {
    id: 'facebook',
    label: 'Continue with Facebook',
    icon: FacebookIcon,
  },
  {
    id: 'github',
    label: 'Continue with GitHub',
    icon: GitHubIcon,
  },
];
