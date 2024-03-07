import { canvas, canvasToPPM, pixelAt, writePixel, color } from '..';

describe('canvas', () => {
  it('creates a canvas', () => {
    const c = canvas(10, 20);

    expect(c.width).toEqual(10);
    expect(c.height).toEqual(20);

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 20; y++) {
        expect(pixelAt(c, x, y)).toEqual(color(0, 0, 0));
      }
    }
  });

  describe('writes pixels', () => {
    it('writes pixels inside bounds', () => {
      const c = canvas(10, 20);
      const red = color(1, 0, 0);

      writePixel(c, 2, 3, red);

      expect(pixelAt(c, 2, 3)).toEqual(red);
    });

    it('handles pixels outside of bound', () => {
      const c = canvas(10, 20);
      const red = color(1, 0, 0);

      writePixel(c, 11, 21, red);
    });
  });

  describe('canvas to ppm', () => {
    it('writes the ppm header', () => {
      const c = canvas(5, 3);

      const ppm = canvasToPPM(c);

      const expected = 'P3\n' + '5 3\n' + '255';
      expect(ppm).toContain(expected);
    });

    it('writes the pixel data', () => {
      const c = canvas(5, 3);
      const c1 = color(1.5, -0.5, 0);
      const c2 = color(0, 0.5, -0.5);
      const c3 = color(-0.5, 0, 1);
      writePixel(c, 0, 0, c1);
      writePixel(c, 2, 1, c2);
      writePixel(c, 4, 2, c3);

      const ppm = canvasToPPM(c);

      const expected =
        '255 0 0 0 0 0 0 0 0 0 0 0 0 0 0\n' +
        '0 0 0 0 0 0 0 128 0 0 0 0 0 0 0\n' +
        '0 0 0 0 0 0 0 0 0 0 0 0 0 0 255\n';
      expect(ppm).toContain(expected);
    });

    it('splits long lines', () => {
      const c = canvas(10, 2);
      for (let x = 0; x < c.width; x++) {
        for (let y = 0; y < c.height; y++) {
          writePixel(c, x, y, color(1, 0.8, 0.6));
        }
      }

      const ppm = canvasToPPM(c);

      const expected =
        '255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204\n' +
        '153 255 204 153 255 204 153 255 204 153 255 204 153\n' +
        '255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204\n' +
        '153 255 204 153 255 204 153 255 204 153 255 204 153\n';
      expect(ppm).toContain(expected);
    });

    it('terminates with a newline character', () => {
      const c = canvas(5, 3);

      const ppm = canvasToPPM(c);

      const lines = ppm.split('\n');
      expect(lines[lines.length - 1]).toEqual('');
    });
  });
});
