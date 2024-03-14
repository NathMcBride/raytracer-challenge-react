import {
  Matrix,
  identity,
  inverse,
  multiplyByTuple,
  normalize,
  point,
  subtract,
  Ray,
  World,
  Canvas,
  canvas,
  colorAt,
  writePixel
} from '..';

export type Camera = {
  hsize: number;
  vsize: number;
  fieldOfView: number;
  pixelSize: number;
  halfWidth: number;
  halfHeight: number;
  transform: Matrix;
};

export const camera = (
  hsize: number,
  vsize: number,
  fieldOfView: number
): Camera => {
  const halfView = Math.tan(fieldOfView / 2);
  const aspect = hsize / vsize;

  let halfWidth: number;
  let halfHeight: number;

  const isHorizontal = aspect >= 1;
  if (isHorizontal) {
    halfWidth = halfView;
    halfHeight = halfView / aspect;
  } else {
    halfWidth = halfView * aspect;
    halfHeight = halfView;
  }

  const pixelSize = (halfWidth * 2) / hsize;

  return {
    hsize,
    vsize,
    fieldOfView,
    pixelSize,
    halfWidth,
    halfHeight,
    transform: identity()
  };
};

export const rayForPixel = (camera: Camera, px: number, py: number): Ray => {
  const xOffset = (px + 0.5) * camera.pixelSize;
  const yOffset = (py + 0.5) * camera.pixelSize;

  const worldX = camera.halfWidth - xOffset;
  const worldY = camera.halfHeight - yOffset;

  const inverseTransform = inverse(camera.transform);
  const pixel = multiplyByTuple(inverseTransform, point(worldX, worldY, -1));

  const origin = multiplyByTuple(inverseTransform, point(0, 0, 0));
  const direction = normalize(subtract(pixel, origin));

  return { origin, direction };
};

export const render = (camera: Camera, world: World): Canvas => {
  const { hsize, vsize } = camera;

  const theCanvas = canvas(hsize, vsize);
  for (let y = 0; y < vsize - 1; y++) {
    for (let x = 0; x < hsize - 1; x++) {
      const ray = rayForPixel(camera, x, y);
      const color = colorAt(world, ray, 5);
      writePixel(theCanvas, x, y, color);
    }
  }
  return theCanvas;
};
