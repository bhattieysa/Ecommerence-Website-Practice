export declare function clampQuantity(value: number, min?: number, max?: number): number;
export declare function isValidQuantity(value: number, min?: number, max?: number): boolean;
export declare function incrementQuantity(value: number, step: number, min: number, max: number): number;
export declare function decrementQuantity(value: number, step: number, min: number, max: number): number;
export declare function parseQuantity(value: string, min?: number, max?: number): number;
export declare function canIncrement(value: number, max?: number): boolean;
export declare function canDecrement(value: number, min?: number): boolean;
export declare function validateQuantityRange(min: number, max: number): void;
