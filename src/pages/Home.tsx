import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Typography } from '@/components/Typography/Typography';
export function HomePage() {
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

    <Section
      title="Grab the best deal on Smartphones"
      action={<Button variant="ghost">View All</Button>}
    >
      <Container size="sm" padding="sm">
        Welcome to MegaMart{' '}
      </Container>
    </Section>

    // <Typography as="h2" variant="h2">
    //   Grab the best deal on Smartphones
    //   <Typography variant="body">Apple iPhone 16 Pro Max</Typography>
    // </Typography>
  );
}

export default HomePage;
