import type { VariantProps } from 'class-variance-authority';
import { authPanelVariants } from './AuthPanel.variants';

type AuthPanelVariantProps = VariantProps<typeof authPanelVariants>;

export interface AuthPanelProps extends AuthPanelVariantProps {
  title: string;
  description: string;

  logo?: React.ReactNode;
  button?: React.ReactNode;
  footer?: React.ReactNode;

  className?: string;
}
