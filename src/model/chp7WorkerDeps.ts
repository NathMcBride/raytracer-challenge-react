import * as deps from '.';
//Can not use comments in the deps array below
//it will break the code generation in isoworker
export const chp7WorkerDeps = () => [
  deps.identity,
  deps.rotationZ,
  deps.rotationY,
  deps.rotationX,
  deps.determinate,
  deps.addColor,
  deps.transpose,
  deps.add,
  deps.multiply,
  deps.canvas,
  deps.bufferedCanvas,
  deps.hadmardProduct,
  deps.subtractColor,
  deps.multiplyByColor,
  deps.reflect,
  deps.tuple,
  deps.toTuple,
  deps.toMatrix,
  deps.multiplyMatrix,
  deps.subtract,
  deps.plane,
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
  deps.inverse,
  deps.multiplyByTuple,
  deps.transform,
  deps.isVector,
  deps.dot,
  deps.intersectSphere,
  deps.intersectPlane,
  deps.intersect,
  deps.hit,
  deps.position,
  deps.switchUnionValue,
  deps.normalAt,
  deps.vector,
  deps.identityVector,
  deps.negate,
  deps.isEven,
  deps.stripePattern,
  deps.stripeAt,
  deps.gradientPattern,
  deps.gradientAt,
  deps.ringPattern,
  deps.ringAt,
  deps.checkerPattern,
  deps.checkerAt,
  deps.ringGradientPattern,
  deps.ringGradientAt,
  deps.patternAtShape,
  deps.patternAtPoint,
  deps.radialGlowPattern,
  deps.smoothStep,
  deps.clamp,
  deps.radialGlowAtPoint,
  deps.matchPattern,
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
