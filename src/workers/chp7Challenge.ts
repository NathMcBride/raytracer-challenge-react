import {
  writePixelToBuffer,
  Job,
  transformToPPMColor,
  rayForPixel,
  colorAt,
  Scene
} from '.';

export const chp7Challenge: Job<Scene> = params => {
  const startTime = performance.now();
  const {
    data: {
      world,
      camera,
      bufferedCanvas: { width, height, buffer }
    }
  } = params;

  const { hsize, vsize } = camera;

  for (let y = 0; y < vsize - 1; y++) {
    for (let x = 0; x < hsize - 1; x++) {
      const ray = rayForPixel(camera, x, y);
      const color = colorAt(world, ray);

      const scaledColor = transformToPPMColor(color);
      writePixelToBuffer({
        buffer,
        x,
        y,
        color: scaledColor,
        width,
        height
      });

      postMessage({
        data: { world, camera, bufferedCanvas: { width, height, buffer } },
        status: 'RUNNING'
      });
    }
  }

  const endTime = performance.now();

  console.log(
    `<<<< The render took: ${endTime - startTime}Milliseconds ${
      (endTime - startTime) / 1000
    }Seconds>>>>`
  );
  return {
    data: { world, camera, bufferedCanvas: { width, height, buffer } },
    status: 'SUCCESS'
  };
};
