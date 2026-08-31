import { StarIcon } from './StarIcon';
import type { RatingStarProps } from './Rating.types';

export function RatingStar({ state, size, className }: RatingStarProps) {
  return <StarIcon state={state} size={size} className={className} />;
}
