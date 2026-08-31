/**
 * Default rating value.
 */
export const DEFAULT_RATING = 0;

/**
 * Default maximum rating value.
 */
export const DEFAULT_MAX_RATING = 5;

/**
 * Default precision for rating values.
 */
export const DEFAULT_PRECISION = 0.5;

/**
 * Default size for the rating component.
 */
export const DEFAULT_SIZE = 'md' as const;

/**
 * Default variant for the rating component.
 */
export const DEFAULT_VARIANT = 'default' as const;

/**
 * Available size presets for the rating component.
 */
export const RATING_SIZES = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
} as const;

/**
 * Available visual variants for the rating component.
 */
export const RATING_VARIANTS = {
  default: 'default',
  compact: 'compact',
  minimal: 'minimal',
  review: 'review',
} as const;

/**
 * Available modes for the rating component.
 */
export const RATING_MODES = {
  readonly: 'readonly',
  interactive: 'interactive',
} as const;

export const STAR_STATES = {
  FULL: 'full',
  HALF: 'half',
  EMPTY: 'empty',
} as const;

export const RATING_KEYS = {
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  HOME: 'Home',
  END: 'End',
  ENTER: 'Enter',
  SPACE: ' ',
} as const;
