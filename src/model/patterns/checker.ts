import { Checker, Point, Color, isEven } from '..';
export const checkerAt = (checker: Checker, point: Point): Color =>
  isEven(Math.floor(point.x) + Math.floor(point.y) + Math.floor(point.z))
    ? checker.a
    : checker.b;
