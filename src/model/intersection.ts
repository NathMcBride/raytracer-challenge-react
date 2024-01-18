import { Matrix, Material } from '.';

export type Shape = {
  transform: Matrix;
  material: Material;
};
export type Intersection = { t: number; object: Shape };

export const intersection = (t: number, object: Shape): Intersection => ({
  t,
  object
});

export const intersections = (
  ...intersection: Intersection[]
): Array<Intersection> => {
  return [...intersection].sort((a, b) => a.t - b.t);
};

export const hit = (
  intersections: Array<Intersection>,
  b?: number
): Intersection | null => {
  const nonNegative = (intersection: Intersection) => intersection.t > 0;
  const filtered = intersections.filter(nonNegative);
  return filtered.length > 0 ? filtered[0] : null;
};
