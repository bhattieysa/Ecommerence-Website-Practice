import { Typography } from '@/components/Typography';
import { cn } from '@/lib/utils/cn';
import { ratingValueVariants } from './ratingVariants';
import type { RatingValueProps } from './Rating.types';

export function RatingValue({
  value,
  precision = 1,
  size = 'md',
  variant = 'default',
  className,
}: RatingValueProps) {
  return (
    <Typography
      variant="bodySm"
      className={cn(ratingValueVariants({ size, variant }), className)}
    >
      {value.toFixed(precision)}
    </Typography>
  );
}
