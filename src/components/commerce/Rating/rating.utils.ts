import {
  DEFAULT_MAX_RATING,
  DEFAULT_PRECISION,
  STAR_STATES,
} from './rating.constants';

import type { RatingStarData, StarState } from './Rating.types';

export function clampRating(
  value: number,
  max: number = DEFAULT_MAX_RATING
): number {
  return Math.min(Math.max(value, 0), max);
}

export function roundRating(
  value: number,
  precision: number = DEFAULT_PRECISION
): number {
  return Math.round(value / precision) * precision;
}

export function normalizePrecision(
  value: number,
  max: number = DEFAULT_MAX_RATING,
  precision: number = DEFAULT_PRECISION
): number {
  return roundRating(clampRating(value, max), precision);
}

export function getStarState(
  rating: number,
  index: number
): StarState {
  if (rating >= index + 1) {
    return STAR_STATES.FULL;
  }

  if (rating >= index + 0.5) {
    return STAR_STATES.HALF;
  }

  return STAR_STATES.EMPTY;
}

export function generateStars(
  rating: number,
  max: number = DEFAULT_MAX_RATING
): RatingStarData[] {
  return Array.from(
    { length: max },
    (_, index) => ({
      index,
      state: getStarState(rating, index),
    })
  );
}

export function calculatePercentage(
  rating: number,
  index: number
): number {
  if (rating >= index + 1) {
    return 1;
  }

  if (rating >= index) {
    return rating - index;
  }

  return 0;
}

export function validateRating(
  value: number,
  max: number = DEFAULT_MAX_RATING
): boolean {
  return !isNaN(value) && isFinite(value) && value >= 0 && value <= max;
}

export function generateAriaLabel(
  value: number,
  max: number = DEFAULT_MAX_RATING,
  reviewCount?: number
): string {
  const roundedValue = Math.round(value * 10) / 10;
  
  if (reviewCount !== undefined && reviewCount > 0) {
    return `Rated ${roundedValue} out of ${max} stars from ${reviewCount.toLocaleString()} reviews`;
  }
  
  return `Rated ${roundedValue} out of ${max} stars`;
}

export function calculateKeyboardNavigation(
  currentValue: number,
  key: string,
  max: number = DEFAULT_MAX_RATING,
  precision: number = DEFAULT_PRECISION
): number {
  switch (key) {
    case 'ArrowRight':
    case 'ArrowUp':
      return Math.min(currentValue + precision, max);
    case 'ArrowLeft':
    case 'ArrowDown':
      return Math.max(currentValue - precision, 0);
    case 'Home':
      return 0;
    case 'End':
      return max;
    default:
      return currentValue;
  }
}