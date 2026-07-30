import { SlidingAuth } from '@/app/auth/authSlider';
export function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-10">
      <SlidingAuth />
    </div>
  );
}
