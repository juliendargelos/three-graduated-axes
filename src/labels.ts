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
  color: string
  opacity: number
  fontSize: number
  fontFamily: string
  faceCamera: boolean
}

export class Labels extends Object3D implements LabelsParameters {
  private readonly cssStyle = new CSSStyle().set('white-space', 'nowrap')
  private _faceCamera!: boolean

  public constructor({
    opacity = 1,
    color = '#aaaaaa',
    fontSize = 0.1,
    fontFamily = 'sans-serif',
    faceCamera = false
  }: Partial<LabelsParameters> = {}) {
    super()

    this.opacity = opacity
    this.color = color
    this.fontSize = fontSize
    this.fontFamily = fontFamily
    this.faceCamera = faceCamera
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

  public get fontSize(): number {
    return Math.sqrt(parseFloat(this.cssStyle.get('font-size')) / 2)
  }

  public set fontSize(fontSize: number) {
    this.cssStyle
      .set('font-size', `${fontSize * fontSize * 2}px`)
      .set('transform', `scale(${Math.sqrt(fontSize) / 10})`)
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

  public generate(x: Axis, y: Axis): void {
    this.children
      .slice(this.iterate(x, y, (axis, opposite, index, position, value) => {
        const label = (this.children[index] as Label) || this.addLabel()
        label.generate(axis, value)
        label.resize(axis, opposite, position)
      }))
      .forEach(label => this.remove(label))
  }

  public resize(x: Axis, y: Axis): void {
    this.iterate(x, y, (axis, opposite, index, position) => {
      const label = this.children[index] as Label
      label && label.resize(axis, opposite, position)
    })
  }

  public onBeforeRender = (_: WebGLRenderer, __: Scene, camera: Camera) => {
    this.faceCamera && this.children.forEach(label => {
      label.lookAt(camera.position)
    })
  }
}
