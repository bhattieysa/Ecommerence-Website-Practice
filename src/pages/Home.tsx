import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { FEATURES } from '@/features/home/FeatureSection/FeatureCard';
import { CategorySection, HeroCarousel, ProductSection, FeatureSection, PromoBanner } from '@/features/home';

import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import { useBanners } from '@/hooks/useBanners';
import type { Product } from '@/types/product';
import { Link } from 'react-router-dom';

export function HomePage() {
  const { data: categoriesData } = useCategories();
  const categories = categoriesData || [];

  const { data: bannersData } = useBanners();
  const banners = bannersData?.filter((b: any) => b.isActive) || [];

  // Map backend banners to three types based on position
  const bannerTypes = ['Featured', 'BestSeller', 'Premium'] as const;
  const mappedBanners = banners.slice(0, 3).map((banner: any, index: number) => ({
    ...banner,
    badgeVariant: bannerTypes[index] || 'Featured',
    variant: bannerTypes[index] || 'Featured',
  }));

  // Get products for each category dynamically
  const electronicsCategory = categories.find(c => c.slug === 'electronics');
  const fashionCategory = categories.find(c => c.slug === 'fashion');
  const beautyCategory = categories.find(c => c.slug === 'beauty');

  // Only fetch products when categories are loaded
  const { data: electronicsData } = useProducts(
    electronicsCategory?.id ? { categoryId: electronicsCategory.id, limit: 5 } : undefined
  );
  const { data: fashionData } = useProducts(
    fashionCategory?.id ? { categoryId: fashionCategory.id, limit: 5 } : undefined
  );
  const { data: beautyData } = useProducts(
    beautyCategory?.id ? { categoryId: beautyCategory.id, limit: 5 } : undefined
  );

  const electronicProducts: Product[] = electronicsData || [];
  const fashionItems: Product[] = fashionData || [];
  const beautyItems: Product[] = beautyData || [];

  const viewAllAction = (to: string) => (
    <Link to={to} className="inline-block">
      <Button variant="ghost" size="sm" className="text-primary font-medium">
        View All &gt;
      </Button>
    </Link>
  );

  return (
    <main className="min-h-screen flex flex-col">
      <div className="grow">
        {/* Hero */}
        <Section spacing="hero" className="pt-6 bg-background">
          <Container size="hero">
            <HeroCarousel />
          </Container>
        </Section>

        {/* Smartphones */}
        <Section spacing="large" className="bg-muted/20">
          <Container size="hero">
            <ProductSection
              title="Grab the best deal on Electronics"
              products={electronicProducts}
              action={viewAllAction(electronicsCategory ? `/products?categoryId=${electronicsCategory.id}` : '/products')}
              limit={5}
              gridColumns="5"
              gridGap="lg"
            />
          </Container>
        </Section>

        {/* Fashion */}
        <Section spacing="large" className="bg-muted/20">
          <Container size="hero">
            <ProductSection
              title="Trending Fashion"
              products={fashionItems}
              action={viewAllAction(fashionCategory ? `/products?categoryId=${fashionCategory.id}` : '/products')}
              limit={5}
              gridColumns="5"
              gridGap="lg"
            />
          </Container>
        </Section>

        {/* Beauty */}
        <Section spacing="large" className="bg-muted/20">
          <Container size="hero">
            <ProductSection
              title="Trending Beauty"
              products={beautyItems}
              action={viewAllAction(beautyCategory ? `/products?categoryId=${beautyCategory.id}` : '/products')}
              limit={5}
              gridColumns="5"
              gridGap="lg"
            />
          </Container>
        </Section>

        {/* Promotions */}
        {mappedBanners.length > 0 && (
          <Section spacing="large" className="bg-background">
            <Container size="hero">
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
        )}

        {/* Categories */}
        <Section spacing="large" className="bg-background">
          <Container size="hero">
            <CategorySection
              title="Shop From Top Categories"
              categories={categories || []}
              action={viewAllAction('/categories')}
              limit={6}
              columns="six"
              categoryCardSize="lg"
            />
          </Container>
        </Section>

        {/* Features */}
        <Section spacing="large" className="bg-background">
          <Container size="hero">
            <FeatureSection
              columns="four"
              cardProps={{ variant: 'elevated', size: 'md' }}
              features={FEATURES}
            />
          </Container>
        </Section>
      </div>
    </main>
  );
}
