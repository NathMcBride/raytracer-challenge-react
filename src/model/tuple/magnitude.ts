import { Tuple } from '..';

export const magnitude = (a: Tuple, b?: number): number =>
  Math.sqrt(a.x ** 2 + a.y ** 2 + a.z ** 2 + a.w ** 2);
