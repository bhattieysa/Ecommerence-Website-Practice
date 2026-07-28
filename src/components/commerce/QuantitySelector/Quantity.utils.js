import { QUANTITY_DEFAULTS } from '@/components/commerce/QuantitySelector/Quantity.constants';
export function clampQuantity(value, min = QUANTITY_DEFAULTS.min, max = QUANTITY_DEFAULTS.max) {
    return Math.min(Math.max(value, min), max);
}
export function isValidQuantity(value, min = QUANTITY_DEFAULTS.min, max = QUANTITY_DEFAULTS.max) {
    return value >= min && value <= max;
}
export function incrementQuantity(value, step, min, max) {
    return clampQuantity(value + step, min, max);
}
export function decrementQuantity(value, step, min, max) {
    return clampQuantity(value - step, min, max);
}
export function parseQuantity(value, min = QUANTITY_DEFAULTS.min, max = QUANTITY_DEFAULTS.max) {
    const parsed = Number.parseInt(value, 10);
    if (Number.isNaN(parsed)) {
        return min;
    }
    return clampQuantity(parsed, min, max);
}
export function canIncrement(value, max = QUANTITY_DEFAULTS.max) {
    return value < max;
}
export function canDecrement(value, min = QUANTITY_DEFAULTS.min) {
    return value > min;
}
export function validateQuantityRange(min, max) {
    if (min > max) {
        throw new Error('QuantitySelector: min cannot be greater than max.');
    }
}
