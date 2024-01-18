import { Matrix, determinate } from '.';
export const isInvertible = (a: Matrix, b?: number): boolean =>
  determinate(a) !== 0;
