import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { HeroVariants } from './HeroVariants';
export interface HeroProps extends Omit<ComponentPropsWithoutRef<'section'>, 'title'>, VariantProps<typeof HeroVariants> {
    id: string;
    badge?: ReactNode;
    title: ReactNode;
    subtitle?: ReactNode;
    description?: ReactNode;
    image: string;
    imageAlt: string;
}
