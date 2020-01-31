import { Mesh, Color } from 'three';
import { Axis, AxisParameters, AxisGenerateParameters } from '~/axis';
import { Labels, LabelsParameters } from '~/labels';
import { Graduations } from '~/graduations';
import { Container } from '~/container';
export declare class Axes extends Mesh {
    x: Axis;
    y: Axis;
    labels: Labels;
    graduations: Graduations;
    container: Container;
    constructor({ x, y, labels, opacity, color, generate }?: {
        x?: Partial<AxisParameters>;
        y?: Partial<AxisParameters>;
        labels?: Partial<LabelsParameters>;
        opacity?: number;
        color?: Color | number | string;
        generate?: boolean;
    });
    visible: boolean;
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