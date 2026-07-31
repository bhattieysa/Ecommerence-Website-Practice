import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';

import { getPromotionBySlug } from '@/data';

export function PromotionPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const promotion = getPromotionBySlug(slug || '');

  if (!promotion) {
    return (
      <Section spacing="large" className="p-20">
        <Container size="hero">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Promotion Not Found</h1>
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
        <div className="relative rounded-xl overflow-hidden">
          <img
            src={promotion.image}
            alt={promotion.title}
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white p-8">
              {promotion.badge && (
                <span className="inline-block bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  {promotion.badge}
                </span>
              )}
              <h1 className="text-4xl font-bold mb-2">{promotion.title}</h1>
              {promotion.subtitle && (
                <h2 className="text-2xl mb-4">{promotion.subtitle}</h2>
              )}
              <p className="text-lg mb-6 max-w-2xl mx-auto">
                {promotion.description}
              </p>
              <Button
                size="lg"
                onClick={() => navigate(promotion.href)}
                className="bg-white text-black hover:bg-gray-100"
              >
                {promotion.buttonText}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
