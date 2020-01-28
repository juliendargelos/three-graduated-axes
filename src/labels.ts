import {
  Object3D,
  WebGLRenderer,
  Camera,
  Scene,
} from 'three'

import { CSSStyle } from '~/css-style'
import { Axis } from '~/axis'
import { Label } from '~/label'

export interface LabelsParameters {
  opacity: number
  color: string
  fontSize: number
  fontFamily: string
  faceCamera: boolean
  renderingScale: number
}

export class Labels extends Object3D implements LabelsParameters {
  private readonly cssStyle = new CSSStyle().set('white-space', 'nowrap')
  private _faceCamera!: boolean
  public fontSize: number
  public renderingScale: number

  public constructor({
    opacity = 1,
    color = '#aaaaaa',
    fontSize = 0.3,
    fontFamily = 'sans-serif',
    faceCamera = false,
    renderingScale = 100,
  }: Partial<LabelsParameters> = {}) {
    super()

    this.opacity = opacity
    this.color = color
    this.fontSize = fontSize
    this.fontFamily = fontFamily
    this.faceCamera = faceCamera
    this.renderingScale = renderingScale
  }

  private iterate(x: Axis, y: Axis, callback: (
    axis: Axis,
    opposite: Axis,
    index: number,
    position: number,
    value: number | string
  ) => void): number {
    return [x, y].reduce((index, axis, axisIndex, axes) => {
      return axis.labels.reduce((index: number, value, position) => {
        callback(
          axis,
          axes[(axisIndex + 1) % axes.length],
          index,
          position,
          value
        )

        return index + 1
      }, index)
    }, 0)
  }

  private addLabel(): Label {
    const label = new Label()

    this.cssStyle.bind(label.style,
      'opacity',
      'color',
      'visibility',
      'white-space',
      'transform',
      'font-size',
      'font-family'
    )

    this.add(label)
    return label
  }

  private scaleFont(): void {
    this.cssStyle.set('font-size', `${this.fontSize * this.renderingScale}px`)
  }

  public get opacity(): number {
    return parseFloat(this.cssStyle.get('opacity'))
  }

  public set opacity(opacity: number) {
    this.cssStyle.set('opacity', opacity as unknown as string)
  }

  public get color(): string {
    return this.cssStyle.get('color')
  }

  public set color(color: string) {
    this.cssStyle.set('color', color)
  }

  public get fontFamily(): string {
    return this.cssStyle.get('font-family')
  }

  public set fontFamily(fontFamily: string) {
    this.cssStyle.set('font-family', fontFamily)
  }

  public get faceCamera(): boolean {
    return this._faceCamera
  }

  public set faceCamera(faceCamera: boolean) {
    this._faceCamera = faceCamera
    faceCamera || this.children.forEach(label => label.rotation.set(0, 0, 0))
  }

  public get visible(): boolean {
    return this.cssStyle && this.cssStyle.get('visibility') !== 'hidden'
  }

  public set visible(visible: boolean) {
    this.cssStyle && this.cssStyle.set('visibility',
      visible ? 'visible' : 'hidden'
    )
  }

  public onBeforeRender = (_: WebGLRenderer, __: Scene, camera: Camera) => {
    camera.position.multiplyScalar(this.renderingScale)

    this.faceCamera && this.children.forEach(label => {
      label.lookAt(camera.position)
    })
  }

  public onAfterRender = (_: WebGLRenderer, __: Scene, camera: Camera) => {
    camera.position.divideScalar(this.renderingScale)
  }

  public generate(x: Axis, y: Axis): void {
    this.scaleFont()

    this.children
      .slice(this.iterate(x, y, (axis, opposite, index, position, value) => {
        const label = (this.children[index] as Label) || this.addLabel()
        label.generate(axis, value)
        label.resize(axis, opposite, position, this.renderingScale)
      }))
      .forEach(label => this.remove(label))
  }

  public resize(x: Axis, y: Axis): void {
    this.scaleFont()

    this.iterate(x, y, (axis, opposite, index, position) => {
      const label = this.children[index] as Label
      label && label.resize(axis, opposite, position, this.renderingScale)
    })
  }
}
