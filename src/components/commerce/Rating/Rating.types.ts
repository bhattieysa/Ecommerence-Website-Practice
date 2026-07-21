import type { ComponentPropsWithoutRef } from 'react';


export type StarState = 'full' | 'half' | 'empty';


export interface RatingStarData {
  readonly index: number;
  readonly state: StarState;
}


export type RatingSize = 'sm' | 'md' | 'lg';

export type RatingVariant = 'default' | 'compact' | 'minimal' | 'review';


export type RatingMode = 'readonly' | 'interactive';


export interface StarIconProps {
  readonly state: StarState;
  readonly size: RatingSize;
  readonly className?: string;
}

export interface RatingStarProps {
  readonly state: StarState;
  readonly size: RatingSize;
  readonly className?: string;
}


export interface RatingValueProps {
  readonly value: number;
  readonly precision?: number;
  readonly size?: RatingSize;
  readonly variant?: RatingVariant;
  readonly className?: string;
}


export interface RatingCountProps {
  readonly count: number;
  readonly size?: RatingSize;
  readonly variant?: RatingVariant;
  readonly className?: string;
}


export type RatingChangeHandler = (value: number) => void;


export type RatingHoverHandler = (value: number) => void;

export interface RatingProps
  extends
    Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  readonly value?: number;
  readonly defaultValue?: number;
  readonly max?: number;
  readonly precision?: number;
  readonly size?: RatingSize;
  readonly variant?: RatingVariant;
  readonly interactive?: boolean;
  readonly readonly?: boolean;
  readonly disabled?: boolean;
  readonly onChange?: RatingChangeHandler;
  readonly onHover?: RatingHoverHandler;
  readonly onHoverEnd?: () => void;
  readonly showValue?: boolean;
  readonly showCount?: boolean;
  readonly reviewCount?: number;
}
