import { Matrix, multiplyByTuple, Point, Vector, add, multiply } from '..';

export type Ray = {
  origin: Point;
  direction: Vector;
};
export const ray = (origin: Point, direction: Vector): Ray => ({
  origin,
  direction
});

export const position = (ray: Ray, t: number): Point =>
  add(ray.origin, multiply(ray.direction, t));

export const transform = (ray: Ray, m: Matrix): Ray => ({
  origin: multiplyByTuple(m, ray.origin),
  direction: multiplyByTuple(m, ray.direction)
});
