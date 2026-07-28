import type { Product, ProductCategory } from '@/types/product';

import { accessoriesProducts } from './accessories.data';
import { beautyProducts } from './beauty.data';
import { booksProducts } from './books.data';
import { electronicsProducts } from './electronics.data';
import { fashionProducts } from './fashion.data';
import { gamingProducts } from './gaming.data';
import { groceryProducts } from './grocery.data';
import { homeProducts } from './home.data';
import { kitchenProducts } from './kitchen.data';
import { sportsProducts } from './sports.data';

/**
 * ============================================================================
 * Master Product Catalog
 * ============================================================================
 */

export const productCatalog: Product[] = [
  ...electronicsProducts,
  ...fashionProducts,
  ...groceryProducts,
  ...beautyProducts,
  ...homeProducts,
  ...kitchenProducts,
  ...sportsProducts,
  ...gamingProducts,
  ...accessoriesProducts,
  ...booksProducts,
];

/**
 * ============================================================================
 * Query Helpers
 * ============================================================================
 */

export function getAllProducts(): Product[] {
  return productCatalog;
}

export function getProductById(id: string): Product | undefined {
  return productCatalog.find((product) => product.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return productCatalog.find((product) => product.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return productCatalog.filter((product) => product.category === category);
}

export function getProductsByFlag(flag: keyof Product['flags']): Product[] {
  return productCatalog.filter((product) => product.flags[flag]);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return productCatalog
    .filter(
      ({ id, category }) => id !== product.id && category === product.category,
    )
    .slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return productCatalog;
  }

  return productCatalog.filter(
    ({ title, brand, category }) =>
      title.toLowerCase().includes(normalizedQuery) ||
      brand.toLowerCase().includes(normalizedQuery) ||
      category.toLowerCase().includes(normalizedQuery),
  );
}
