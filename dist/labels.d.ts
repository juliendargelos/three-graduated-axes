import { Object3D, Camera } from 'three';
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
    private readonly css3DRenderer;
    private readonly originalMatrix;
    private _faceCamera;
    readonly style: CSSStyleDeclaration;
    fontSize: number;
    renderingScale: number;
    constructor({ opacity, color, fontSize, fontFamily, faceCamera, renderingScale, }?: Partial<LabelsParameters>);
    private iterate;
    private scaleFont;
    opacity: number;
    color: string;
    fontFamily: string;
    faceCamera: boolean;
    visible: boolean;
    setRendererSize(width: number, height: number): void;
    render(camera: Camera): void;
    generate(x: Axis, y: Axis): void;
    resize(x: Axis, y: Axis): void;
}
//# sourceMappingURL=labels.d.ts.map