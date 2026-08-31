import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Typography } from '@/components/Typography';
import { ProductCard } from '@/components/commerce/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store/hooks';
import { addToCartBackend } from '@/store/slices/cartSlice';
import { useCategory } from '@/hooks/useCategories';

export function ProductsPage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || undefined;
  const categoryIdParam = searchParams.get('categoryId') || undefined;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const params: any = {};
  if (searchQuery) params.search = searchQuery;
  if (categoryIdParam) params.categoryId = categoryIdParam;

  const { data: products, isLoading, error } = useProducts(Object.keys(params).length ? params : undefined);
  const { data: categoryData } = useCategory(categoryIdParam || '');
  const productsList = products || [];

  const handleProductClick = (product: { slug: string }) => {
    navigate(`/products/${product.slug}`);
  };

  const handleAddToCart = (product: any) => {
    dispatch(addToCartBackend(product));
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Section spacing="large">
        <Container size="hero">
          <Typography variant="h1" className="text-3xl font-bold text-gray-900 mb-6">
            {categoryData?.name
              ? `Products in "${categoryData.name}"`
              : searchQuery
              ? `Search Results for "${searchQuery}"`
              : 'All Products'}
          </Typography>

          {isLoading && (
            <div className="text-center py-12">
              <Typography variant="bodyLg" className="text-gray-600">
                Loading products...
              </Typography>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <Typography variant="bodyLg" className="text-red-600">
                {error}
              </Typography>
            </div>
          )}

          {!isLoading && !error && productsList.length === 0 && (
            <div className="text-center py-12">
              <Typography variant="bodyLg" className="text-gray-600">
                No products found
              </Typography>
            </div>
          )}

          {!isLoading && !error && productsList.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {productsList.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onProductClick={handleProductClick}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </Container>
      </Section>
    </main>
  );
}
