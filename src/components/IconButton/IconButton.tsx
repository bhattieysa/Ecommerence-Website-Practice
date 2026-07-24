import { forwardRef } from 'react';

import { Button } from '../Button';

import type { IconButtonProps } from '@/components/IconButton/IconButton.types';
import { ICONS } from '@/components/IconButton/IconButton.constants';

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ size = 'md', variant = 'ghost', ...props }, ref) => {
    const Icon = ICONS[props.icon];
    return (
      <Button ref={ref} size={size} layout="icon" variant={variant} {...props}>
        <Icon />
      </Button>
    );
  },
);

IconButton.displayName = 'IconButton';
