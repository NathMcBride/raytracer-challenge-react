import { sphere, intersect, setTransform, normalAt } from './model/sphere';
import { ray } from './model/ray';
import { vector, point, normalize } from './model';
import {
  identity,
  scaling,
  translation,
  matrixTransform
} from './model/transformation';
import { material } from './model/material';

describe('sphere', () => {
  describe('intersection', () => {
    it('intersects a ray at two points', () => {
      const r = ray(point(0, 0, -5), vector(0, 0, 1));
      const s = sphere();

      const xs = intersect(s, r);

      expect(xs.length).toEqual(2);
      expect(xs[0].t).toEqual(4.0);
      expect(xs[1].t).toEqual(6.0);
    });

    it('intersects a ray at a tangent', () => {
      const r = ray(point(0, 1, -5), vector(0, 0, 1));
      const s = sphere();

      const xs = intersect(s, r);

      expect(xs.length).toEqual(2);
      expect(xs[0].t).toEqual(5.0);
      expect(xs[1].t).toEqual(5.0);
    });

    it('misses a sphere', () => {
      const r = ray(point(0, 2, -5), vector(0, 0, 1));
      const s = sphere();

      const xs = intersect(s, r);

      expect(xs.length).toEqual(0);
    });

    it('ray originates inside a sphere', () => {
      const r = ray(point(0, 0, 0), vector(0, 0, 1));
      const s = sphere();

      const xs = intersect(s, r);

      expect(xs.length).toEqual(2);
      expect(xs[0].t).toEqual(-1.0);
      expect(xs[1].t).toEqual(1.0);
    });

    it('sphere is behind a ray', () => {
      const r = ray(point(0, 0, 5), vector(0, 0, 1));
      const s = sphere();

      const xs = intersect(s, r);

      expect(xs.length).toEqual(2);
      expect(xs[0].t).toEqual(-6.0);
      expect(xs[1].t).toEqual(-4.0);
    });

    it('sets the object on the intersection', () => {
      const r = ray(point(0, 0, 5), vector(0, 0, 1));
      const s = sphere();

      const xs = intersect(s, r);

      expect(xs.length).toEqual(2);
      expect(xs[0].object).toEqual(s);
      expect(xs[1].object).toEqual(s);
    });

    it('intersects a scaled sphere with a ray', () => {
      const r = ray(point(0, 0, -5), vector(0, 0, 1));
      const s = sphere();
      setTransform(s, scaling(2, 2, 2));

      const xs = intersect(s, r);
      expect(xs.length).toEqual(2);
      expect(xs[0].t).toEqual(3);
      expect(xs[1].t).toEqual(7);
    });

    it('intersects a translated sphere with a ray', () => {
      const r = ray(point(0, 0, -5), vector(0, 0, 1));
      const s = sphere();
      setTransform(s, translation(5, 0, 0));

      const xs = intersect(s, r);
      expect(xs.length).toEqual(0);
    });
  });

  describe('transformation', () => {
    it('has a default transformation', () => {
      const s = sphere();

      const m = identity();
      expect(s.transform).approxEqualM(m);
    });

    it('can change the transformation', () => {
      const s = sphere();
      const t = translation(2, 3, 4);

      setTransform(s, t);

      expect(s.transform).approxEqualM(t);
    });
  });

  describe('normal', () => {
    it('calculates the normal on a sphere at point on x axis', () => {
      const s = sphere();
      const n = normalAt(s, point(1, 0, 0));

      expect(n).approxEqual(vector(1, 0, 0));
    });

    it('calculates the normal on a sphere at point on y axis', () => {
      const s = sphere();
      const n = normalAt(s, point(0, 1, 0));

      expect(n).approxEqual(vector(0, 1, 0));
    });

    it('calculates the normal on a sphere at point on z axis', () => {
      const s = sphere();
      const n = normalAt(s, point(0, 0, 1));

      expect(n).approxEqual(vector(0, 0, 1));
    });

    it('calculates the normal on a sphere at non-axial point', () => {
      const s = sphere();
      const p = Math.sqrt(3) / 3;
      const n = normalAt(s, point(p, p, p));

      expect(n).approxEqual(vector(p, p, p));
    });

    it('calculates the normal as a normalized vector', () => {
      const s = sphere();
      const p = Math.sqrt(3) / 3;
      const n = normalAt(s, point(p, p, p));

      expect(n).approxEqual(normalize(n));
    });

    it('calculates the normal of a translated sphere', () => {
      const s = sphere();
      setTransform(s, translation(0, 1, 0));
      const n = normalAt(s, point(0, 1.70711, -0.70711));

      expect(n).approxEqual(vector(0, 0.70711, -0.70711));
    });

    it('calculates the normal of a transformed sphere', () => {
      const s = sphere();
      const m = matrixTransform()
        .rotationZ(Math.PI / 5)
        .scaling(1, 0.5, 1)
        .m();
      setTransform(s, m);
      const n = normalAt(s, point(0, Math.SQRT2 / 2, -Math.SQRT2 / 2));

      expect(n).approxEqual(vector(0, 0.97014, -0.24254));
    });
  });

  describe('material', () => {
    it('has a default material', () => {
      const s = sphere();
      const m = material();

      expect(s.material).toEqual(m);
    });

    it('can be assigned a material', () => {
      const s = sphere();
      const m = material();
      m.ambient = 1;
      s.material = m;

      expect(s.material).toEqual(m);
    });
  });
});
