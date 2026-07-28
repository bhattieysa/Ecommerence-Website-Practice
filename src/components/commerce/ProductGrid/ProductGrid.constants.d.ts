export declare const PRODUCT_GRID_COLUMNS: readonly ["2", "3", "4", "auto"];
export type ProductGridColumn = (typeof PRODUCT_GRID_COLUMNS)[number];
export declare const PRODUCT_GRID_GAPS: readonly ["sm", "md", "lg"];
export type ProductGridGap = (typeof PRODUCT_GRID_GAPS)[number];
export declare const PRODUCT_GRID_LAYOUT: {
    readonly minCardWidth: "280px";
    readonly gaps: {
        readonly sm: "gap-4";
        readonly md: "gap-6";
        readonly lg: "gap-8";
    };
};
export declare const PRODUCT_GRID_DEFAULTS: {
    readonly columns: "auto";
    readonly gap: "md";
};
export declare const PRODUCT_GRID_LABELS: {
    readonly empty: "No products found.";
};
