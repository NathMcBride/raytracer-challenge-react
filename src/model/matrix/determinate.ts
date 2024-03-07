import { Matrix, cofactor } from '..';
export function determinate(a: Matrix): number {
  if (a.length === 2 && a[0].length === 2) {
    const ad = a[0][0] * a[1][1];
    const bc = a[0][1] * a[1][0];
    return ad - bc;
  }

  return a[0].reduce((pVal, cVal, idx) => pVal + cVal * cofactor(a, 0, idx), 0);
}
