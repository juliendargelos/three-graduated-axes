import { Vector2 } from 'three'

export interface AxisParameters {
  size: number
  labels: (number | string)[]
  decimals?: number
  prefix: string
  suffix: string
  graduations: number
  root: boolean
  relative: boolean
  lineWidth: number
  progress: number
  margin: number
  padding: number
  distance: number
}

export interface AxisGenerateParameters {
  targetDensity: number
  minimumDelta: number
  rounding: number
  avoidPrime: boolean
  includeZero: boolean
  autoRelative: boolean
  symmetric: boolean
}

export class Axis implements AxisParameters {
  private _relative!: boolean
  private _labels!: (number | string)[]
  public orientation: Vector2
  public spacing: Vector2
  public size: number
  public decimals?: number
  public prefix: string
  public suffix: string
  public graduations: number
  public root: boolean
  public lineWidth: number
  public progress: number
  public margin: number
  public padding: number
  public distance: number
  public rootPosition!: number
  public startOffset: number = 0
  public endOffset: number = 0

  public constructor({
    orientation,
    spacing,
    size = 10,
    labels = [],
    prefix = '',
    suffix = '',
    decimals = undefined,
    graduations = 1,
    root = false,
    relative = false,
    lineWidth = 0.02,
    progress = 1,
    margin = 0.2,
    padding = 0,
    distance = 0
  }: Partial<AxisParameters> & {
    orientation: Vector2
    spacing: Vector2
  }) {
    this.orientation = orientation
    this.spacing = spacing
    this.size = size
    this._labels = labels
    this.prefix = prefix
    this.suffix = suffix
    this.decimals = decimals
    this.graduations = graduations
    this.root = root
    this.relative = relative
    this.lineWidth = lineWidth
    this.progress = progress
    this.margin = margin
    this.padding = padding
    this.distance = distance
  }

  private isPrime(number: number): boolean {
    for (var i = 2, s = Math.sqrt(number); i <= s; i++) {
      if (number % i === 0) return false
    }

    return number > 1
  }

  private updateRootPosition(): void {
    if (!this.relative) {
      this.rootPosition = 0
    } else if (!this.labels.length) {
      this.rootPosition = 0.5
    } else {
      const index = this.labels.findIndex(label => (
        parseFloat(label as string) === 0
      ))

      this.rootPosition = index === -1
        ? 0
        : index / (this.labels.length - 1)
    }
  }

  public get labels(): (number | string)[] {
    return this._labels
  }

  public set labels(labels: (number | string)[]) {
    this._labels = labels
    this.updateRootPosition()
  }

  public get relative(): boolean {
    return this._relative
  }

  public set relative(relative: boolean) {
    this._relative = relative
    this.updateRootPosition()
  }

  public generate(values: number[], {
    targetDensity = 4,
    minimumDelta = 1,
    rounding = 2,
    avoidPrime = true,
    includeZero = false,
    autoRelative = true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    symmetric = false // TODO
  }: Partial<AxisGenerateParameters> = {}): void {
    this.reset()

    const firstValue = values[0]

    let minimum = Infinity
    let maximum = -Infinity
    let delta = Infinity
    let startOffset = 0
    let endOffset = 0
    let round = (value: number): number => value

    values.forEach((value) => {
      if (value < minimum) minimum = value
      if (value > maximum) maximum = value
      const valueDelta = Math.abs(value - firstValue)
      if (valueDelta && valueDelta < delta) delta = valueDelta
    })

    if (autoRelative) this.relative = minimum < 0 && maximum > 0

    let range = maximum - minimum
    delta = Math.max(minimumDelta, delta)
    delta = delta * (range / delta / targetDensity)

    if (delta >= range / 2) delta = range / 2

    if (rounding) {
      const roundingFactor = Math.pow(10, rounding)
      round = (value: number) => Math.round(
        value * roundingFactor
      ) / roundingFactor

      delta = round(delta)

      const shiftedMinimum = Math.floor(
        minimum * roundingFactor
      ) / roundingFactor

      startOffset += minimum - shiftedMinimum

      minimum = shiftedMinimum
      range += startOffset
    }

    const amount = range / delta + 1
    let shiftedAmount = Math.ceil(amount)

    if (avoidPrime) {
      while (this.isPrime(shiftedAmount + 1)) shiftedAmount++
    }

    endOffset = (shiftedAmount - amount) * delta || 0
    maximum += endOffset
    range += endOffset

    if (includeZero || (autoRelative && this.relative)) {
      let relativeOffset = Infinity

      for (var i = 0; relativeOffset && i < shiftedAmount; i++) {
        const value = minimum + i * delta

        if (Math.abs(value) < Math.abs(relativeOffset)) {
          relativeOffset = value
        }
      }

      if (relativeOffset < 0) relativeOffset += delta

      minimum -= relativeOffset
      startOffset += relativeOffset
      range += relativeOffset
    }

    const labels: number[] = []

    for (var i = 0; i < shiftedAmount; i++) {
      labels.push(round(minimum + i * delta))
    }

    this.startOffset = startOffset / range
    this.endOffset = endOffset / range
    this.labels = labels
  }

  public reset(): void {
    this.startOffset = this.endOffset = 0
    this.labels.splice(0)
    this.root = false
    this.relative = false
  }
}
