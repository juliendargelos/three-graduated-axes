import { Box2, Vector2 } from 'three';
import { Axis } from '~/axis';
export declare class Container extends Box2 {
    private readonly _size;
    constructor(points?: ({
        x: number;
        y: number;
    })[]);
    readonly size: Vector2;
    normalizePoint(point: {
        x: number;
        y: number;
    }, target?: Vector2): Vector2;
    interpolatePoint(point: {
        x: number;
        y: number;
    }, container: Container, target?: Vector2): Vector2;
    interpolatePoints(points: ({
        x: number;
        y: number;
    })[], targets?: Vector2[]): Vector2[];
    resize(x: Axis, y: Axis): void;
}
//# sourceMappingURL=container.d.ts.map