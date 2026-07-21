import { forwardRef, type ReactElement } from 'react';
import { cn } from '@/utils/cn';
import type { TypographyProps } from '@/components/Typography/Typography.types';
import { TypographyVariants } from '@/components/Typography/TypographyVariants';

const defaultElement = {
  display: 'h1',

  h1: 'h1',

  h2: 'h2',

  h3: 'h3',

  h4: 'h4',

  h5: 'h5',

  h6: 'h6',

  heading1: 'h1',

  heading2: 'h2',

  heading3: 'h3',

  heading4: 'h4',

  heading5: 'h5',

  heading6: 'h6',

  bodyLg: 'p',

  body: 'p',

  bodySm: 'p',

  bodyLarge: 'p',

  bodySmallAlias: 'p',

  caption: 'span',

  overline: 'span',
} as const;

type TypographyElement = HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement;

type TypographyComponent = (
  props: TypographyProps & {
    as?: keyof typeof defaultElement;
    ref?: React.Ref<TypographyElement>;
  },
) => ReactElement | null;

const TypographyInner = forwardRef<TypographyElement, TypographyProps>(
  (
    {
      as,

      variant = 'body',

      color,

      align,

      weight,

      className,

      children,

      ...props
    },
    ref,
  ) => {
    const Component = as ?? defaultElement[variant as keyof typeof defaultElement];

    return (
      <Component
        ref={ref as any}
        className={cn(
          TypographyVariants({
            variant,
            color,
            align,
            weight,
          }),
          className,
        )}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

export const Typography = TypographyInner as TypographyComponent;

(TypographyInner as any).displayName = 'Typography';
