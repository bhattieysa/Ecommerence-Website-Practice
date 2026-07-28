import type { ProductCardData } from '@/components/commerce/ProductCard/ProductCard.types';
interface ProductCardFooterProps {
    product: ProductCardData;
    onAddToCart?: (product: ProductCardData) => void;
    className?: string;
}
export declare function ProductCardFooter({ product, onAddToCart, className, }: ProductCardFooterProps): import("react").JSX.Element;
export {};
