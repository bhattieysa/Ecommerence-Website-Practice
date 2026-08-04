import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Typography } from '@/components/Typography';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { MapPin, Phone, Mail, ArrowUp, Send } from 'lucide-react';

export function ContactPage() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen flex flex-col bg-linear-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <Section spacing="none" className="relative h-80 md:h-96 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1920&q=80')",
          }}
        ></div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-blue-900/90 "></div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-400/15 rounded-full blur-2xl"></div>
        </div>

        {/* Content */}
        <Container
          size="hero"
          className="relative z-10 h-full flex items-center"
        >
          <div className="text-center w-full py-12">
            <Typography
              variant="h1"
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-lg "
            >
              Get in Touch
            </Typography>
            <Typography
              variant="bodyLg"
              className="text-blue-100 max-w-2xl mx-auto leading-relaxed"
            >
              We'd love to hear from you. Send us a message and we'll respond as
              soon as possible.
            </Typography>

            {/* Decorative Line */}
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="w-16 h-1 bg-linear-to-r from-transparent via-white/50 to-transparent"></div>
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <div className="w-16 h-1 bg-linear-to-r from-transparent via-white/50 to-transparent"></div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Contact Form and Info Section */}
      <Section spacing="large">
        <Container size="hero">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="mb-8">
                <Typography
                  variant="h2"
                  className="text-3xl font-bold text-gray-900 mb-3"
                >
                  Send us a Message
                </Typography>
                <Typography variant="body" className="text-gray-600">
                  Fill out the form below and we'll get back to you within 24
                  hours.
                </Typography>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name
                    </label>
                    <Input
                      placeholder="John"
                      className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name
                    </label>
                    <Input
                      placeholder="Doe"
                      className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject
                  </label>
                  <Input
                    placeholder="How can we help?"
                    className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Write your message here..."
                    className="w-full px-4 py-3 border  rounded-lg   resize-none transition-all duration-200"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  size="lg"
                >
                  <span className="flex items-center justify-center gap-2">
                    Send Message
                    <Send className="w-5 h-5" />
                  </span>
                </Button>
              </form>
            </div>

            {/* Right Column - Contact Info and Map */}
            <div className="space-y-8">
              <div>
                <Typography
                  variant="h2"
                  className="text-3xl font-bold text-gray-900 mb-6"
                >
                  Contact Information
                </Typography>

                {/* Contact Info Cards */}
                <div className="space-y-4">
                  {/* Phone */}
                  <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 group">
                    <div className="shrink-0 w-14 h-14 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <Phone className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <Typography
                        variant="h3"
                        className="font-bold text-gray-900 mb-1"
                      >
                        Phone
                      </Typography>
                      <Typography variant="body" className="text-gray-600">
                        +1 (555) 123-4567
                        <br />
                        +1 (555) 987-6543
                      </Typography>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 group">
                    <div className="shrink-0 w-14 h-14 bg-linear-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <Mail className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <Typography
                        variant="h3"
                        className="font-bold text-gray-900 mb-1"
                      >
                        Email
                      </Typography>
                      <Typography variant="body" className="text-gray-600">
                        support@megamart.com
                        <br />
                        info@megamart.com
                      </Typography>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 group">
                    <div className="shrink-0 w-14 h-14 bg-linear-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <MapPin className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <Typography
                        variant="h3"
                        className="font-bold text-gray-900 mb-1"
                      >
                        Address
                      </Typography>
                      <Typography variant="body" className="text-gray-600">
                        123 Shopping Street, Downtown
                        <br />
                        New York, NY 10001
                        <br />
                        United States
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158858.47340002653!2d-0.24168144655368863!3d51.5287702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2sus!4v1633024853892!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="MegaMart Location"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-14 h-14 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:scale-110 z-50"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </main>
  );
}
