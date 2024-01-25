import {
  translation,
  scaling,
  rotationX,
  rotationY,
  rotationZ,
  shearing,
  matrixTransform,
  point,
  vector,
  multiplyMatrix,
  multiplyByTuple,
  inverse,
  identity,
  Matrix,
  viewTransform
} from '.';

describe('transformation', () => {
  describe('translation', () => {
    it('multiplying by a translation matrix', () => {
      const transform = translation(5, -3, 2);
      const p = point(-3, 4, 5);

      expect(multiplyByTuple(transform, p)).toApproxEqualTuple(point(2, 1, 7));
    });

    it('multiplying by the inverse of a translation matrix', () => {
      const transform = translation(5, -3, 2);
      const inv = inverse(transform);
      const p = point(-3, 4, 5);

      expect(multiplyByTuple(inv, p)).toApproxEqualTuple(point(-8, 7, 3));
    });

    it('translation does not affect vectors', () => {
      const transform = translation(5, -3, 2);
      const v = vector(-3, 4, 5);

      expect(multiplyByTuple(transform, v)).toApproxEqualTuple(v);
    });
  });

  describe('scaling', () => {
    it('scales a point', () => {
      const transform = scaling(2, 3, 4);
      const p = point(-4, 6, 8);

      expect(multiplyByTuple(transform, p)).toApproxEqualTuple(
        point(-8, 18, 32)
      );
    });

    it('scales a vector', () => {
      const transform = scaling(2, 3, 4);
      const v = vector(-4, 6, 8);

      expect(multiplyByTuple(transform, v)).toApproxEqualTuple(
        vector(-8, 18, 32)
      );
    });

    it('multiplying by the inverse of a scaling matrix', () => {
      const transform = scaling(2, 3, 4);
      const inv = inverse(transform);
      const v = vector(-4, 6, 8);

      expect(multiplyByTuple(inv, v)).toApproxEqualTuple(vector(-2, 2, 2));
    });

    it('reflects by scaling by a negative value', () => {
      const transform = scaling(-1, 1, 1);
      const p = point(2, 3, 4);

      expect(multiplyByTuple(transform, p)).toApproxEqualTuple(point(-2, 3, 4));
    });
  });

  describe('rotation', () => {
    it('rotates a point around the X axis', () => {
      const p = point(0, 1, 0);
      const halfQuarter = rotationX(Math.PI / 4);
      const fullQuarter = rotationX(Math.PI / 2);

      expect(multiplyByTuple(halfQuarter, p)).toApproxEqualTuple(
        point(0, Math.SQRT2 / 2, Math.SQRT2 / 2)
      );
      expect(multiplyByTuple(fullQuarter, p)).toApproxEqualTuple(
        point(0, 0, 1)
      );
    });

    it('rotates in the opposite direction for an inverse X rotation', () => {
      const p = point(0, 1, 0);
      const halfQuarter = rotationX(Math.PI / 4);
      const inv = inverse(halfQuarter);

      expect(multiplyByTuple(inv, p)).toApproxEqualTuple(
        point(0, Math.SQRT2 / 2, -Math.SQRT2 / 2)
      );
    });

    it('rotates a point around the Y axis', () => {
      const p = point(0, 0, 1);
      const halfQuarter = rotationY(Math.PI / 4);
      const fullQuarter = rotationY(Math.PI / 2);

      expect(multiplyByTuple(halfQuarter, p)).toApproxEqualTuple(
        point(Math.SQRT2 / 2, 0, Math.SQRT2 / 2)
      );
      expect(multiplyByTuple(fullQuarter, p)).toApproxEqualTuple(
        point(1, 0, 0)
      );
    });

    it('rotates a point around the Z axis', () => {
      const p = point(0, 1, 0);
      const halfQuarter = rotationZ(Math.PI / 4);
      const fullQuarter = rotationZ(Math.PI / 2);

      expect(multiplyByTuple(halfQuarter, p)).toApproxEqualTuple(
        point(-Math.SQRT2 / 2, Math.SQRT2 / 2, 0)
      );
      expect(multiplyByTuple(fullQuarter, p)).toApproxEqualTuple(
        point(-1, 0, 0)
      );
    });
  });

  describe('shearing', () => {
    it('moves X in proportion to Y', () => {
      const transform = shearing(1, 0, 0, 0, 0, 0);
      const p = point(2, 3, 4);

      expect(multiplyByTuple(transform, p)).toApproxEqualTuple(point(5, 3, 4));
    });

    it('moves X in proportion to Z', () => {
      const transform = shearing(0, 1, 0, 0, 0, 0);
      const p = point(2, 3, 4);

      expect(multiplyByTuple(transform, p)).toApproxEqualTuple(point(6, 3, 4));
    });

    it('moves Y in proportion to X', () => {
      const transform = shearing(0, 0, 1, 0, 0, 0);
      const p = point(2, 3, 4);

      expect(multiplyByTuple(transform, p)).toApproxEqualTuple(point(2, 5, 4));
    });

    it('moves Y in proportion to Z', () => {
      const transform = shearing(0, 0, 0, 1, 0, 0);
      const p = point(2, 3, 4);

      expect(multiplyByTuple(transform, p)).toApproxEqualTuple(point(2, 7, 4));
    });

    it('moves Z in proportion to X', () => {
      const transform = shearing(0, 0, 0, 0, 1, 0);
      const p = point(2, 3, 4);

      expect(multiplyByTuple(transform, p)).toApproxEqualTuple(point(2, 3, 6));
    });

    it('moves Z in proportion to Y', () => {
      const transform = shearing(0, 0, 0, 0, 0, 1);
      const p = point(2, 3, 4);

      expect(multiplyByTuple(transform, p)).toApproxEqualTuple(point(2, 3, 7));
    });
  });

  it('applies individual transforms in sequence', () => {
    const p = point(1, 0, 1);
    const a = rotationX(Math.PI / 2);
    const b = scaling(5, 5, 5);
    const c = translation(10, 5, 7);

    const p2 = multiplyByTuple(a, p);
    expect(p2).toApproxEqualTuple(point(1, -1, 0));

    const p3 = multiplyByTuple(b, p2);
    expect(p3).toApproxEqualTuple(point(5, -5, 0));

    const p4 = multiplyByTuple(c, p3);
    expect(p4).toApproxEqualTuple(point(15, 0, 7));
  });

  it('applies chained transformation in reverse order', () => {
    const p = point(1, 0, 1);
    const a = rotationX(Math.PI / 2);
    const b = scaling(5, 5, 5);
    const c = translation(10, 5, 7);

    const t = multiplyMatrix(multiplyMatrix(c, b), a);

    expect(multiplyByTuple(t, p)).toApproxEqualTuple(point(15, 0, 7));
  });

  it('applies chained transformation in reverse order', () => {
    const p = point(1, 0, 1);
    const t = matrixTransform()
      .rotationX(Math.PI / 2)
      .scaling(5, 5, 5)
      .translation(10, 5, 7)
      .m();

    expect(multiplyByTuple(t, p)).toApproxEqualTuple(point(15, 0, 7));
  });

  describe('view transformation', () => {
    it('returns the identity matrix default orientation', () => {
      const from = point(0, 0, 0);
      const to = point(0, 0, -1);
      const up = vector(0, 1, 0);

      const transform = viewTransform(from, to, up);

      expect(transform).toApproxEqualMatrix(identity());
    });

    it('returns a matrix looking in the positive z direction', () => {
      const from = point(0, 0, 0);
      const to = point(0, 0, 1);
      const up = vector(0, 1, 0);

      const transform = viewTransform(from, to, up);

      expect(transform).toApproxEqualMatrix(scaling(-1, 1, -1));
    });

    it('moves the world', () => {
      const from = point(0, 0, 8);
      const to = point(0, 0, 0);
      const up = vector(0, 1, 0);

      const transform = viewTransform(from, to, up);

      expect(transform).toApproxEqualMatrix(translation(0, 0, -8));
    });

    it('produces the expected transform for arbitrary values', () => {
      const expectedMatrix: Matrix = [
        [-0.50709, 0.50709, 0.67612, -2.36643],
        [0.76772, 0.60609, 0.12122, -2.82843],
        [-0.35857, 0.59761, -0.71714, 0.0],
        [0.0, 0.0, 0.0, 1.0]
      ];
      const from = point(1, 3, 2);
      const to = point(4, -2, 8);
      const up = vector(1, 1, 0);

      const transform = viewTransform(from, to, up);

      expect(transform).toApproxEqualMatrix(expectedMatrix);
    });
  });
});
