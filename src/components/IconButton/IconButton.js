import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { Button } from '../Button';
import { ICONS } from '@/components/IconButton/IconButton.constants';
export const IconButton = forwardRef(({ size = 'md', variant = 'ghost', ...props }, ref) => {
    const Icon = ICONS[props.icon];
    return (_jsx(Button, { ref: ref, size: size, layout: "icon", variant: variant, ...props, children: _jsx(Icon, {}) }));
});
IconButton.displayName = 'IconButton';
