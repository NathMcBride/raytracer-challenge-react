import { Matrix, matrix, isInvertible, determinate, cofactor } from '..';
export function inverse(a: Matrix): Matrix {
  if (!isInvertible(a)) {
    //maybe return null?
    throw new Error('Matrix not invertible');
  }

  const d = determinate(a);
  const m = matrix(a.length, a[0].length);

  for (let row = 0; row < a.length; row++) {
    for (let col = 0; col < a[row].length; col++) {
      const c = cofactor(a, row, col);
      m[col][row] = c / d;
    }
  }

  return m;
}
