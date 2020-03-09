import { Mesh, Color } from 'three';
import { Axis, AxisParameters, AxisGenerateParameters } from '~/axis';
import { Labels, LabelsParameters } from '~/labels';
import { Graduations } from '~/graduations';
export declare class Axes extends Mesh {
    x: Axis;
    y: Axis;
    labels: Labels;
    graduations: Graduations;
    constructor({ x, y, labels, opacity, color, generate }?: {
        x?: Partial<AxisParameters>;
        y?: Partial<AxisParameters>;
        labels?: Partial<LabelsParameters>;
        opacity?: number;
        color?: Color | number | string;
        generate?: boolean;
    });
    show(): void;
    hide(): void;
    toggle(toggle?: boolean): void;
    color: Color;
    opacity: number;
    generate(values?: ({
        x: number | string;
        y: number | string;
    })[], { x, y }?: {
        x?: Partial<AxisGenerateParameters>;
        y?: Partial<AxisGenerateParameters>;
    }): void;
    resize(): void;
    generateGraduations(): void;
    resizeGraduations(): void;
    generateLabels(): void;
    resizeLabels(): void;
}
//# sourceMappingURL=axes.d.ts.map