import { forwardRef } from 'react';

import { Button } from '../Button';

import type { IconButtonProps } from '@/components/IconButton/IconButton.types';
import { ICONS } from '@/components/IconButton/IconButton.constants';

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ size = 'md', variant = 'ghost', ...props }, ref) => {
    const Icon = ICONS[props.icon];
    if (!Icon) {
      console.warn(`IconButton: Icon "${props.icon}" not found in ICONS`);
      return null;
    }
    return (
      <Button ref={ref} size={size} layout="icon" variant={variant} {...props}>
        <Icon />
      </Button>
    );
  },
);

IconButton.displayName = 'IconButton';
