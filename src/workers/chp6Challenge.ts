import {
  point,
  sphere,
  color,
  pointLight,
  ray,
  normalize,
  subtract,
  intersect,
  hit,
  position,
  normalAt,
  negate,
  lighting,
  writePixelToBuffer,
  Job,
  BufferedCanvas,
  transformToPPMColor
} from '.';

export const chp6Challenge: Job<BufferedCanvas> = params => {
  const startTime = performance.now();
  const { data } = params;
  const ray_origin = point(0, 0, -5);
  const wall_z = 10;
  const wall_size = 7;
  //only catering for canvas equal width and height at the moment
  const canvas_pixels = data.width;
  const pixel_size = wall_size / canvas_pixels;
  const half = wall_size / 2;

  const shape = sphere();
  shape.material.color = color(1, 0.2, 1);

  const lightPosition = point(-10, 10, -10);
  const lightColor = color(1, 1, 1);
  const light = pointLight(lightPosition, lightColor);

  for (let y = 0; y < canvas_pixels; y++) {
    const world_y = half - pixel_size * y;
    for (let x = 0; x < canvas_pixels; x++) {
      const world_x = -half + pixel_size * x;
      const thePosition = point(world_x, world_y, wall_z);
      const r = ray(ray_origin, normalize(subtract(thePosition, ray_origin)));
      const xs = intersect(shape, r);

      const theHit = hit(xs);
      if (theHit) {
        const thePoint = position(r, theHit.t);
        const normal = normalAt(theHit.object, thePoint);
        const eye = negate(r.direction);
        const theColor = lighting(
          theHit.object.material,
          light,
          thePoint,
          eye,
          normal
        );

        const scaledColor = transformToPPMColor(theColor);
        const { width, height, buffer } = data;
        writePixelToBuffer({
          buffer,
          x,
          y,
          color: scaledColor,
          width,
          height
        });
      }
      postMessage({
        data: { width: data.width, height: data.height, buffer: data.buffer },
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
    data: { width: data.width, height: data.height, buffer: data.buffer },
    status: 'SUCCESS'
  };
};
