import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { Axis } from '~/axis';
export declare class Label extends CSS3DObject {
    private readonly wrapper;
    private readonly content;
    constructor();
    readonly style: CSSStyleDeclaration;
    generate(axis: Axis, value: number | string): void;
    resize(axis: Axis, opposite: Axis, position: number, renderingScale?: number): void;
}
//# sourceMappingURL=label.d.ts.map