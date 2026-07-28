import type { Product, ProductCategory } from '@/types/product';
/**
 * ============================================================================
 * Master Product Catalog
 * ============================================================================
 */
export declare const productCatalog: Product[];
/**
 * ============================================================================
 * Query Helpers
 * ============================================================================
 */
export declare function getAllProducts(): Product[];
export declare function getProductById(id: string): Product | undefined;
export declare function getProductBySlug(slug: string): Product | undefined;
export declare function getProductsByCategory(category: ProductCategory): Product[];
export declare function getProductsByFlag(flag: keyof Product['flags']): Product[];
export declare function getRelatedProducts(product: Product, limit?: number): Product[];
export declare function searchProducts(query: string): Product[];
