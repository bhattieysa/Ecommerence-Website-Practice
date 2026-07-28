import type { ProductCardData } from '@/components/commerce/ProductCard/ProductCard.types';
interface ProductCardContentProps {
    product: ProductCardData;
    showCategory?: boolean;
    showRating?: boolean;
    showOriginalPrice?: boolean;
    className?: string;
}
export declare function ProductCardContent({ product, showCategory, showRating, showOriginalPrice, className, }: ProductCardContentProps): import("react").JSX.Element;
export {};
