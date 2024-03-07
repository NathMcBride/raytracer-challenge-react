import { Matrix } from '..';
import { Tuple, tuple } from '..';
export function toTuple(m: Matrix): Tuple {
  return tuple(m[0][0], m[1][0], m[2][0], m[3][0]);
}
