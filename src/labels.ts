import { Object3D, Camera, Scene, Matrix4 } from 'three'
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer'
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
  private readonly css3DRenderer = new CSS3DRenderer()
  private readonly originalMatrix = new Matrix4()
  private _faceCamera!: boolean
  public readonly style = this.css3DRenderer.domElement.style
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
    this.matrixAutoUpdate = false

    this.style.position = 'absolute'
    this.style.pointerEvents = 'none'
    this.style.top =
    this.style.left = '0'
    this.style.zIndex = '2'

    document.body.appendChild(this.css3DRenderer.domElement)
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

  private scaleFont(): void {
    this.style.fontSize = `${this.fontSize * this.renderingScale}px`
  }

  public get opacity(): number {
    return parseFloat(this.style.opacity!)
  }

  public set opacity(opacity: number) {
    this.style.opacity = opacity as unknown as string
  }

  public get color(): string {
    return this.style.color!
  }

  public set color(color: string) {
    this.style.color = color
  }

  public get fontFamily(): string {
    return this.style.fontFamily!
  }

  public set fontFamily(fontFamily: string) {
    this.style.fontFamily = fontFamily
  }

  public get faceCamera(): boolean {
    return this._faceCamera
  }

  public set faceCamera(faceCamera: boolean) {
    this._faceCamera = faceCamera
    faceCamera || this.children.forEach(label => label.rotation.set(0, 0, 0))
  }

  public get visible(): boolean {
    return this.style ? this.style.display !== 'none' : true
  }

  public set visible(visible: boolean) {
    if (this.style) this.style.visibility = visible ? null : 'none'
  }

  public setRendererSize(width: number, height: number): void {
    this.css3DRenderer.setSize(width, height)
  }

  public render(camera: Camera): void {
    const parent = this.parent
    const xCamera = camera.position.x
    const yCamera = camera.position.y
    const zCamera = camera.position.z

    this.originalMatrix.copy(this.matrix)
    this.parent = null

    camera.position.multiplyScalar(this.renderingScale)

    this.updateWorldMatrix(true, false)
    parent!.updateWorldMatrix(true, false)
    this.applyMatrix(parent!.matrixWorld)
    this.updateWorldMatrix(false, false)

    this.faceCamera && this.children.forEach(label => {
      label.lookAt(camera.position)
    })

    this.position.multiplyScalar(this.renderingScale)
    this.updateMatrix()
    this.updateMatrixWorld(true)

    this.css3DRenderer.render(this as unknown as Scene, camera)

    camera.position.set(xCamera, yCamera, zCamera)

    this.parent = parent
    this.matrix.copy(this.originalMatrix)
    this.matrix.decompose(this.position, this.quaternion, this.scale)
  }

  public generate(x: Axis, y: Axis): void {
    this.scaleFont()

    this.children
      .slice(this.iterate(x, y, (axis, opposite, index, position, value) => {
        let label = this.children[index] as Label
        label || this.add(label = new Label())
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
