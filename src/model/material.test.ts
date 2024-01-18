import {
  Material,
  material,
  lighting,
  color,
  point,
  Point,
  vector,
  pointLight
} from '.';

describe('Material', () => {
  it('has default values', () => {
    const m = material();

    expect(m.color).approxEqualC(color(1, 1, 1));
    expect(m.ambient).toEqual(0.1);
    expect(m.diffuse).toEqual(0.9);
    expect(m.specular).toEqual(0.9);
    expect(m.shininess).toEqual(200.0);
  });

  describe('lighting', () => {
    let m: Material;
    let position: Point;
    beforeEach(() => {
      m = material();
      position = point(0, 0, 0);
    });

    it('lights with the eye between the light and surface', () => {
      const eyev = vector(0, 0, -1);
      const normalv = vector(0, 0, -1);
      const light = pointLight(point(0, 0, -10), color(1, 1, 1));

      const result = lighting(m, light, position, eyev, normalv);
      expect(result).approxEqualC(color(1.9, 1.9, 1.9));
    });

    it('lights with the eye between the light and surface, offset at 45 degrees', () => {
      const eyev = vector(0, Math.SQRT2 / 2, -Math.SQRT2 / 2);
      const normalv = vector(0, 0, -1);
      const light = pointLight(point(0, 0, -10), color(1, 1, 1));

      const result = lighting(m, light, position, eyev, normalv);
      expect(result).approxEqualC(color(1.0, 1.0, 1.0));
    });

    it('lights with the eye opposite the surface, light offset at 45 degrees', () => {
      const eyev = vector(0, 0, -1);
      const normalv = vector(0, 0, -1);
      const light = pointLight(point(0, 10, -10), color(1, 1, 1));

      const result = lighting(m, light, position, eyev, normalv);
      expect(result).approxEqualC(color(0.7364, 0.7364, 0.7364));
    });

    it('lights with the eye in path of reflection vector', () => {
      const eyev = vector(0, -Math.SQRT2 / 2, -Math.SQRT2 / 2);
      const normalv = vector(0, 0, -1);
      const light = pointLight(point(0, 10, -10), color(1, 1, 1));

      const result = lighting(m, light, position, eyev, normalv);
      expect(result).approxEqualC(color(1.6364, 1.6364, 1.6364));
    });

    it('lights with light behind the surface', () => {
      const eyev = vector(0, 0, -1);
      const normalv = vector(0, 0, -1);
      const light = pointLight(point(0, 0, 10), color(1, 1, 1));

      const result = lighting(m, light, position, eyev, normalv);
      expect(result).approxEqualC(color(0.1, 0.1, 0.1));
    });
  });
});
