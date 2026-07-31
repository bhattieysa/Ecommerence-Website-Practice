import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { ProductGrid } from '@/components/commerce/ProductGrid/ProductGrid';

import { getCategoryBySlug, getProductsByCategory } from '@/data';

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const category = getCategoryBySlug(slug || '');
  const products = category ? getProductsByCategory(category.id as any) : [];

  const handleProductClick = (product: { slug: string }) => {
    navigate(`/products/${product.slug}`);
  };

  if (!category) {
    return (
      <Section spacing="large" className="p-20">
        <Container size="hero">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
            <button
              onClick={() => navigate('/')}
              className="text-primary hover:underline"
            >
              Return to Home
            </button>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section spacing="large" className="p-20">
      <Container size="hero">
        {/* <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
          <p className="text-muted-foreground">{category.description}</p>
          <p className="text-sm text-muted-foreground mt-2">
            {products.length} products
          </p>
        </div> */}

        <ProductGrid
          products={products}
          columns="4"
          gap="lg"
          actions={{ onProductClick: handleProductClick }}
        />

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No products found in this category.
            </p>
          </div>
        )}
      </Container>
    </Section>
  );
}
