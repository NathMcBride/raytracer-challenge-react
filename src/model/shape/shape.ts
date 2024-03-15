import { Point, Matrix, Material } from '..';

export type Identity = {
  kind: 'identity';
  uuid: string;
  origin: Point;
  transform: Matrix;
  material: Material;
};

export type Sphere = { kind: 'sphere' } & Omit<Identity, 'kind'>;

export type Plane = { kind: 'plane' } & Omit<Identity, 'kind'>;

export type Shape = Identity | Sphere | Plane;
