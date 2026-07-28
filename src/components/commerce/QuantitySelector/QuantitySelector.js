import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { cn } from '@/lib/utils/cn';
import { QUANTITY_DEFAULTS } from './Quantity.constants';
import { QuantityButton } from './QuantityButton';
import { QuantityInput } from './QuantityInput';
import { quantitySelectorVariants } from './QuantityVariants';
import { canDecrement, canIncrement, decrementQuantity, incrementQuantity, validateQuantityRange, } from './Quantity.utils';
export function QuantitySelector({ value, onValueChange, min = QUANTITY_DEFAULTS.min, max = QUANTITY_DEFAULTS.max, step = QUANTITY_DEFAULTS.step, disabled = false, showInput = true, size = 'md', radius = 'md', className, ...props }) {
    validateQuantityRange(min, max);
    const canDecrementValue = useMemo(() => canDecrement(value, min), [value, min]);
    const canIncrementValue = useMemo(() => canIncrement(value, max), [value, max]);
    const handleDecrement = () => {
        const newValue = decrementQuantity(value, step, min, max);
        onValueChange(newValue);
    };
    const handleIncrement = () => {
        const newValue = incrementQuantity(value, step, min, max);
        onValueChange(newValue);
    };
    const buttonSize = size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md';
    return (_jsxs("div", { className: cn(quantitySelectorVariants({ size, radius, disabled }), className), ...props, children: [_jsx(QuantityButton, { action: "decrement", disabled: disabled || !canDecrementValue, onClick: handleDecrement, size: buttonSize }), showInput && (_jsx(QuantityInput, { value: value, min: min, max: max, step: step, size: size, disabled: disabled, onValueChange: onValueChange })), _jsx(QuantityButton, { action: "increment", disabled: disabled || !canIncrementValue, onClick: handleIncrement, size: buttonSize })] }));
}
