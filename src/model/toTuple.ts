import { Matrix, Tuple, tuple } from '.';
export const toTuple = (m: Matrix, b?: number): Tuple =>
  tuple(m[0][0], m[1][0], m[2][0], m[3][0]);
