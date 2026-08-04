import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Typography } from '@/components/Typography';
import { Button } from '@/components/Button';
import { Heart } from 'lucide-react';

export function WishlistPage() {
  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Section */}
      {/* <Section spacing="large" className="bg-linear-to-r from-pink-500 ">
        <Container size="hero">
          <div className="text-center py-12">
            <Typography
              variant="h1"
              className="text-4xl md:text-5xl font-bold mb-4 text-white"
            >
              My Wishlist
            </Typography>
            <Typography
              variant="bodyLg"
              className="text-pink-100 max-w-2xl mx-auto"
            >
              Save your favorite items for later
            </Typography>
          </div>
        </Container>
      </Section> */}

      {/* Wishlist Content */}
      <Section spacing="large">
        <Container size="hero">
          <Typography
            variant="h1"
            className="text-3xl font-bold text-gray-900 mb-6"
          >
            My Wishlist
          </Typography>
          <div className="bg-white rounded-xl shadow-md p-12 text-center border border-gray-100">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center">
                <Heart className="w-12 h-12 text-pink-500" />
              </div>
            </div>
            <Typography
              variant="h2"
              className="text-2xl font-bold text-gray-900 mb-3"
            >
              Your wishlist is empty
            </Typography>
            <Typography variant="body" className="text-gray-600 mb-6">
              Start adding items to your wishlist by clicking the heart icon on
              any product.
            </Typography>
            <Button variant="primary" size="lg">
              Browse Products
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}
