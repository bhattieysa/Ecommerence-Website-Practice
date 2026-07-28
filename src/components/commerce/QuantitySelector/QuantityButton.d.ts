import type { ComponentPropsWithoutRef } from 'react';
import { IconButton } from '@/components/IconButton';
type QuantityAction = 'increment' | 'decrement';
interface QuantityButtonProps extends Omit<ComponentPropsWithoutRef<typeof IconButton>, 'children'> {
    action: QuantityAction;
}
export declare function QuantityButton({ action, disabled, onClick, className, size, ...props }: QuantityButtonProps & {
    size?: 'sm' | 'md' | 'lg';
}): import("react").JSX.Element;
export {};
