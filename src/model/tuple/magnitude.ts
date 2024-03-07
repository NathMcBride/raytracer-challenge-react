import { Tuple } from '..';

export function magnitude(a: Tuple): number {
  return Math.sqrt(a.x ** 2 + a.y ** 2 + a.z ** 2 + a.w ** 2);
}
