import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Typography } from '@/components/Typography';
import { PromoBanner } from '@/features/home';
import { ProductCard } from '@/components/commerce/ProductCard';
import { PROMOTIONS, allProducts } from '@/data';
import { Link, useNavigate } from 'react-router-dom';

export function DealsPage() {
  const navigate = useNavigate();

  // Filter products that have discounts (original price exists and is higher than current)
  const discountedProducts = allProducts.filter(
    (product) =>
      product.price.original && product.price.original > product.price.current,
  );

  const handleProductClick = (product: { slug: string }) => {
    navigate(`/product/${product.slug}`);
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      {/* Promotions Section */}
      <Section spacing="large">
        <Container size="hero">
          <Typography
            variant="h1"
            className="text-3xl font-bold text-gray-900 mb-20"
          >
            Hot Deals & Promotions
          </Typography>
          <Typography
            variant="h2"
            className="text-2xl font-bold text-gray-900 mb-6"
          >
            Special Promotions
          </Typography>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
            {PROMOTIONS.map((promotion) => (
              <Link key={promotion.id} to={promotion.href}>
                <PromoBanner
                  {...promotion}
                  variant={promotion.variant}
                  badgeVariant={promotion.badgeVariant}
                  primaryAction={promotion.buttonText}
                />
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Discounted Products Section */}
      <Section spacing="large">
        <Container size="hero">
          <Typography
            variant="h2"
            className="text-2xl font-bold text-gray-900 mb-6"
          >
            Discounted Products ({discountedProducts.length})
          </Typography>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {discountedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={handleProductClick}
                showOriginalPrice={true}
                showSavings={true}
              />
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
