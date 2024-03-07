import { Matrix, matrix } from '..';

export function transpose(a: Matrix): Matrix {
  const m = matrix(a.length, a[0].length);

  for (let row = 0; row < a.length; row++) {
    for (let col = 0; col < a[row].length; col++) {
      m[col][row] = a[row][col];
    }
  }
  return m;
}
