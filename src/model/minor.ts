import { Matrix, determinate, submatrix } from '.';
export const minor = (a: Matrix, row: number, column: number): number =>
  determinate(submatrix(a, row, column));
