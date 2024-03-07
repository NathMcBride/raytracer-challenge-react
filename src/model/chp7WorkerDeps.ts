import * as deps from '.';
//Can not use comments in the deps array below
//it will break the code generation in isoworker
export const chp7WorkerDeps = () => [
  deps.addColor,
  deps.transpose,
  deps.add,
  deps.multiply,
  deps.canvas,
  deps.bufferedCanvas,
  deps.hadmardProduct,
  deps.multiplyByColor,
  deps.reflect,
  deps.tuple,
  deps.toTuple,
  deps.toMatrix,
  deps.multiplyMatrix,
  deps.subtract,
  deps.sphere,
  deps.identity,
  deps.material,
  deps.sphereOrigin,
  deps.point,
  deps.matrix,
  deps.color,
  deps.pointLight,
  deps.magnitude,
  deps.normalize,
  deps.ray,
  deps.isInvertible,
  deps.deepClone,
  deps.submatrix,
  deps.minor,
  deps.cofactor,
  deps.determinate,
  deps.inverse,
  deps.multiplyByTuple,
  deps.transform,
  deps.isVector,
  deps.dot,
  deps.intersectSphere,
  deps.intersect,
  deps.hit,
  deps.position,
  deps.switchUnionValue,
  deps.normalAt,
  deps.vector,
  deps.identityVector,
  deps.negate,
  deps.lighting,
  deps.min,
  deps.max,
  deps.writePixelToBuffer,
  deps.round,
  deps.clampColor,
  deps.multiplyByScalar,
  deps.transformToPPMColor,
  deps.intersectWorld,
  deps.prepareComputations,
  deps.isShadowed,
  deps.shadeHit,
  deps.colorAt,
  deps.rayForPixel
];
