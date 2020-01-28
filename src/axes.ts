import { Mesh, MeshBasicMaterial, Color, Vector2 } from 'three'
import { Axis, AxisParameters, AxisGenerateParameters } from '~/axis'
import { Labels, LabelsParameters } from '~/labels'
import { Graduations } from '~/graduations'

export class Axes extends Mesh {
  public x: Axis
  public y: Axis
  public labels: Labels
  public graduations: Graduations

  public constructor({
    x = {},
    y = {},
    labels = {},
    opacity = 1,
    color = 0xaaaaaa,
    generate = true
  }: {
    x?: Partial<AxisParameters>
    y?: Partial<AxisParameters>
    labels?: Partial<LabelsParameters>
    opacity?: number
    color?: Color | number | string
    generate?: boolean
  } = {}) {
    super(new Graduations())

    this.x = new Axis({ ...x,
      orientation: new Vector2(1, 0),
      spacing: new Vector2(1, -1)
    })

    this.y = new Axis({ ...y,
      orientation: new Vector2(0, 1),
      spacing: new Vector2(-1, 1)
    })

    this.graduations = this.geometry as Graduations
    this.labels = new Labels(labels)
    this.opacity = opacity
    this.color.set(color as Color)

    this.add(this.labels)

    generate && this.generate()
  }

  public get visible(): boolean {
    return this.labels.visible
  }

  public set visible(visible: boolean) {
    if (this.labels) this.labels.visible = visible
  }

  public get color(): Color {
    return (this.material as MeshBasicMaterial).color
  }

  public set color(color: Color) {
    (this.material as MeshBasicMaterial).color = color
  }

  public get opacity(): number {
    return (this.material as MeshBasicMaterial).opacity
  }

  public set opacity(opacity: number) {
    (this.material as MeshBasicMaterial).transparent = opacity !== 1
    ;(this.material as MeshBasicMaterial).opacity = opacity
  }

  public generate(values?: ({ x: number, y: number })[], { x = {}, y = {} }: {
    x?: Partial<AxisGenerateParameters>
    y?: Partial<AxisGenerateParameters>
  } = {}): void {
    if (values) {
      this.x.generate(values.map(({ x }) => x), x)
      this.y.generate(values.map(({ y }) => y), y)
    }

    this.generateGraduations()
    this.generateLabels()
  }

  public resize(): void {
    this.resizeGraduations()
    this.resizeLabels()
  }

  public generateGraduations(): void {
    this.graduations.generate(this.x, this.y)
  }

  public resizeGraduations(): void {
    this.graduations.resize(this.x, this.y)
  }

  public generateLabels(): void {
    this.labels.generate(this.x, this.y)
  }

  public resizeLabels(): void {
    this.labels.resize(this.x, this.y)
  }

  public interpolateValue(
    value: number,
    minimum: number,
    maximum: number,
    axis: 'x' | 'y'
  ): number {
    return (value - minimum) / (maximum - minimum) * (
      this.graduations.container.max[axis] -
      this.graduations.container.min[axis]
    ) + this.graduations.container.min[axis]
  }

  public interpolate(
    values: ({ x: number, y: number })[],
    points: Vector2[] = []
  ): Vector2[] {

    points.length > values.length && points.splice(values.length)
    while (points.length < values.length) points.push(new Vector2())

    let xMinimum = Infinity
    let yMinimum = Infinity

    let xMaximum = -Infinity
    let yMaximum = -Infinity

    values.forEach(({ x, y }) => {
      if (x < xMinimum) xMinimum = x
      if (x > xMaximum) xMaximum = x
      if (y < yMinimum) yMinimum = y
      if (y > yMaximum) yMaximum = y
    })

    values.forEach(({ x, y }, index) => points[index].set(
      this.interpolateValue(x, xMinimum, xMaximum, 'x'),
      this.interpolateValue(y, yMinimum, yMaximum, 'y')
    ))

    return points
  }
}
