import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Typography } from '@/components/Typography';
import { ProductCard } from '@/components/commerce/ProductCard';
import { allProducts } from '@/data';

export function ProductsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      {/* <Section spacing="large" className="bg-linear-to-r from-blue-700 ">
        <Container size="hero">
          <div className="text-center py-12">
            <Typography
              variant="h1"
              className="text-4xl md:text-5xl font-bold mb-4 text-white"
            >
              All Products
            </Typography>
            <Typography
              variant="bodyLg"
              className="text-blue-100 max-w-2xl mx-auto"
            >
              Explore our complete collection of quality products
            </Typography>
          </div>
        </Container>
      </Section> */}

      <Section spacing="large">
        <Container size="hero">
          <Typography
            variant="h1"
            className="text-3xl font-bold text-gray-900 mb-6"
          >
            All Products
          </Typography>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
