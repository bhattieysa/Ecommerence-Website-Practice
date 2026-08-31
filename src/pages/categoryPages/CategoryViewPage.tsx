import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Typography } from '@/components/Typography';
import { ProductGrid } from '@/components/commerce/ProductGrid/ProductGrid';

import { useCategories } from '@/hooks/useCategories';
import { useProducts } from '@/hooks/useProducts';
import { useAppDispatch } from '@/store/hooks';
import { addToCartBackend } from '@/store/slices/cartSlice';

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const category = categories?.find((c) => c.slug === slug);

  // Get category ID from the found category to filter products
  const categoryId = category ? category.id : undefined;
  const { data: products, isLoading: productsLoading } = useProducts({
    categoryId,
    limit: 50,
  });

  const handleProductClick = (product: { slug: string }) => {
    navigate(`/products/${product.slug}`);
  };

  const handleAddToCart = (product: any) => {
    dispatch(addToCartBackend(product));
  };

  if (categoriesLoading) {
    return (
      <Section spacing="large" className="p-20">
        <Container size="hero">
          <div className="text-center">
            <Typography variant="bodyLg" className="text-gray-600">
              Loading category...
            </Typography>
          </div>
        </Container>
      </Section>
    );
  }

  if (!category) {
    return (
      <Section spacing="large" className="p-20">
        <Container size="hero">
          <div className="text-center">
            <Typography variant="h2" className="text-2xl font-bold mb-4">
              Category Not Found
            </Typography>
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
        <ProductGrid
          products={products || []}
          columns="4"
          gap="lg"
          actions={{ onProductClick: handleProductClick, onAddToCart: handleAddToCart }}
        />

        {productsLoading && (
          <div className="text-center py-12">
            <Typography variant="bodyLg" className="text-gray-600">
              Loading products...
            </Typography>
          </div>
        )}

        {!productsLoading && !products?.length && (
          <div className="text-center py-12">
            <Typography variant="bodyLg" className="text-gray-600">
              No products found in this category.
            </Typography>
          </div>
        )}
      </Container>
    </Section>
  );
}
