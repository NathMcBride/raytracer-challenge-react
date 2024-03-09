import {
  color,
  stripeAt,
  stripePattern,
  gradientPattern,
  ringPattern,
  ringAt,
  checkerPattern,
  checkerAt,
  point,
  sphere,
  scaling,
  patternAtShape,
  translation
} from '..';
import { gradientAt } from './gradient';

describe('pattern', () => {
  const black = color(0, 0, 0);
  const white = color(1, 1, 1);

  describe('stripe', () => {
    it('creates a stripe pattern', () => {
      const pattern = stripePattern(white, black);

      expect(pattern.a).toApproxEqualColor(white);
      expect(pattern.b).toApproxEqualColor(black);
    });

    it('is constant in the y direction', () => {
      const pattern = stripePattern(white, black);

      expect(stripeAt(pattern, point(0, 0, 0))).toApproxEqualColor(white);
      expect(stripeAt(pattern, point(0, 1, 0))).toApproxEqualColor(white);
      expect(stripeAt(pattern, point(0, 2, 0))).toApproxEqualColor(white);
    });

    it('is constant in the z direction', () => {
      const pattern = stripePattern(white, black);

      expect(stripeAt(pattern, point(0, 0, 0))).toApproxEqualColor(white);
      expect(stripeAt(pattern, point(0, 0, 1))).toApproxEqualColor(white);
      expect(stripeAt(pattern, point(0, 0, 2))).toApproxEqualColor(white);
    });

    it('is alternates in the x direction', () => {
      const pattern = stripePattern(white, black);

      expect(stripeAt(pattern, point(0, 0, 0))).toApproxEqualColor(white);
      expect(stripeAt(pattern, point(0.9, 0, 0))).toApproxEqualColor(white);
      expect(stripeAt(pattern, point(1, 0, 0))).toApproxEqualColor(black);
      expect(stripeAt(pattern, point(-0.1, 0, 0))).toApproxEqualColor(black);
      expect(stripeAt(pattern, point(-1, 0, 0))).toApproxEqualColor(black);
      expect(stripeAt(pattern, point(-1.1, 0, 0))).toApproxEqualColor(white);
    });

    it('changes with the object transform', () => {
      const object = sphere();
      object.transform = scaling(2, 2, 2);
      const pattern = stripePattern(white, black);

      const c = patternAtShape(pattern, object, point(1.5, 0, 0));

      expect(c).toApproxEqualColor(white);
    });

    it('changes with the pattern transform', () => {
      const object = sphere();
      const pattern = stripePattern(white, black);
      pattern.transform = scaling(2, 2, 2);

      const c = patternAtShape(pattern, object, point(1.5, 0, 0));

      expect(c).toApproxEqualColor(white);
    });

    it('changes with both the object and pattern transform', () => {
      const object = sphere();
      object.transform = scaling(2, 2, 2);
      const pattern = stripePattern(white, black);
      pattern.transform = translation(0.5, 0, 0);

      const c = patternAtShape(pattern, object, point(2.5, 0, 0));

      expect(c).toApproxEqualColor(white);
    });
  });

  describe('gradient', () => {
    it('linearly interpolates between colors', () => {
      const pattern = gradientPattern(white, black);

      expect(gradientAt(pattern, point(0, 0, 0))).toApproxEqualColor(white);
      expect(gradientAt(pattern, point(0.25, 0, 0))).toApproxEqualColor(
        color(0.75, 0.75, 0.75)
      );
      expect(gradientAt(pattern, point(0.5, 0, 0))).toApproxEqualColor(
        color(0.5, 0.5, 0.5)
      );
      expect(gradientAt(pattern, point(0.75, 0, 0))).toApproxEqualColor(
        color(0.25, 0.25, 0.25)
      );
    });
  });

  describe('ring', () => {
    it('extends the ring in both x and z', () => {
      const pattern = ringPattern(white, black);

      expect(ringAt(pattern, point(0, 0, 0))).toApproxEqualColor(white);
      expect(ringAt(pattern, point(1, 0, 0))).toApproxEqualColor(black);
      expect(ringAt(pattern, point(0, 0, 1))).toApproxEqualColor(black);
      expect(ringAt(pattern, point(0.708, 0, 0.708))).toApproxEqualColor(black);
    });
  });

  describe('checkers', () => {
    it('repeats in the x direction', () => {
      const pattern = checkerPattern(white, black);

      expect(checkerAt(pattern, point(0, 0, 0))).toApproxEqualColor(white);
      expect(checkerAt(pattern, point(0.99, 0, 0))).toApproxEqualColor(white);
      expect(checkerAt(pattern, point(1.01, 0, 0))).toApproxEqualColor(black);
    });

    it('repeats in the y direction', () => {
      const pattern = checkerPattern(white, black);

      expect(checkerAt(pattern, point(0, 0, 0))).toApproxEqualColor(white);
      expect(checkerAt(pattern, point(0, 0.99, 0))).toApproxEqualColor(white);
      expect(checkerAt(pattern, point(0, 1.01, 0))).toApproxEqualColor(black);
    });

    it('repeats in the z direction', () => {
      const pattern = checkerPattern(white, black);

      expect(checkerAt(pattern, point(0, 0, 0))).toApproxEqualColor(white);
      expect(checkerAt(pattern, point(0, 0, 0.99))).toApproxEqualColor(white);
      expect(checkerAt(pattern, point(0, 0, 1.01))).toApproxEqualColor(black);
    });
  });
});
