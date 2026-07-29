import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { CategoryDropdowns } from '@/components/Dropdown';
import { PromoBanner } from '@/features/home';

import {
  BrandSection,
  CategorySection,
  FeatureSection,
  Footer,
  HeroCarousel,
  ProductSection,
} from '@/features/home';

import {
  footerColumns,
  footerContacts,
  footerCopyright,
  footerDescription,
  footerDownloadApps,
  footerLogo,
} from '@/features/home/Footer/Footer.data';

import { CATEGORIES, FEATURES, getProductsByCategory } from '@/data';

import { PROMOTIONS } from '@/data/promotions.data';

export function HomePage() {
  const smartphoneProducts = getProductsByCategory('electronics');
  const fashionItems = getProductsByCategory('fashion');
  const beautyItems = getProductsByCategory('beauty');
  const viewAllAction = (
    <Button variant="ghost" size="sm" className="text-primary font-medium">
      View All &gt;
    </Button>
  );

  return (
    <main className="pb-16">
      {/* Category Dropdowns */}
      <Section spacing="compact" className="bg-background">
        <Container size="hero">
          <div className="flex gap-3">
            <CategoryDropdowns />
          </div>
        </Container>
      </Section>

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
            products={smartphoneProducts}
            action={viewAllAction}
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
            action={viewAllAction}
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
            action={viewAllAction}
            limit={5}
            gridColumns="5"
            gridGap="lg"
          />
        </Container>
      </Section>

      {/* Promotions */}
      <Section spacing="large" className="bg-background">
        <Container size="hero">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {PROMOTIONS.map((promotion) => (
              <PromoBanner
                key={promotion.id}
                {...promotion}
                variant={promotion.variant}
                badgeVariant={promotion.badgeVariant}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* Categories */}
      <Section spacing="large" className="bg-background">
        <Container size="hero">
          <CategorySection
            title="Shop From Top Categories"
            categories={CATEGORIES}
            action={viewAllAction}
            limit={8}
            columns="eight"
            categoryCardSize="md"
          />
        </Container>
      </Section>

      {/* Features */}
      <Section spacing="large" className="bg-background">
        <Container size="hero">
          <FeatureSection
            features={FEATURES}
            columns="four"
            cardProps={{ variant: 'elevated', size: 'md' }}
          />
        </Container>
      </Section>

      {/* Footer */}
      <Footer
        logo={footerLogo}
        description={footerDescription}
        contacts={footerContacts}
        downloadApps={footerDownloadApps}
        columns={footerColumns}
        copyright={footerCopyright}
      />
    </main>
  );
}
