import { Star } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { starVariants } from './ratingVariants';
import type { StarIconProps } from './Rating.types';

export function StarIcon({ state, size, className }: StarIconProps) {
  return (
    <span className="relative inline-flex" aria-hidden="true">
      <Star
        className={cn(
          starVariants({ size, state }),
          'text-gray-300 dark:text-gray-600',
          className,
        )}
      />

      {state !== 'empty' && (
        <span
          className={cn(
            'absolute inset-0 overflow-hidden',
            state === 'half' ? 'w-1/2' : 'w-full',
          )}
        >
          <Star
            fill="currentColor"
            className={cn(
              starVariants({ size, state }),
              'text-yellow-400 dark:text-yellow-500',
            )}
          />
        </span>
      )}
    </span>
  );
}
