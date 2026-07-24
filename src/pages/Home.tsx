import { AppNavbar } from '@/layouts/Navbar/AppNavbar';
import { HeroCarousel } from '@/features/home/Hero/HeroCarousel';
import { ProductGrid } from '@/components/commerce/ProductGrid/ProductGrid';
import { products } from '@/data/products';

import { Section } from '@/components/Section';
import { Container } from '@/components/Container';

export function HomePage() {
  return (
    <>
      <AppNavbar />
      <Section spacing="hero">
        <Container size="full">
          <HeroCarousel />
        </Container>
      </Section>
      <main className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="mb-8 text-4xl font-bold">Product Grid Demo</h1>
        <ProductGrid
          products={products}
          columns="4"
          actions={{
            onProductClick: (product) =>
              console.log('Product clicked:', product),
            onAddToCart: (product) => console.log('Added to cart:', product),
          }}
        />
      </main>
    </>
  );
}

export default HomePage;
