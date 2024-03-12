export const MAX_RGB = 255;
export const MIN_RGB = 0;
export function max(a: number) {
  return a > 255 ? 255 : a;
}
export function min(a: number) {
  return a < 0 ? 0 : a;
}
