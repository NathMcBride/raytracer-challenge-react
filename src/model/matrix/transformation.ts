import { Matrix, matrix, multiplyMatrix } from '..';
import { Vector, cross, normalize, subtract, Point } from '..';

export const identity = () => {
  let identity = matrix(4, 4);
  identity = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ];
  return identity;
};

export const translation = (x: number, y: number, z: number): Matrix => {
  const m = identity();
  m[0][3] = x;
  m[1][3] = y;
  m[2][3] = z;

  return m;
};

export const scaling = (x: number, y: number, z: number): Matrix => {
  const m = identity();
  m[0][0] = x;
  m[1][1] = y;
  m[2][2] = z;

  return m;
};

export const rotationX = (radians: number): Matrix => {
  const m = identity();
  const cosr = Math.cos(radians);
  const sinr = Math.sin(radians);

  m[1][1] = cosr;
  m[1][2] = -sinr;
  m[2][1] = sinr;
  m[2][2] = cosr;

  return m;
};

export const rotationY = (radians: number): Matrix => {
  const m = identity();
  const cosr = Math.cos(radians);
  const sinr = Math.sin(radians);

  m[0][0] = cosr;
  m[0][2] = sinr;
  m[2][0] = -sinr;
  m[2][2] = cosr;

  return m;
};

export const rotationZ = (radians: number): Matrix => {
  const m = identity();
  const cosr = Math.cos(radians);
  const sinr = Math.sin(radians);

  m[0][0] = cosr;
  m[0][1] = -sinr;
  m[1][0] = sinr;
  m[1][1] = cosr;

  return m;
};

export const shearing = (
  xy: number,
  xz: number,
  yx: number,
  yz: number,
  zx: number,
  zy: number
): Matrix => {
  const m = identity();

  m[0][1] = xy;
  m[0][2] = xz;
  m[1][0] = yx;
  m[1][2] = yz;
  m[2][0] = zx;
  m[2][1] = zy;

  return m;
};

export const matrixTransform = () => {
  let m = identity();

  const t = {
    translation: (x: number, y: number, z: number) => {
      m = multiplyMatrix(translation(x, y, z), m);
      return t;
    },
    scaling: (x: number, y: number, z: number) => {
      m = multiplyMatrix(scaling(x, y, z), m);
      return t;
    },
    rotationX: (radians: number) => {
      m = multiplyMatrix(rotationX(radians), m);
      return t;
    },
    rotationY: (radians: number) => {
      m = multiplyMatrix(rotationY(radians), m);
      return t;
    },
    rotationZ: (radians: number) => {
      m = multiplyMatrix(rotationZ(radians), m);
      return t;
    },
    shearing: (
      xy: number,
      xz: number,
      yx: number,
      yz: number,
      zx: number,
      zy: number
    ) => {
      m = multiplyMatrix(shearing(xy, xz, yx, yz, zx, zy), m);
      return t;
    },
    m: () => m
  };
  return t;
};

export const viewTransform = (from: Point, to: Point, up: Vector): Matrix => {
  const forward = normalize(subtract(to, from));
  const upn = normalize(up);
  const left = cross(forward, upn);
  const trueUp = cross(left, forward);

  const orientation: Matrix = [
    [left.x, left.y, left.z, 0],
    [trueUp.x, trueUp.y, trueUp.z, 0],
    [-forward.x, -forward.y, -forward.z, 0],
    [0, 0, 0, 1]
  ];
  const trans = translation(-from.x, -from.y, -from.z);

  return multiplyMatrix(orientation, trans);
};
