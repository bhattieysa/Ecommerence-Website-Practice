import type { HTMLAttributes, ReactNode } from 'react';
export interface NewsletterProps extends Omit<HTMLAttributes<HTMLElement>, 'title' | 'onSubmit'> {
    title: ReactNode;
    description?: ReactNode;
    placeholder?: string;
    buttonLabel?: string;
    image?: string;
    imageAlt?: string;
    imagePosition?: 'left' | 'right';
    layout?: 'horizontal' | 'vertical';
    alignment?: 'left' | 'center';
    variant?: 'default' | 'gradient' | 'dark';
    size?: 'sm' | 'md' | 'lg';
    rounded?: 'none' | 'md' | 'lg' | 'xl';
    loading?: boolean;
    error?: ReactNode;
    success?: ReactNode;
    onSubmit?: (email: string, event: React.FormEvent<HTMLFormElement>) => void;
    className?: string;
}
