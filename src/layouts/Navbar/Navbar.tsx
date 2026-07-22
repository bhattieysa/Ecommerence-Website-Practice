import { cn } from '@/lib/utils/cn';

import { Container } from '@/components/Container';

import type { NavbarProps } from './Navbar.types';
import { NavbarVariants } from './NavbarVariants';

export function Navbar({
  left,
  center,
  right,

  sticky,
  bordered,
  elevated,

  className,

  ...props
}: NavbarProps) {
  return (
    <header
      role="banner"
      className={cn(
        NavbarVariants({
          sticky,
          bordered,
          elevated,
        }),
        className,
      )}
      {...props}
    >
      <Container size="full">
        <div className="flex items-center justify-between gap-8 py-6 px-4 md:px-6 lg:px-8">
          {left && <div className="flex items-center gap-4">{left}</div>}

          {center && (
            <div className="flex-1 max-w-3xl xl:max-w-7xl">{center}</div>
          )}

          {right && <div className="flex items-center gap-3">{right}</div>}
        </div>
      </Container>
    </header>
  );
}
