import { Computation, dot } from '..';

export function schlick(computation: Computation): number {
  let cos = dot(computation.eyev, computation.normalv);
  if (computation.n1 > computation.n2) {
    const n = computation.n1 / computation.n2;
    const sin2t = Math.pow(n, 2) * (1.0 - Math.pow(cos, 2));
    if (sin2t > 1.0) return 1.0;

    const cost = Math.sqrt(1.0 - sin2t);
    cos = cost;
  }

  const r0 = Math.pow(
    (computation.n1 - computation.n2) / (computation.n1 + computation.n2),
    2
  );
  return r0 + (1 - r0) * Math.pow(1 - cos, 5);
}
