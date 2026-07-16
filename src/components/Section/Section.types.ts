import type { HtmlHTMLAttributes } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';

import { sectionVariants } from '@/components/Section/SectionVariants';

export interface SectionProps
  extends
    HtmlHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sectionVariants> {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
}
