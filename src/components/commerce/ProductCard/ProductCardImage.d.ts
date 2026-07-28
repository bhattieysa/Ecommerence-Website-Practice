import type { ProductCardData } from './ProductCard.types';
interface ProductCardImageProps {
    product: ProductCardData;
    className?: string;
}
export declare function ProductCardImage({ product, className, }: ProductCardImageProps): import("react").JSX.Element;
export {};
