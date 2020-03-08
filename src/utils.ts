export function floorRelative(
  value: number,
  decimals: number | undefined = 0
): number {
  if (decimals === undefined) return value
  const factor = Math.pow(10, decimals)
  return value > 0
    ? Math.floor(value * factor) / factor
    : Math.ceil(value * factor) / factor
}

export function ceilRelative(
  value: number,
  decimals: number | undefined = 0
): number {
  return -floorRelative(-value, decimals)
}

export function roundStep(
  value: number,
  decimals: number,
  divider: number,
  direction: 1 | -1 = 1
): number {
  const step = 1 / Math.pow(divider, decimals)
  let roundedValue: number

  if (direction > 0) {
    roundedValue = Math.floor(value)
    while (roundedValue < value) roundedValue += step
  } else {
    roundedValue = Math.ceil(value)
    while (roundedValue > value) roundedValue -= step
  }

  return roundedValue
}

export function smallerDividerOf(value: number, maximum: number = 10): number {
  for (var divider = 2; divider < maximum; divider++) {
    if (!(value % divider)) return divider
  }

  return 0
}
