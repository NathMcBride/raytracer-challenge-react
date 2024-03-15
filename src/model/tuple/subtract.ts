import { Point, Vector, Tuple } from '..';
export function subtract(a: Point, b: Vector): Point;
export function subtract(a: Point, b: Point): Vector;
export function subtract(a: Vector, b: Vector): Vector;
export function subtract(a: Vector, b: Tuple): Tuple;
export function subtract(a: Tuple, b: Tuple): Tuple {
  return {
    x: a.x - b.x,
    y: a.y - b.y,
    z: a.z - b.z,
    w: a.w - b.w
  };
}
