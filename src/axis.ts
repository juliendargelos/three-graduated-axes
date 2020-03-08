import { Vector2 } from 'three'

import {
  floorRelative,
  ceilRelative,
  roundStep,
  smallerDividerOf
} from '~/utils'

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
  labels: number
  decimals: number
  labelsBasedDecimals: boolean
  root: boolean
  relative: boolean
  minimumOffset: number
  maximumOffset: number
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
  public minimumOffset: number = 0
  public maximumOffset: number = 0

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
    labels = 4,
    decimals = 2,
    labelsBasedDecimals = true,
    root = false,
    relative = true,
    minimumOffset = 0,
    maximumOffset = 0
  }: Partial<AxisGenerateParameters> = {}): void {
    this.reset()

    const minimum = Math.min(...values)
    const maximum = Math.max(...values)
    let shiftedMinimum = minimum - minimumOffset
    let shiftedMaximum = maximum - maximumOffset

    if (relative) {
      this.relative = shiftedMinimum < 0 && shiftedMaximum > 0
    }

    if (this.relative) {
      shiftedMinimum = Math.min(shiftedMinimum, -shiftedMaximum)
      shiftedMaximum = Math.max(-shiftedMinimum, shiftedMaximum)
      if (!(labels % 2)) labels++
    } else if (root) {
      shiftedMinimum = Math.min(0, shiftedMinimum)
      shiftedMaximum = Math.max(0, shiftedMaximum)
    }

    if (decimals !== undefined) {
      if (labelsBasedDecimals) {
        let divider: number = 0

        if (this.relative) {
          divider = 2
        } else {
          for (labels; !divider; labels++) {
            divider = smallerDividerOf(labels)
          }
        }

        shiftedMinimum = roundStep(shiftedMinimum, decimals, divider, -1)
        shiftedMaximum = roundStep(shiftedMaximum, decimals, divider, 1)
      } else {
        shiftedMinimum = floorRelative(shiftedMinimum, decimals)
        shiftedMaximum = ceilRelative(shiftedMaximum, decimals)
      }
    }

    const range = shiftedMaximum - shiftedMinimum

    this.labels = []

    for (var graduation = 0; graduation < labels; graduation++) {
      this.labels.push(ceilRelative(
        graduation / (labels - 1) * range + shiftedMinimum,
        decimals
      ))
    }

    this.minimumOffset = -(shiftedMinimum - minimum) / range
    this.maximumOffset = (shiftedMaximum - maximum) / range
  }

  public reset(): void {
    this.minimumOffset = this.maximumOffset = 0
    this.labels.splice(0)
    this.root = false
    this.relative = false
  }
}
