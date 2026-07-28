import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef, useEffect, useState } from 'react';
import { Input } from '@/components/Input/Input';
import { cn } from '@/lib/utils/cn';
import { quantityInputVariants } from '@/components/commerce/QuantitySelector/QuantityVariants';
import { parseQuantity } from '@/components/commerce/QuantitySelector/Quantity.utils';
import { QUANTITY_ARIA_LABELS } from '@/components/commerce/QuantitySelector/Quantity.constants';
export const QuantityInput = forwardRef(({ value, min, max, step, size = 'md', disabled = false, onValueChange, className, ...props }, ref) => {
    const [inputValue, setInputValue] = useState(String(value));
    useEffect(() => {
        setInputValue(String(value));
    }, [value]);
    const handleBlur = () => {
        const parsed = parseQuantity(inputValue, min, max);
        setInputValue(String(parsed));
        onValueChange(parsed);
    };
    return (_jsx(Input, { ref: ref, type: "number", inputMode: "numeric", value: inputValue, min: min, max: max, step: step, disabled: disabled, "aria-label": QUANTITY_ARIA_LABELS.input, className: cn(quantityInputVariants({ size }), className), onChange: (e) => setInputValue(e.target.value), onBlur: handleBlur, ...props }));
});
QuantityInput.displayName = 'QuantityInput';
