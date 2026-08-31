import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Typography } from '@/components/Typography';
import { Target, Users, Award, ShoppingBag } from 'lucide-react';

export function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .animate-fade-in {
          animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .animate-fade-in-slow {
          animation: fadeIn 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .animate-slide-in-left {
          animation: slideInLeft 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
      `}</style>
      {/* Hero Section */}
      <Section spacing="large" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&h=1080&fit=crop')] bg-cover bg-top animate-fade-in-slow"></div>
        <div className="absolute inset-0 bg-linear-to-r from-blue-300/90"></div>
        <Container size="hero" className="relative">
          <div className="text-center py-20 md:py-32 animate-fade-in-up">
            <Typography
              variant="h1"
              className="text-4xl md:text-6xl font-bold mb-6 text-white"
            >
              About MegaMart
            </Typography>
            <Typography
              variant="bodyLg"
              className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
            >
              Your one-stop destination for quality products at unbeatable prices
            </Typography>
          </div>
        </Container>
      </Section>

      {/* Mission Section */}
      <Section spacing="large">
        <Container size="hero">
          <div className="text-center mb-12 animate-fade-in-up">
            <Typography
              variant="h2"
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              Our Mission
            </Typography>
            <Typography
              variant="bodyLg"
              className="text-gray-600 leading-relaxed"
            >
              At MegaMart, we believe everyone deserves access to high-quality
              products at fair and affordable prices. Our mission is to make
              online shopping simple, reliable, and enjoyable by offering an
              extensive se lection of carefully curated products across multiple
              categories. We are committed to delivering exceptional value
              through competitive pricing, secure shopping, fast shipping, and
              outstanding customer support. Every product we offer is selected
              with quality and customer satisfaction in mind, ensuring you
              receive the best shopping experience from browsing to delivery. As
              we continue to grow, our focus remains on innovation, trust, and
              building lasting relationships with our customers by consistently
              exceeding expectations and making everyday shopping more
              convenient than ever.
            </Typography>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6 text-center border border-gray-100 hover:shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 animate-fade-in-up delay-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <Typography variant="h3" className="font-bold text-gray-900 mb-2">
                Quality First
              </Typography>
              <Typography variant="bodySm" className="text-gray-600">
                We only offer products that meet our strict quality standards
              </Typography>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 text-center border border-gray-100 hover:shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 animate-fade-in-up delay-200">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <Typography variant="h3" className="font-bold text-gray-900 mb-2">
                Customer Focus
              </Typography>
              <Typography variant="bodySm" className="text-gray-600">
                Your satisfaction is our top priority
              </Typography>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 text-center border border-gray-100 hover:shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 animate-fade-in-up delay-300">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <Typography variant="h3" className="font-bold text-gray-900 mb-2">
                Best Prices
              </Typography>
              <Typography variant="bodySm" className="text-gray-600">
                Competitive pricing without compromising quality
              </Typography>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 text-center border border-gray-100 hover:shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 animate-fade-in-up delay-400">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-orange-600" />
              </div>
              <Typography variant="h3" className="font-bold text-gray-900 mb-2">
                Wide Selection
              </Typography>
              <Typography variant="bodySm" className="text-gray-600">
                Thousands of products across multiple categories
              </Typography>
            </div>
          </div>
        </Container>
      </Section>

      {/* Story Section */}
      <Section
        spacing="large"
        className="bg-linear-to-br from-gray-50 to-blue-50"
      >
        <Container size="hero">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 animate-slide-in-left">
            <Typography
              variant="h2"
              className="text-3xl font-bold text-gray-900 mb-8 text-center"
            >
              Our Story
            </Typography>
            <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
              <Typography
                variant="bodyLg"
                className="leading-relaxed animate-fade-in delay-200"
              >
                Founded with a vision to revolutionize online shopping, MegaMart
                has grown from a small startup to a trusted e-commerce
                destination. Our journey began with a simple idea: make quality
                products accessible to everyone.
              </Typography>
              <Typography
                variant="bodyLg"
                className="leading-relaxed animate-fade-in delay-300"
              >
                Over the years, we've expanded our product range, improved our
                services, and built lasting relationships with millions of
                satisfied customers. Our team of dedicated professionals works
                tirelessly to ensure that every shopping experience is seamless
                and enjoyable.
              </Typography>
              <Typography
                variant="bodyLg"
                className="leading-relaxed animate-fade-in delay-400"
              >
                Today, MegaMart stands as a testament to what can be achieved
                when you put customers first. We continue to innovate, adapt,
                and grow, always staying true to our core values of quality,
                integrity, and exceptional service.
              </Typography>
            </div>
          </div>
        </Container>
      </Section>

      {/* Stats Section */}
      <Section spacing="large">
        <Container size="hero">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-full w-40 h-40 md:w-48 md:h-48 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-110 mx-auto animate-scale-in delay-100">
              <Typography
                variant="h1"
                className="text-3xl md:text-4xl font-bold text-white mb-1"
              >
                10M+
              </Typography>
              <Typography variant="bodySm" className="text-blue-100">
                Happy Customers
              </Typography>
            </div>
            <div className="bg-linear-to-br from-green-500 to-green-600 rounded-full w-40 h-40 md:w-48 md:h-48 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-110 mx-auto animate-scale-in delay-200">
              <Typography
                variant="h1"
                className="text-3xl md:text-4xl font-bold text-white mb-1"
              >
                50K+
              </Typography>
              <Typography variant="bodySm" className="text-green-100">
                Products
              </Typography>
            </div>
            <div className="bg-linear-to-br from-purple-500 to-purple-600 rounded-full w-40 h-40 md:w-48 md:h-48 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-110 mx-auto animate-scale-in delay-300">
              <Typography
                variant="h1"
                className="text-3xl md:text-4xl font-bold text-white mb-1"
              >
                100+
              </Typography>
              <Typography variant="bodySm" className="text-purple-100">
                Categories
              </Typography>
            </div>
            <div className="bg-linear-to-br from-orange-500 to-orange-600 rounded-full w-40 h-40 md:w-48 md:h-48 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-110 mx-auto animate-scale-in delay-400">
              <Typography
                variant="h1"
                className="text-3xl md:text-4xl font-bold text-white mb-1"
              >
                24/7
              </Typography>
              <Typography variant="bodySm" className="text-orange-100">
                Support
              </Typography>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
