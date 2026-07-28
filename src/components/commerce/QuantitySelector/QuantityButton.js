import { jsx as _jsx } from "react/jsx-runtime";
import { Minus, Plus } from 'lucide-react';
import { IconButton } from '@/components/IconButton';
import { cn } from '@/lib/utils/cn';
import { QUANTITY_ARIA_LABELS } from '@/components/commerce/QuantitySelector/Quantity.constants';
export function QuantityButton({ action, disabled = false, onClick, className, size = 'sm', ...props }) {
    const Icon = action === 'increment' ? Plus : Minus;
    const ariaLabel = action === 'increment'
        ? QUANTITY_ARIA_LABELS.increment
        : QUANTITY_ARIA_LABELS.decrement;
    return (_jsx(IconButton, { type: "button", variant: "ghost", size: size, disabled: disabled, "aria-label": ariaLabel, onClick: onClick, className: cn('rounded-none', className), ...props, children: _jsx(Icon, { className: "h-4 w-4" }) }));
}
