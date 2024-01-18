import { Vector, subtract, multiply, dot } from '.';

export const reflect = (a: Vector, normal: Vector): Vector =>
  subtract(a, multiply(multiply(normal, 2), dot(a, normal)));
