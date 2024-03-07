import { plane, normalAt, point, vector, ray, intersectPlane } from '..';

describe('plane', () => {
  describe('normal', () => {
    it('has a constant value', () => {
      const p = plane();

      const n1 = normalAt(p, point(0, 0, 0));
      const n2 = normalAt(p, point(10, 0, -10));
      const n3 = normalAt(p, point(-5, 0, 150));

      expect(n1).toApproxEqualTuple(vector(0, 1, 0));
      expect(n2).toApproxEqualTuple(vector(0, 1, 0));
      expect(n3).toApproxEqualTuple(vector(0, 1, 0));
    });
  });

  describe('intersect', () => {
    it('intersects with a ray parallel to the plane', () => {
      const p = plane();
      const r = ray(point(0, 10, 0), vector(0, 0, 1));

      const xs = intersectPlane(p, r);

      expect(xs).toBeEmpty();
    });

    it('intersects with a coplanar ray', () => {
      const p = plane();
      const r = ray(point(0, 0, 0), vector(0, 0, 1));

      const xs = intersectPlane(p, r);

      expect(xs).toBeEmpty();
    });

    it('ray intersecting plane from above', () => {
      const p = plane();
      const r = ray(point(0, 1, 0), vector(0, -1, 0));

      const xs = intersectPlane(p, r);

      expect(xs.length).toEqual(1);
      expect(xs[0].t).toEqual(1);
      expect(xs[0].object).toEqual(p);
    });

    it('ray intersecting plane from below', () => {
      const p = plane();
      const r = ray(point(0, -1, 0), vector(0, 1, 0));

      const xs = intersectPlane(p, r);

      expect(xs.length).toEqual(1);
      expect(xs[0].t).toEqual(1);
      expect(xs[0].object).toEqual(p);
    });
  });
});
