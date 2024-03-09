import {
  Material,
  material,
  lighting,
  color,
  point,
  Point,
  vector,
  pointLight,
  stripePattern,
  sphere
} from '..';

describe('Material', () => {
  it('has default values', () => {
    const m = material();

    expect(m.color).toApproxEqualColor(color(1, 1, 1));
    expect(m.ambient).toEqual(0.1);
    expect(m.diffuse).toEqual(0.9);
    expect(m.specular).toEqual(0.9);
    expect(m.shininess).toEqual(200.0);
  });

  describe('lighting', () => {
    let m: Material;
    let position: Point;
    const inShadow = false;
    const object = sphere();

    beforeEach(() => {
      m = material();
      position = point(0, 0, 0);
    });

    it('lights with the eye between the light and surface', () => {
      const eyev = vector(0, 0, -1);
      const normalv = vector(0, 0, -1);
      const light = pointLight(point(0, 0, -10), color(1, 1, 1));

      const result = lighting(
        m,
        object,
        light,
        position,
        eyev,
        normalv,
        inShadow
      );
      expect(result).toApproxEqualColor(color(1.9, 1.9, 1.9));
    });

    it('lights with the eye between the light and surface, offset at 45 degrees', () => {
      const eyev = vector(0, Math.SQRT2 / 2, -Math.SQRT2 / 2);
      const normalv = vector(0, 0, -1);
      const light = pointLight(point(0, 0, -10), color(1, 1, 1));

      const result = lighting(
        m,
        object,
        light,
        position,
        eyev,
        normalv,
        inShadow
      );
      expect(result).toApproxEqualColor(color(1.0, 1.0, 1.0));
    });

    it('lights with the eye opposite the surface, light offset at 45 degrees', () => {
      const eyev = vector(0, 0, -1);
      const normalv = vector(0, 0, -1);
      const light = pointLight(point(0, 10, -10), color(1, 1, 1));

      const result = lighting(
        m,
        object,
        light,
        position,
        eyev,
        normalv,
        inShadow
      );
      expect(result).toApproxEqualColor(color(0.7364, 0.7364, 0.7364));
    });

    it('lights with the eye in path of reflection vector', () => {
      const eyev = vector(0, -Math.SQRT2 / 2, -Math.SQRT2 / 2);
      const normalv = vector(0, 0, -1);
      const light = pointLight(point(0, 10, -10), color(1, 1, 1));

      const result = lighting(
        m,
        object,
        light,
        position,
        eyev,
        normalv,
        inShadow
      );
      expect(result).toApproxEqualColor(color(1.6364, 1.6364, 1.6364));
    });

    it('lights with light behind the surface', () => {
      const eyev = vector(0, 0, -1);
      const normalv = vector(0, 0, -1);
      const light = pointLight(point(0, 0, 10), color(1, 1, 1));

      const result = lighting(
        m,
        object,
        light,
        position,
        eyev,
        normalv,
        inShadow
      );
      expect(result).toApproxEqualColor(color(0.1, 0.1, 0.1));
    });

    it('lights the surface when in shadow', () => {
      const eyev = vector(0, 0, -1);
      const normalv = vector(0, 0, -1);
      const light = pointLight(point(0, 0, -10), color(1, 1, 1));
      const inShadow = true;

      const result = lighting(
        m,
        object,
        light,
        position,
        eyev,
        normalv,
        inShadow
      );
      expect(result).toApproxEqualColor(color(0.1, 0.1, 0.1));
    });

    it('lights with a pattern applied', () => {
      m.pattern = stripePattern(color(1, 1, 1), color(0, 0, 0));
      m.ambient = 1;
      m.diffuse = 0;
      m.specular = 0;

      const eyev = vector(0, 0, -1);
      const normalv = vector(0, 0, -1);
      const light = pointLight(point(0, 0, -10), color(1, 1, 1));

      const c1 = lighting(
        m,
        object,
        light,
        point(0.9, 0, 0),
        eyev,
        normalv,
        inShadow
      );
      const c2 = lighting(
        m,
        object,
        light,
        point(1.1, 0, 0),
        eyev,
        normalv,
        inShadow
      );

      expect(c1).toApproxEqualColor(color(1, 1, 1));
      expect(c2).toApproxEqualColor(color(0, 0, 0));
    });
  });
});
