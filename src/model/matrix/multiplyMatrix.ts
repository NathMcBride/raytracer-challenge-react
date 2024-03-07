import { Matrix, matrix } from '..';
export const multiplyMatrix = (a: Matrix, b: Matrix): Matrix => {
  const m = matrix(a.length, a[0].length);

  for (let row = 0; row < a.length; row++) {
    for (let col = 0; col < b[0].length; col++) {
      let product = 0;
      for (let i = 0; i < a[0].length; i++) {
        product += a[row][i] * b[i][col];
      }
      m[row][col] = product;
    }
  }
  return m;
};
