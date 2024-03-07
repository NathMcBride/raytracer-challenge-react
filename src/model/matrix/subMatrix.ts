import { Matrix, deepClone } from '..';
export const submatrix = (a: Matrix, row: number, column: number): Matrix => {
  const b = deepClone(a);
  b.splice(row, 1);
  b.map(row => {
    row.splice(column, 1);
    return row;
  });
  return b;
};
