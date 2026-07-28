import { DEFAULT_MAX_RATING, DEFAULT_PRECISION, STAR_STATES, } from './rating.constants';
export function clampRating(value, max = DEFAULT_MAX_RATING) {
    return Math.min(Math.max(value, 0), max);
}
export function roundRating(value, precision = DEFAULT_PRECISION) {
    return Math.round(value / precision) * precision;
}
export function normalizePrecision(value, max = DEFAULT_MAX_RATING, precision = DEFAULT_PRECISION) {
    return roundRating(clampRating(value, max), precision);
}
export function getStarState(rating, index) {
    if (rating >= index + 1) {
        return STAR_STATES.FULL;
    }
    if (rating >= index + 0.5) {
        return STAR_STATES.HALF;
    }
    return STAR_STATES.EMPTY;
}
export function generateStars(rating, max = DEFAULT_MAX_RATING) {
    return Array.from({ length: max }, (_, index) => ({
        index,
        state: getStarState(rating, index),
    }));
}
export function calculatePercentage(rating, index) {
    if (rating >= index + 1) {
        return 1;
    }
    if (rating >= index) {
        return rating - index;
    }
    return 0;
}
export function validateRating(value, max = DEFAULT_MAX_RATING) {
    return !isNaN(value) && isFinite(value) && value >= 0 && value <= max;
}
export function generateAriaLabel(value, max = DEFAULT_MAX_RATING, reviewCount) {
    const roundedValue = Math.round(value * 10) / 10;
    if (reviewCount !== undefined && reviewCount > 0) {
        return `Rated ${roundedValue} out of ${max} stars from ${reviewCount.toLocaleString()} reviews`;
    }
    return `Rated ${roundedValue} out of ${max} stars`;
}
export function calculateKeyboardNavigation(currentValue, key, max = DEFAULT_MAX_RATING, precision = DEFAULT_PRECISION) {
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
