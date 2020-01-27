import { BufferGeometry, BufferAttribute, Box2, Vector2 } from 'three'
import { Axis } from '~/axis'

export class Graduations extends BufferGeometry {
  private graduations: number[] = []
  private root: number[] = []
  public readonly container: Box2 = new Box2(new Vector2(), new Vector2())

  public generate(x: Axis, y: Axis): void {
    const indicesLength = 6 * [x, y].reduce((sum, {
      graduations,
      root,
      rootPosition,
      labels
    }, index) => {
      const maximum = labels.length - 1

      if (!graduations) {
        graduations = 0 + (root as unknown as number)
      } else if (labels.length) {
        if (graduations < 1) {
          rootPosition *= maximum
          let step = Math.min(maximum, Math.round(1 / graduations))
          while (maximum % step || rootPosition % step) step--
          graduations = Math.ceil(labels.length / step)
        } else {
          graduations = Math.round(graduations) * maximum + 1
        }
      } else {
        graduations = Math.round(graduations)
      }

      this.graduations[index] = graduations

      return sum + graduations
    }, 0)

    const indices = new Uint16Array(indicesLength)
    let index = 0

    for (var i = 0; i < indicesLength; i += 6) {
      indices[i    ] = indices[i + 3] = index
      indices[i + 1] = indices[i + 5] = index + 2
      indices[i + 2] = index + 1
      indices[i + 4] = index + 3

      index += 4
    }

    this.setIndex(new BufferAttribute(indices, 1))
    this.setAttribute('position',
      new BufferAttribute(new Float32Array(indicesLength * 2), 3)
    )

    this.resize(x, y)
  }

  public resize(x: Axis, y: Axis): void {
    const positionAttribute = this.getAttribute('position') as BufferAttribute
    const vertices = positionAttribute.array as Float32Array

    const xGraduations = this.graduations[0]
    const yGraduations = this.graduations[1]

    const xHalfSize = x.size / 2
    const yHalfSize = y.size / 2

    const xFactor = x.size / Math.max(1, xGraduations - 1)
    const yFactor = y.size / Math.max(1, yGraduations - 1)

    const xPaddedHalfSize = xHalfSize + y.padding
    const yPaddedHalfSize = yHalfSize + x.padding

    const xHalfLineWidth = x.lineWidth / 2
    const yHalfLineWidth = y.lineWidth / 2

    const xRootPosition = xGraduations === 1 ? x.rootPosition * x.size : 0
    const yRootPosition = yGraduations === 1 ? y.rootPosition * y.size : 0

    let index = 0

    for (var i = 0; i < xGraduations; i++) {
      const position = i * xFactor - xHalfSize + xRootPosition

      vertices[index    ] = vertices[index +  9] = position - xHalfLineWidth
      vertices[index + 3] = vertices[index +  6] = position + xHalfLineWidth
      vertices[index + 7] = vertices[index + 10] = -yPaddedHalfSize
      vertices[index + 1] = vertices[index +  4] = yPaddedHalfSize

      index += 12
    }

    for (var i = 0; i < yGraduations; i++) {
      const position = i * yFactor - yHalfSize + yRootPosition

      vertices[index    ] = vertices[index +  9] = -xPaddedHalfSize
      vertices[index + 3] = vertices[index +  6] = xPaddedHalfSize
      vertices[index + 7] = vertices[index + 10] = position - yHalfLineWidth
      vertices[index + 1] = vertices[index +  4] = position + yHalfLineWidth

      index += 12
    }

    positionAttribute.needsUpdate = true

    this.container.min.set(
      x.startOffset * x.size - xHalfSize,
      y.startOffset * y.size - yHalfSize
    )

    this.container.max.set(
      xHalfSize - x.endOffset * x.size,
      yHalfSize - y.endOffset * y.size
    )
  }
}
