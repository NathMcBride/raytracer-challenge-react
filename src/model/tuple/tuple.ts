import { magnitude, subtract, vector, identityVector } from '..';
export type Tuple = { x: number; y: number; z: number; w: number };
export type Point = Tuple & { w: 1.0 };
export type Vector = Tuple & { w: 0.0 };

export const isPoint = (a: Tuple): a is Point => a.w === 1.0;
export function isVector(a: Tuple): a is Vector {
  return a.w === 0.0;
}

export const tuple = (x: number, y: number, z: number, w: number): Tuple => ({
  x,
  y,
  z,
  w
});

export const point = (x: number, y: number, z: number): Point => ({
  x,
  y,
  z,
  w: 1.0
});

export function add(a: Point, b: Vector): Point;
export function add(a: Vector, b: Vector): Vector;
export function add(a: Tuple, b: Tuple): Tuple {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z, w: a.w + b.w };
}

export function negate(a: Vector): Vector;
export function negate(a: Tuple): Tuple;
export function negate(a: Tuple): Tuple {
  return subtract(identityVector(), a);
}

export function multiply(a: Point, scalar: number): Point;
export function multiply(a: Vector, scalar: number): Vector;
export function multiply(a: Tuple, scalar: number): Tuple;
export function multiply(a: Tuple, scalar: number): Tuple {
  return {
    x: a.x * scalar,
    y: a.y * scalar,
    z: a.z * scalar,
    w: a.w * scalar
  };
}

export const divide = (a: Tuple, scalar: number): Tuple => ({
  x: a.x / scalar,
  y: a.y / scalar,
  z: a.z / scalar,
  w: a.w / scalar
});

export function normalize(a: Vector): Vector;
export function normalize(a: Vector): Tuple {
  const m = magnitude(a);
  return { x: a.x / m, y: a.y / m, z: a.z / m, w: a.w / m };
}

export const dot = (a: Vector, b: Vector): number =>
  a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;

export const cross = (a: Vector, b: Vector): Vector =>
  vector(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
