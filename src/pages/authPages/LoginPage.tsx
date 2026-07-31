import { SlidingAuth } from '@/app/auth/authSlider';

export function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-2 md:px-4 py-6 md:py-10">
      <SlidingAuth size="md" />
    </div>
  );
}
