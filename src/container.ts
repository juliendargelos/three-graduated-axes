import { Box2, Vector2 } from 'three'
import { Axis } from '~/axis'

export class Container extends Box2 {
  private readonly _size: Vector2 = new Vector2()

  public constructor(points?: ({ x: number, y: number })[]) {
    super()
    points && this.setFromPoints(points as Vector2[])
  }

  public get size(): Vector2 {
    return this.getSize(this._size)
  }

  public normalizePoint(
    point: { x: number, y: number },
    target: Vector2 = new Vector2()
  ): Vector2 {
    return target
      .subVectors(point as Vector2, this.min)
      .divide(this.size)
  }

  public interpolatePoint(
    point: { x: number, y: number },
    container: Container,
    target: Vector2 = new Vector2()
  ): Vector2 {
    return container
      .normalizePoint(point, target)
      .multiply(this.size)
      .add(this.min)
  }

  public interpolatePoints(
    points: ({ x: number, y: number })[],
    targets: Vector2[] = points.map(() => new Vector2())
  ): Vector2[] {
    const container = new Container(points)

    points.some((point, index) => {
      if (index >= targets.length) return true
      this.interpolatePoint(point, container, targets[index])
    })

    return targets
  }

  public resize(x: Axis, y: Axis): void {
    const xHalfSize = x.size / 2
    const yHalfSize = y.size / 2

    this.min.set(
      x.startOffset * x.size - xHalfSize,
      y.startOffset * y.size - yHalfSize
    )

    this.max.set(
      xHalfSize - x.endOffset * x.size,
      yHalfSize - y.endOffset * y.size
    )
  }
}
