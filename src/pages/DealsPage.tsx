import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Typography } from '@/components/Typography';
import { PromoBanner } from '@/features/home';
import { ProductCard } from '@/components/commerce/ProductCard';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { useBanners } from '@/hooks/useBanners';
import { useAppDispatch } from '@/store/hooks';
import { addToCartBackend } from '@/store/slices/cartSlice';

export function DealsPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Fetch all active banners for promotions section
  const { data: bannersData } = useBanners();
  const banners = bannersData?.filter((b: any) => b.isActive) || [];

  // Map banners to the three types
  const bannerTypes = ['Featured', 'BestSeller', 'Premium'] as const;
  const mappedBanners = banners.slice(0, 3).map((banner: any, index: number) => ({
    ...banner,
    badgeVariant: bannerTypes[index] || 'Featured',
    variant: bannerTypes[index] || 'Featured',
  }));

  // Fetch flash sale products
  const { data: flashSaleData } = useProducts({ flashSale: 'true' });
  const flashSaleProducts = flashSaleData || [];

  // Fetch new arrival products
  const { data: newArrivalData } = useProducts({ newArrival: 'true' });
  const newArrivalProducts = newArrivalData || [];

  const handleProductClick = (product: { slug: string }) => {
    navigate(`/products/${product.slug}`);
  };

  const handleAddToCart = (product: any) => {
    dispatch(addToCartBackend(product));
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
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {mappedBanners.map((banner) => (
              <PromoBanner
                key={banner.id}
                badge={banner.badge}
                badgeVariant={banner.badgeVariant}
                title={banner.title}
                subtitle={banner.subtitle}
                description={banner.description}
                image={banner.image}
                imageAlt={banner.imageAlt}
                imagePosition={banner.imagePosition as 'left' | 'right' || 'right'}
                primaryAction={banner.badge}
                size="sm"
                variant={banner.variant}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* Flash Sale Products Section */}
      <Section spacing="large">
        <Container size="hero">
          <Typography
            variant="h2"
            className="text-2xl font-bold text-gray-900 mb-6"
          >
            Flash Sale ({flashSaleProducts.length})
          </Typography>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {flashSaleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={handleProductClick}
                onAddToCart={handleAddToCart}
                showOriginalPrice={true}
                showSavings={true}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* New Arrival Products Section */}
      <Section spacing="large">
        <Container size="hero">
          <Typography
            variant="h2"
            className="text-2xl font-bold text-gray-900 mb-6"
          >
            New Arrivals ({newArrivalProducts.length})
          </Typography>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newArrivalProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={handleProductClick}
                onAddToCart={handleAddToCart}
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
