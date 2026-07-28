import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { PromoBanner } from '@/features/home';

import {
  BrandSection,
  CategorySection,
  Footer,
  HeroCarousel,
  ProductSection,
} from '@/features/home';

import {
  BRANDS,
  CATEGORIES,
  FOOTER_CONTACT,
  FOOTER_COPYRIGHT,
  FOOTER_DOWNLOAD_APPS,
  FOOTER_LOGO,
  FOOTER_SECTIONS,
  FOOTER_SOCIALS,
  getProductsByCategory,
} from '@/data';

import { PROMOTIONS } from '@/data/promotions.data';

const compactProductCardProps = {
  size: 'compact' as const,
  radius: 'lg' as const,
  showCategory: false,
  showRating: false,
  showAddToCart: false,
  showSavings: true,
};

export function HomePage() {
  const smartphoneProducts = getProductsByCategory('electronics');
  const dailyEssentials = getProductsByCategory('grocery');
  const electronicsBrands = BRANDS.filter((brand) => brand.featured);

  const viewAllAction = (
    <Button variant="ghost" size="sm" className="text-primary font-medium">
      View All &gt;
    </Button>
  );

  return (
    <main className="pb-16">
      {/* Hero */}
      <Section spacing="hero" className="pt-6 bg-background">
        <Container size="hero">
          <HeroCarousel />
        </Container>
      </Section>

      {/* Promotions */}
      <Section spacing="large" className="bg-background">
        <Container size="hero">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PROMOTIONS.map((promotion) => (
              <PromoBanner key={promotion.id} {...promotion} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Smartphones */}
      {/* <Section spacing="large" className="bg-muted/20"> */}
      <Container size="hero">
        <ProductSection
          title="Grab the best deal on Electronics"
          products={smartphoneProducts}
          action={viewAllAction}
          limit={5}
          gridColumns="2"
          gridGap="lg"
          cardProps={compactProductCardProps}
        />
      </Container>
      {/* </Section> */}
    </main>
  );
}
