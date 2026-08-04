import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Typography } from '@/components/Typography';
import { CATEGORIES } from '@/data';
import { Link } from 'react-router-dom';

export function CategoriesPage() {
  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      {/* <Section spacing="large" className="bg-linear-to-r from-blue-700">
        <Container size="hero">
          <div className="text-center py-12">
            <Typography
              variant="h1"
              className="text-4xl md:text-5xl font-bold mb-4 text-white"
            >
              All Categories
            </Typography>
            <Typography
              variant="bodyLg"
              className="text-blue-100 max-w-2xl mx-auto"
            >
              Browse products by category
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
            All Categories
          </Typography>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((category) => (
              <Link
                key={category.id}
                to={`/categories/${category.slug}`}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden border border-gray-100 group-hover:border-blue-200">
                  <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                    {category.image && (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <Typography
                      variant="h3"
                      className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors"
                    >
                      {category.name}
                    </Typography>
                    <Typography variant="bodySm" className="text-gray-600">
                      {category.productCount || 0} products
                    </Typography>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
