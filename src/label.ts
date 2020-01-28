import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'
import { Axis } from '~/axis'

export class Label extends CSS3DObject {
  private readonly wrapper: HTMLDivElement = document.createElement('div')
  private readonly content: HTMLDivElement = document.createElement('div')

  public constructor() {
    super(document.createElement('div'))
    this.wrapper.appendChild(this.content)
    this.element.appendChild(this.wrapper)
  }

  public get style(): CSSStyleDeclaration {
    return this.wrapper.style
  }

  public generate(axis: Axis, value: number | string): void {
    const rounding = (
      axis.decimals !== undefined &&
      Math.pow(10, axis.decimals)
    ) as number

    this.content.textContent = `${axis.prefix}${
      rounding ? Math.round((value as number) * rounding) / rounding : value
    }${axis.suffix}`
  }

  public resize(
    axis: Axis,
    opposite: Axis,
    position: number,
    renderingScale: number = 10
  ): void {
    const rootPosition = (opposite.rootPosition - 0.5) * opposite.size
    position = (position / (axis.labels.length - 1) - 0.5) * axis.size

    const spacingX = axis.spacing.x * (
      (opposite.relative || !axis.orientation.x) as unknown as number
    )

    const spacingY = axis.spacing.y * (
      (opposite.relative || !axis.orientation.y) as unknown as number
    )

    this.content.style.transform = `translate(${
      50 * spacingX
    }%, ${
      -50 * spacingY
    }%)`

    this.position
      .setX(renderingScale * (
        axis.orientation.x * position +
        axis.orientation.y * rootPosition +
        axis.margin * spacingX -
        axis.padding * axis.orientation.y * (
          !opposite.relative as unknown as number
        )
      ))
      .setY(renderingScale * (
        axis.orientation.y * position +
        axis.orientation.x * rootPosition +
        axis.margin * spacingY -
        axis.padding * axis.orientation.x * (
          !opposite.relative as unknown as number
        )
      ))
  }
}
