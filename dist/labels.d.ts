import { Object3D, WebGLRenderer, Camera, Scene } from 'three';
import { Axis } from '~/axis';
export interface LabelsParameters {
    opacity: number;
    color: string;
    fontSize: number;
    fontFamily: string;
    faceCamera: boolean;
    renderingScale: number;
}
export declare class Labels extends Object3D implements LabelsParameters {
    private readonly cssStyle;
    private _faceCamera;
    fontSize: number;
    renderingScale: number;
    constructor({ opacity, color, fontSize, fontFamily, faceCamera, renderingScale, }?: Partial<LabelsParameters>);
    private iterate;
    private addLabel;
    private scaleFont;
    opacity: number;
    color: string;
    fontFamily: string;
    faceCamera: boolean;
    visible: boolean;
    onBeforeRender: (_: WebGLRenderer, __: Scene, camera: Camera) => void;
    onAfterRender: (_: WebGLRenderer, __: Scene, camera: Camera) => void;
    generate(x: Axis, y: Axis): void;
    resize(x: Axis, y: Axis): void;
}
//# sourceMappingURL=labels.d.ts.map