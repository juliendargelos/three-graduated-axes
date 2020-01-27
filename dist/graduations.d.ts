import { BufferGeometry, Box2 } from 'three';
import { Axis } from '~/axis';
export declare class Graduations extends BufferGeometry {
    private graduations;
    private root;
    readonly container: Box2;
    generate(x: Axis, y: Axis): void;
    resize(x: Axis, y: Axis): void;
}
//# sourceMappingURL=graduations.d.ts.map