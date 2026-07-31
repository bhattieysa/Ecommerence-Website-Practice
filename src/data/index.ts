export * from './hero.data';

export * from './categories.data';

export * from './promotions.data';

export * from './features.data';

export * from './footer.data';

export * from './product-catalog.data';

export * from './electronics.data';
export * from './fashion.data';
export * from './grocery.data';
export * from './beauty.data';
export * from './home.data';
export * from './kitchen.data';
export * from './sports.data';
export * from './accessories.data';

import type { Product } from '@/types/product';
import { electronicsProducts } from './electronics.data';
import { fashionProducts } from './fashion.data';
import { groceryProducts } from './grocery.data';
import { beautyProducts } from './beauty.data';
import { homeProducts } from './home.data';
import { kitchenProducts } from './kitchen.data';
import { sportsProducts } from './sports.data';
import { accessoriesProducts } from './accessories.data';
import { CATEGORIES } from './categories.data';
import { PROMOTIONS } from './promotions.data';
import type { CategoryData } from './categories.data';
import type { Promotion } from './promotions.data';

export const allProducts: Product[] = [
  ...electronicsProducts,
  ...fashionProducts,
  ...groceryProducts,
  ...beautyProducts,
  ...homeProducts,
  ...kitchenProducts,
  ...sportsProducts,
  ...accessoriesProducts,
];

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((product) => product.slug === slug);
}

export function getCategoryBySlug(slug: string): CategoryData | undefined {
  return CATEGORIES.find((category) => category.slug === slug);
}

export function getPromotionBySlug(slug: string): Promotion | undefined {
  return PROMOTIONS.find((promotion) => promotion.slug === slug);
}
