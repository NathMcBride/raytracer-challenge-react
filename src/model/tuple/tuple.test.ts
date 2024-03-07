import {
  Tuple,
  tuple,
  point,
  vector,
  identityVector,
  add,
  subtract,
  negate,
  multiply,
  divide,
  magnitude,
  normalize,
  dot,
  cross,
  isPoint,
  isVector,
  reflect
} from '..';

describe('tuple', () => {
  it('is a point when w = 1.0', () => {
    const a: Tuple = { x: 4.3, y: -4.2, z: 3.1, w: 1.0 };

    expect(a.x).toEqual(4.3);
    expect(a.y).toEqual(-4.2);
    expect(a.z).toEqual(3.1);
    expect(a.w).toEqual(1.0);

    expect(isVector(a)).toBeFalsy();
    expect(isPoint(a)).toBeTruthy();
  });

  it('is a vector when w = 0.0', () => {
    const a: Tuple = { x: 4.3, y: -4.2, z: 3.1, w: 0.0 };

    expect(a.x).toEqual(4.3);
    expect(a.y).toEqual(-4.2);
    expect(a.z).toEqual(3.1);
    expect(a.w).toEqual(0.0);

    expect(isPoint(a)).toBeFalsy();
    expect(isVector(a)).toBeTruthy();
  });

  it('tuple creates Tuple with expected values', () => {
    const a = tuple(4.3, -4.2, 3.1, 1.0);

    expect(a.x).toEqual(4.3);
    expect(a.y).toEqual(-4.2);
    expect(a.z).toEqual(3.1);
    expect(a.w).toEqual(1.0);
  });

  it('point creates Tuple with w = 1', () => {
    const a = point(4, -4, 3);
    const t: Tuple = { x: 4, y: -4, z: 3, w: 1 };

    expect(a).toEqual(t);
  });

  it('tuple creates Tuple with w = 0', () => {
    const a = vector(4, -4, 3);
    const t: Tuple = { x: 4, y: -4, z: 3, w: 0 };

    expect(a).toEqual(t);
  });

  describe('addition', () => {
    it('adds two tuples', () => {
      // const a: Tuple = { x: 3, y: -2, z: 5, w: 1.0 };
      // const b: Tuple = { x: -2, y: 3, z: 1, w: 0.0 };

      // expect(add(a, b)).toEqual({ x: 1, y: 1, z: 6, w: 1.0 });

      const a = point(3, -2, 5);
      const b = vector(-2, 3, 1);

      expect(add(a, b)).toEqual({ x: 1, y: 1, z: 6, w: 1.0 });
    });
  });

  describe('subtraction', () => {
    it('subtracts points', () => {
      const a = point(3, 2, 1);
      const b = point(5, 6, 7);

      expect(subtract(a, b)).toEqual(vector(-2, -4, -6));
    });

    it('subtracts a vector from a point', () => {
      const a = point(3, 2, 1);
      const b = vector(5, 6, 7);

      expect(subtract(a, b)).toEqual(point(-2, -4, -6));
    });

    it('subtracts two vectors', () => {
      const a = vector(3, 2, 1);
      const b = vector(5, 6, 7);

      expect(subtract(a, b)).toEqual(vector(-2, -4, -6));
    });
  });

  describe('negation', () => {
    it('subtracts from identity vector', () => {
      const a = vector(1, -2, 3);

      expect(subtract(identityVector(), a)).toEqual(vector(-1, 2, -3));
    });

    it('negates a tuple', () => {
      const a = tuple(1, -2, 3, -4);

      expect(negate(a)).toEqual(tuple(-1, 2, -3, 4));
    });
  });

  describe('Multiplying a tuple', () => {
    it('can be multiplied by a scalar', () => {
      const a = tuple(1, -2, 3, -4);

      expect(multiply(a, 3.5)).toEqual(tuple(3.5, -7, 10.5, -14));
    });

    it('can be multiplied by a fraction', () => {
      const a = tuple(1, -2, 3, -4);

      expect(multiply(a, 0.5)).toEqual(tuple(0.5, -1, 1.5, -2));
    });
  });

  describe('dividing a tuple', () => {
    it('can be divided by a scalar', () => {
      const a = tuple(1, -2, 3, -4);

      expect(divide(a, 2)).toEqual(tuple(0.5, -1, 1.5, -2));
    });
  });

  describe('magnitude', () => {
    it('computes the magnitude of vector(1, 0, 0)', () => {
      const a = vector(1, 0, 0);

      expect(magnitude(a)).toEqual(1);
    });

    it('computes the magnitude of vector(0, 1, 0)', () => {
      const a = vector(0, 1, 0);

      expect(magnitude(a)).toEqual(1);
    });

    it('computes the magnitude of vector(0, 0, 1)', () => {
      const a = vector(0, 0, 1);

      expect(magnitude(a)).toEqual(1);
    });

    it('computes the magnitude of vector(1, 2, 3)', () => {
      const a = vector(1, 2, 3);

      expect(magnitude(a)).toEqual(Math.sqrt(14));
    });

    it('computes the magnitude of vector(-1, -2, -3)', () => {
      const a = vector(-1, -2, -3);

      expect(magnitude(a)).toEqual(Math.sqrt(14));
    });
  });

  describe('normalize', () => {
    it('normalizes vector(4, 0, 0) as (1, 0, 0)', () => {
      const a = vector(4, 0, 0);
      expect(normalize(a)).toEqual(vector(1, 0, 0));
    });

    it('normalizes vector(1, 2, 3)', () => {
      const a = vector(1, 2, 3);
      expect(normalize(a)).toApproxEqualTuple(
        vector(0.26726, 0.53452, 0.80178)
      );
    });

    it('computes a magnitude of 1', () => {
      const a = vector(1, 2, 3);

      expect(magnitude(normalize(a))).toEqual(1);
    });
  });

  describe('dot product', () => {
    it('computes the dot product of two tuples', () => {
      const a = vector(1, 2, 3);
      const b = vector(2, 3, 4);

      expect(dot(a, b)).toEqual(20);
    });
  });

  describe('cross product', () => {
    it('computes cross product of two vectors', () => {
      const a = vector(1, 2, 3);
      const b = vector(2, 3, 4);

      expect(cross(a, b)).toEqual(vector(-1, 2, -1));
      expect(cross(b, a)).toEqual(vector(1, -2, 1));
    });
  });

  describe('reflection', () => {
    it('reflects a vector approaching at 45 degrees', () => {
      const v = vector(1, -1, 0);
      const n = vector(0, 1, 0);

      const r = reflect(v, n);

      expect(r).toApproxEqualTuple(vector(1, 1, 0));
    });

    it('reflects a vector off a slanted surface', () => {
      const v = vector(0, -1, 0);
      const n = vector(Math.SQRT2 / 2, Math.SQRT2 / 2, 0);

      const r = reflect(v, n);

      expect(r).toApproxEqualTuple(vector(1, 0, 0));
    });
  });
});
