import { Mesh, WebGLRenderer, Camera, Scene, Color, Vector2 } from 'three';
import { Axis, AxisParameters, AxisGenerateParameters } from '~/axis';
import { Labels, LabelsParameters } from '~/labels';
import { Graduations } from '~/graduations';
export declare class Axes extends Mesh {
    x: Axis;
    y: Axis;
    labels: Labels;
    graduations: Graduations;
    constructor({ x, y, labels, opacity, color, autoRenderCSS3D }?: {
        x?: Partial<AxisParameters>;
        y?: Partial<AxisParameters>;
        labels?: Partial<LabelsParameters>;
        opacity?: number;
        color?: Color | number | string;
        autoRenderCSS3D?: boolean | Scene;
    });
    visible: boolean;
    color: Color;
    opacity: number;
    onBeforeRender: (renderer: WebGLRenderer, scene: Scene, camera: Camera) => void;
    onAfterRender: (renderer: WebGLRenderer, scene: Scene, camera: Camera) => void;
    generate(values?: ({
        x: number;
        y: number;
    })[], { x, y }?: {
        x?: Partial<AxisGenerateParameters>;
        y?: Partial<AxisGenerateParameters>;
    }): void;
    resize(): void;
    generateGraduations(): void;
    resizeGraduations(): void;
    generateLabels(): void;
    resizeLabels(): void;
    autoRenderCSS3D(scene: Scene): void;
    interpolateValue(value: number, minimum: number, maximum: number, axis: 'x' | 'y'): number;
    interpolate(values: ({
        x: number;
        y: number;
    })[], points?: Vector2[]): Vector2[];
}
//# sourceMappingURL=axes.d.ts.map