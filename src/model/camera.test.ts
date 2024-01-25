import {
  identity,
  camera,
  point,
  vector,
  rayForPixel,
  multiplyMatrix,
  rotationY,
  translation,
  defaultWorld,
  viewTransform,
  pixelAt,
  color,
  render
} from '.';

describe('camera', () => {
  describe('constructing a camera', () => {
    it('constructs a camera with the expected values', () => {
      const hsize = 160;
      const vsize = 120;
      const fieldOfView = Math.PI / 2;

      const theCamera = camera(hsize, vsize, fieldOfView);

      expect(theCamera.hsize).toEqual(160);
      expect(theCamera.vsize).toEqual(120);
      expect(theCamera.fieldOfView).toEqual(Math.PI / 2);
      expect(theCamera.transform).toApproxEqualMatrix(identity());
    });

    it('calculates the pixel size for a horizontal canvas', () => {
      const theCamera = camera(200, 125, Math.PI / 2);
      expect(theCamera.pixelSize).toApproxEqualNumber(0.01);
    });

    it('calculates the pixel size for a vertical canvas', () => {
      const theCamera = camera(125, 200, Math.PI / 2);
      expect(theCamera.pixelSize).toApproxEqualNumber(0.01);
    });
  });

  describe('constructing rays through the camera', () => {
    it('creates a ray through the center', () => {
      const theCamera = camera(201, 101, Math.PI / 2);

      const theRay = rayForPixel(theCamera, 100, 50);

      expect(theRay.origin).toApproxEqualTuple(point(0, 0, 0));
      expect(theRay.direction).toApproxEqualTuple(vector(0, 0, -1));
    });

    it('creates a ray through the corner', () => {
      const theCamera = camera(201, 101, Math.PI / 2);

      const theRay = rayForPixel(theCamera, 0, 0);

      expect(theRay.origin).toApproxEqualTuple(point(0, 0, 0));
      expect(theRay.direction).toApproxEqualTuple(
        vector(0.66519, 0.33259, -0.66851)
      );
    });

    it('creates a ray when the camera is transformed', () => {
      const theCamera = camera(201, 101, Math.PI / 2);
      theCamera.transform = multiplyMatrix(
        rotationY(Math.PI / 4),
        translation(0, -2, 5)
      );

      const theRay = rayForPixel(theCamera, 100, 50);

      expect(theRay.origin).toApproxEqualTuple(point(0, 2, -5));
      expect(theRay.direction).toApproxEqualTuple(
        vector(Math.sqrt(2) / 2, 0, -Math.sqrt(2) / 2)
      );
    });
  });

  describe('rendering a world with the camera', () => {
    it('renders the center pixel correctly', () => {
      const theWorld = defaultWorld();
      const theCamera = camera(11, 11, Math.PI / 2);
      const from = point(0, 0, -5);
      const to = point(0, 0, 0);
      const up = vector(0, 1, 0);
      theCamera.transform = viewTransform(from, to, up);

      const canvas = render(theCamera, theWorld);

      expect(pixelAt(canvas, 5, 5)).toApproxEqualColor(
        color(0.38066, 0.47583, 0.2855)
      );
    });
  });
});
