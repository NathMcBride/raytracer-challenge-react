import { Matrix, Tuple, matrix } from '.';
export const toMatrix = (a: Tuple, b?: number): Matrix => {
  const m = matrix(4, 1);
  m[0][0] = a.x;
  m[1][0] = a.y;
  m[2][0] = a.z;
  m[3][0] = a.w;
  return m;
};
