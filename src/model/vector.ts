import { Vector } from '.';
export const vector = (x: number, y: number, z: number): Vector => ({
  x,
  y,
  z,
  w: 0.0
});
