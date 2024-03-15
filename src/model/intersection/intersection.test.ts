import {
  intersection,
  intersections,
  Intersection,
  hit,
  sphere,
  ray,
  point,
  vector,
  prepareComputations,
  translation,
  EPSILON,
  plane,
  glassSphere,
  scaling,
  uuidv4,
  schlick
} from '..';

describe('intersection', () => {
  it('an intersection encapsulates a t and an object', () => {
    const s = sphere();
    const i = intersection(3.5, s);

    expect(i.t).toEqual(3.5);
    expect(i.object).toEqual(s);
  });

  it('aggregates intersections', () => {
    const s = sphere();
    const i1 = intersection(1, s);
    const i2 = intersection(2, s);

    const xs = intersections(i1, i2);
    expect(xs.length).toEqual(2);
    expect(xs[0].t).toEqual(1);
    expect(xs[1].t).toEqual(2);
  });

  describe('hit', () => {
    it('when all intersections have a positive t', () => {
      const s = sphere();
      const i1 = intersection(1, s);
      const i2 = intersection(2, s);

      const xs = intersections(i2, i1);

      expect(hit(xs)).toEqual(i1);
    });

    it('when some intersections have a negative t', () => {
      const s = sphere();
      const i1 = intersection(-1, s);
      const i2 = intersection(2, s);

      const xs = intersections(i2, i1);

      expect(hit(xs)).toEqual(i2);
    });

    it('when all intersections have a negative t', () => {
      const s = sphere();
      const i1 = intersection(-2, s);
      const i2 = intersection(-1, s);

      const xs = intersections(i2, i1);

      expect(hit(xs)).toBeNull();
    });

    it('hit is always the lowest non negative intersection', () => {
      const s = sphere();
      const i1 = intersection(5, s);
      const i2 = intersection(7, s);
      const i3 = intersection(-3, s);
      const i4 = intersection(2, s);

      const xs = intersections(i1, i2, i3, i4);

      expect(hit(xs)).toEqual(i4);
    });
  });

  describe('precomputing the state of an intersection', () => {
    it('returns the expected values', () => {
      const theRay = ray(point(0, 0, -5), vector(0, 0, 1));
      const shape = sphere();
      const theIntersection = intersection(4, shape);

      const comps = prepareComputations(theIntersection, theRay);

      expect(comps.t).toEqual(theIntersection.t);
      expect(comps.object).toEqual(shape);
      expect(comps.point).toEqual(point(0, 0, -1));
      expect(comps.eyev).toEqual(vector(0, 0, -1));
      expect(comps.normalv).toEqual(vector(0, 0, -1));
    });

    it('sets inside as false, when an intersection occurs on the outside', () => {
      const theRay = ray(point(0, 0, -5), vector(0, 0, 1));
      const shape = sphere();
      const theIntersection = intersection(4, shape);

      const comps = prepareComputations(theIntersection, theRay);

      expect(comps.inside).toBeFalse();
    });

    it('sets inside as true, when an intersection occurs on the inside', () => {
      const theRay = ray(point(0, 0, 0), vector(0, 0, 1));
      const shape = sphere();
      const theIntersection = intersection(1, shape);

      const comps = prepareComputations(theIntersection, theRay);

      expect(comps.point).toEqual(point(0, 0, 1));
      expect(comps.eyev).toEqual(vector(0, 0, -1));
      expect(comps.normalv).toEqual(vector(0, 0, -1));
      expect(comps.inside).toBeTrue();
    });

    it('offsets the over-point', () => {
      const theRay = ray(point(0, 0, -5), vector(0, 0, 1));
      const shape = sphere();
      shape.transform = translation(0, 0, 1);

      const theIntersection = intersection(5, shape);
      const comps = prepareComputations(theIntersection, theRay);

      expect(comps.overPoint.z).toBeLessThan(-EPSILON / 2);
      expect(comps.point.z).toBeGreaterThan(comps.overPoint.z);
    });

    it('offsets the under-point', () => {
      const theRay = ray(point(0, 0, -5), vector(0, 0, 1));
      const shape = glassSphere();
      shape.transform = translation(0, 0, 1);

      const theIntersection = intersection(5, shape);
      const xs = intersections(theIntersection);
      const comps = prepareComputations(theIntersection, theRay, xs);

      expect(comps.underPoint.z).toBeGreaterThan(EPSILON / 2);
      expect(comps.point.z).toBeLessThan(comps.underPoint.z);
    });
  });

  describe('reflection', () => {
    it('pre-computes the reflection vector', () => {
      const shape = plane();
      const r = ray(
        point(0, 1, -1),
        vector(0, -Math.sqrt(2) / 2, Math.sqrt(2) / 2)
      );
      const i = intersection(Math.sqrt(2), shape);
      const comps = prepareComputations(i, r);

      expect(comps.reflectv).toApproxEqualTuple(
        vector(0, Math.sqrt(2) / 2, Math.sqrt(2) / 2)
      );
    });
  });

  describe('refraction', () => {
    const a = glassSphere();
    const b = glassSphere();
    const c = glassSphere();
    const r = ray(point(0, 0, -4), vector(0, 0, 1));
    let xs: Array<Intersection> = [];

    beforeAll(() => {
      a.transform = scaling(2, 2, 2);
      a.material.refractiveIndex = 1.5;

      b.transform = translation(0, 0, -0.25);
      b.material.refractiveIndex = 2.0;

      c.transform = translation(0, 0, 0.25);
      c.material.refractiveIndex = 2.5;

      xs = intersections(
        { uuid: uuidv4(), t: 2, object: a },
        { uuid: uuidv4(), t: 2.75, object: b },
        { uuid: uuidv4(), t: 3.25, object: c },
        { uuid: uuidv4(), t: 4.75, object: b },
        { uuid: uuidv4(), t: 5.25, object: c },
        { uuid: uuidv4(), t: 6, object: a }
      );
    });

    describe.each([
      { index: 0, n1: 1.0, n2: 1.5 },
      { index: 1, n1: 1.5, n2: 2.0 },
      { index: 2, n1: 2.0, n2: 2.5 },
      { index: 3, n1: 2.5, n2: 2.5 },
      { index: 4, n1: 2.5, n2: 1.5 },
      { index: 5, n1: 1.5, n2: 1.0 }
    ])('finding n1 and n2 at intersections', ({ index, n1, n2 }) => {
      it('calculates the expected refraction indices', () => {
        const comps = prepareComputations(xs[index], r, xs);
        expect(comps.n1).toApproxEqualNumber(n1);
        expect(comps.n2).toApproxEqualNumber(n2);
      });
    });
  });

  describe('Schlick', () => {
    it('calculates the reflectance under total internal reflection', () => {
      const shape = glassSphere();
      const r = ray(point(0, 0, Math.sqrt(2) / 2), vector(0, 1, 0));
      const xs = intersections(
        {
          uuid: '1234',
          t: -Math.SQRT2 / 2,
          object: shape
        },
        { uuid: '12345', t: Math.SQRT2 / 2, object: shape }
      );
      const comps = prepareComputations(xs[1], r, xs);

      const reflectance = schlick(comps);
      expect(reflectance).toEqual(1.0);
    });

    it('calculates the reflectance with a perpendicular viewing angle', () => {
      const shape = glassSphere();
      const r = ray(point(0, 0, 0), vector(0, 1, 0));
      const xs = intersections(
        { uuid: '1234', t: -1, object: shape },
        { uuid: '12345', t: 1, object: shape }
      );
      const comps = prepareComputations(xs[1], r, xs);

      const reflectance = schlick(comps);
      expect(reflectance).toApproxEqualNumber(0.04);
    });

    it('calculates the reflectance with a small angle and n2 > n1', () => {
      const shape = glassSphere();
      const r = ray(point(0, 0.99, -2), vector(0, 0, 1));
      const xs = intersections({ uuid: '1234', t: 1.8589, object: shape });
      const comps = prepareComputations(xs[0], r, xs);

      const reflectance = schlick(comps);
      expect(reflectance).toApproxEqualNumber(0.48873);
    });
  });
});
