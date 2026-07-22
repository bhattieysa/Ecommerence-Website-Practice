import { Typography } from '@/components/Typography';
import { cn } from '@/lib/utils/cn';
import { ratingCountVariants } from './ratingVariants';
import type { RatingCountProps } from './Rating.types';

export function RatingCount({
  count,
  size = 'md',
  variant = 'default',
  className,
}: RatingCountProps) {
  return (
    <Typography
      variant="bodySm"
      color="muted"
      className={cn(ratingCountVariants({ size, variant }), className)}
    >
      ({count.toLocaleString()})
    </Typography>
  );
}
