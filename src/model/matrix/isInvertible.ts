import { Matrix, determinate } from '..';
export function isInvertible(a: Matrix): boolean {
  return determinate(a) !== 0;
}
