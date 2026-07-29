import { cn } from '@/lib/utils/cn';
import { authLayoutVariants } from './AuthLayout.variants';
import type { AuthLayoutProps } from './AuthLayout.types';

export function AuthLayout({ panel, children, className }: AuthLayoutProps) {
  return (
    <div className={cn(authLayoutVariants(), className)}>
      {/* Left Side */}
      <aside className="hidden lg:block">{panel}</aside>

      {/* Right Side */}
      <main className="flex items-center justify-center p-8 md:p-12">
        {children}
      </main>
    </div>
  );
}
