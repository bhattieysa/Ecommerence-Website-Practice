export interface BrandImage {
    src: string;
    alt: string;
}
export interface BrandData {
    id: string;
    name: string;
    logo: BrandImage;
    href: string;
    featured?: boolean;
}
export declare const BRANDS: BrandData[];
