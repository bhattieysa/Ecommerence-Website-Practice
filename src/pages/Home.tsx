import { useState } from 'react';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Typography } from '@/components/Typography/Typography';
import { InputGroup } from '@/components/Input/InputGroup';
import { Search } from 'lucide-react';
import { Input } from '@/components/Input/Input';
import { Eye, Check } from 'lucide-react';
import { Badge } from '@/components/badge/Badge';
import { Link, ShoppingCart } from 'lucide-react';
import { IconButton } from '@/components/IconButton';
import { Price } from '@/components/commerce/Price';
import { Rating } from '@/components/commerce/Rating';
import { ProductImage } from '@/components/commerce/ProductImage/ProductImage';
import { QuantitySelector } from '@/components/commerce/QuantitySelector/QuantitySelector';
import { ProductCard } from '@/components/commerce/ProductCard';
import type { ProductCardData } from '@/components/commerce/ProductCard';
import { products } from '@/data/products';
export function HomePage() {
  const [quantity, setQuantity] = useState(1);

  return (
    // <div className="flex flex-wrap gap-4 p-8">
    //   <Button>Primary</Button>

    //   <Button variant="secondary">Secondary</Button>

    //   <Button variant="outline">Outline</Button>

    //   <Button variant="ghost">Ghost</Button>

    //   <Button variant="destructive">Delete</Button>

    //   <Button isLoading>Loading</Button>

    //   <Button size="lg">Large Button</Button>

    //   <Button fullWidth>Full Width</Button>
    // </div>

    // <Container size="sm" padding="sm">
    //   Welcome to MegaMart{' '}
    // </Container>

    // <Section
    //   title="Grab the best deal on Smartphones"
    //   action={<Button variant="ghost">View All</Button>}
    // >
    //   <Container size="sm" padding="sm">
    //     Welcome to MegaMart{' '}
    //   </Container>
    // </Section>

    // <Typography as="h1" variant="h1">
    //   Grab the best deal on Smartphones
    // </Typography>
    // <Typography as="h2" variant="h2">
    //   Grab the best deal on Smartphones
    // </Typography>

    // <InputGroup className="mt-5">
    //   <Search className="absolute left-3 h-4 w-4 " />

    //   <Input className="pl-10" placeholder="Search products" />
    // </InputGroup>
    // <InputGroup>
    //   <Input type="password" className="pr-10" />

    //   <button type="button" className="absolute right-3">
    //     <Eye />
    //   </button>
    // </InputGroup>
    // <InputGroup>
    //   <span className="absolute left-3">$</span>

    //   <Input className="pl-8" placeholder="0.00" />
    // </InputGroup>

    // <Badge variant="success">
    //   <Check className="h-3 w-3" />
    //   Verified
    // </Badge>

    // <IconButton variant="outline" aria-label="Shopping Cart">
    //   <ShoppingCart className="size-5" />
    // </IconButton>

    // <Button layout="icon-trailing">
    //   <ShoppingCart className="size-5" />
    //   Cart
    // </Button>

    // <Price value={4999} originalValue={9999} />

    // <div className="space-y-8 p-10">
    //   <Rating value={5} />
    //   <Rating value={4.5} />
    //   <Rating value={3.5} />
    //   <Rating value={4.8} showValue />
    // </div>

    // <div className="space-y-8 p-10">
    //   <ProductImage
    //     src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    //     alt="Nike Shoe"
    //   />

    //   <ProductImage src={null} alt="Missing Image" />

    //   <ProductImage
    //     src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    //     alt="Contain"
    //     objectFit="contain"
    //   />

    //   <ProductImage
    //     src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    //     alt="Portrait"
    //     aspectRatio="portrait"
    //   />
    // </div>

    // <QuantitySelector value={quantity} onValueChange={setQuantity} />

    // <div className="space-y-6">
    //   <QuantitySelector
    //     value={quantity}
    //     onValueChange={setQuantity}
    //     size="sm"
    //   />

    //   <QuantitySelector
    //     value={quantity}
    //     onValueChange={setQuantity}
    //     size="md"
    //   />

    //   <QuantitySelector
    //     value={quantity}
    //     onValueChange={setQuantity}
    //     size="lg"
    //   />
    // </div>

    /* Product Card Demo */

    <main className="container mx-auto py-10">
      <h1 className="mb-8 text-3xl font-bold">Product Card Demo</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onProductClick={(product) => console.log('Product:', product)}
            onAddToCart={(product) => console.log('Add to cart:', product)}
          />
        ))}
      </div>
    </main>
  );
}

export default HomePage;
