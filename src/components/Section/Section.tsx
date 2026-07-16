import { Container } from '@/components/Container/Container';
import { SectionHeader } from '@/components/Section/SectionHeader';
import type { SectionProps } from '@/components/Section/Section.types';
import { sectionVariants } from '@/components/Section/SectionVariants';
import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    { title, subtitle, action, spacing, className, children, ...props },
    ref,
  ) => {
    return (
      <section
        ref={ref}
        className={cn(sectionVariants({ spacing }), className)}
        {...props}
      >
        <Container>
          <SectionHeader title={title} subtitle={subtitle} action={action} />

          {children}
        </Container>
      </section>
    );
  },
);

Section.displayName = 'Section';
