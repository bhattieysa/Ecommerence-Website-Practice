export interface Promotion {
    id: string;
    title: string;
    subtitle?: string;
    description: string;
    image: string;
    badge?: string;
    buttonText: string;
    href: string;
    background: string;
}
export declare const PROMOTIONS: Promotion[];
