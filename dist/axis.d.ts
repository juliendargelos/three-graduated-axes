import { Vector2 } from 'three';
export interface AxisParameters {
    size: number;
    labels: (number | string)[];
    decimals?: number;
    prefix: string;
    suffix: string;
    graduations: number;
    root: boolean;
    relative: boolean;
    lineWidth: number;
    progress: number;
    margin: number;
    padding: number;
    distance: number;
}
export interface AxisGenerateParameters {
    labels: number;
    decimals: number;
    labelsBasedDecimals: boolean;
    root: boolean;
    relative: boolean;
    minimumOffset: number;
    maximumOffset: number;
}
export declare class Axis implements AxisParameters {
    private _relative;
    private _labels;
    orientation: Vector2;
    spacing: Vector2;
    size: number;
    decimals?: number;
    prefix: string;
    suffix: string;
    graduations: number;
    root: boolean;
    lineWidth: number;
    progress: number;
    margin: number;
    padding: number;
    distance: number;
    rootPosition: number;
    minimumOffset: number;
    maximumOffset: number;
    constructor({ orientation, spacing, size, labels, prefix, suffix, decimals, graduations, root, relative, lineWidth, progress, margin, padding, distance }: Partial<AxisParameters> & {
        orientation: Vector2;
        spacing: Vector2;
    });
    private updateRootPosition;
    labels: (number | string)[];
    relative: boolean;
    generate(values: number[], { labels, decimals, labelsBasedDecimals, root, relative, minimumOffset, maximumOffset }?: Partial<AxisGenerateParameters>): void;
    reset(): void;
}
//# sourceMappingURL=axis.d.ts.map