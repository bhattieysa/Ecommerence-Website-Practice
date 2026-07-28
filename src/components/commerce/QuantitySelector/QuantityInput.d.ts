import type { ComponentPropsWithoutRef } from 'react';
import { Input } from '@/components/Input/Input';
interface QuantityInputProps extends Omit<ComponentPropsWithoutRef<typeof Input>, 'value' | 'onChange'> {
    value: number;
    onValueChange(value: number): void;
    min?: number;
    max?: number;
    step?: number;
    size?: 'sm' | 'md' | 'lg';
}
export declare const QuantityInput: import("react").ForwardRefExoticComponent<QuantityInputProps & import("react").RefAttributes<HTMLInputElement>>;
export {};
