import type { Product, ProductBadge, ProductCategory, ProductFlags } from '@/types/product';
interface CreateProductOptions {
    id: string;
    sku: string;
    slug: string;
    title: string;
    description?: string;
    brand: string;
    category: ProductCategory;
    image: string;
    imageAlt?: string;
    currentPrice: number;
    originalPrice?: number;
    rating: number;
    reviewCount: number;
    badge?: ProductBadge;
    stockQuantity?: number;
    inStock?: boolean;
    flags?: ProductFlags;
}
export declare function createProduct({ id, sku, slug, title, description, brand, category, image, imageAlt, currentPrice, originalPrice, rating, reviewCount, badge, stockQuantity, inStock, flags, }: CreateProductOptions): Product;
export {};
