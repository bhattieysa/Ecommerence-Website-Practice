import { forwardRef } from 'react';

import { Button } from '../Button';

import type { IconButtonProps } from '@/components/IconButton/IconButton.types';

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ size = 'md', variant = 'ghost', ...props }, ref) => (
    <Button ref={ref} size={size} layout="icon" variant={variant} {...props} />
  ),
);

IconButton.displayName = 'IconButton';
