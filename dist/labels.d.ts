import { Object3D, WebGLRenderer, Camera, Scene } from 'three';
import { Axis } from '~/axis';
export interface LabelsParameters {
    color: string;
    opacity: number;
    fontSize: number;
    fontFamily: string;
    faceCamera: boolean;
}
export declare class Labels extends Object3D implements LabelsParameters {
    private readonly cssStyle;
    private _faceCamera;
    constructor({ opacity, color, fontSize, fontFamily, faceCamera }?: Partial<LabelsParameters>);
    private iterate;
    private addLabel;
    opacity: number;
    color: string;
    fontFamily: string;
    fontSize: number;
    faceCamera: boolean;
    visible: boolean;
    generate(x: Axis, y: Axis): void;
    resize(x: Axis, y: Axis): void;
    onBeforeRender: (_: WebGLRenderer, __: Scene, camera: Camera) => void;
}
//# sourceMappingURL=labels.d.ts.map