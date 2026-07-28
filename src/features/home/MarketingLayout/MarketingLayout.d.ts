import type { MarketingLayoutProps } from './MarketingLayout.types';
export declare function MarketingLayout({ variant, size, rounded, imagePosition, alignment, showDecoration, className, children, ...props }: MarketingLayoutProps): import("react").JSX.Element;
export declare function MarketingLayoutContent({ className, children, }: {
    className?: string;
    children: React.ReactNode;
}): import("react").JSX.Element;
export declare function MarketingLayoutHeading({ className, children, }: {
    className?: string;
    children: React.ReactNode;
}): import("react").JSX.Element;
export declare function MarketingLayoutImage({ src, alt, maxWidth, className, }: {
    src: string;
    alt?: string;
    maxWidth?: 'sm' | 'md';
    className?: string;
}): import("react").JSX.Element;
