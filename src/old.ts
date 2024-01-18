import { Vector, Point, add } from './model';

type Projectile = { position: Point; velocity: Vector };
type Environment = { gravity: Vector; wind: Vector };

const tick = (environment: Environment, projectile: Projectile): Projectile => {
  const position = add(projectile.position, projectile.velocity);
  const velocity = add(
    projectile.velocity,
    add(environment.gravity, environment.wind)
  );
  return { position, velocity };
};
/*
const doStuff = (): string => {
  const start = point(0, 1, 0);
  const velocity = multiply(normalize(vector(1, 1.8, 0)), 11.25);

  let projectile: Projectile = {
    position: start,
    velocity: velocity as Vector
  };

  const env: Environment = {
    gravity: vector(0, -0.1, 0),
    wind: vector(-0.01, 0, 0)
  };

  const c = createCanvas(900, 550);

  // let count = 0;

  while (projectile.position.y > 0) {
    projectile = tick(env, projectile);
    writePixel(
      c,
      Math.round(projectile.position.x),
      Math.round(550 - projectile.position.y),
      color(0, 1, 1)
    );
    // count++;

    // console.log(`Position: ${JSON.stringify(projectile.position, null, 2)}`);
    // console.log(`Tick Count: ${count}`);
  }

  return canvasToPPM(c);
};*/

/*
const clockChallenge = () => {
  const c = createCanvas(500, 500);
  const twelve = point(0, 0, 1);

  const radius = 3 * (500 / 8);

  for (let i = 0; i < 12; i++) {
    const r = rotationY((i * Math.PI) / 6);
    const thePoint = multiplyByTuple(r, twelve);
    const scaled = point(thePoint.x * radius, thePoint.y, thePoint.z * radius);
    writePixel(
      c,
      Math.round(scaled.x + 250),
      Math.round(scaled.z + 250),
      color(0, 1, 1)
    );
  }

  return canvasToPPM(c);
};
*/
const rando = () => Math.floor(Math.random() * (255 - 0 + 1) + 0);
/*
const chp5Challenge = () => {
  const ray_origin = point(0, 0, -5);
  const wall_z = 10;
  const wall_size = 7;
  const canvas_pixels = 500;
  const pixel_size = wall_size / canvas_pixels;
  const half = wall_size / 2;

  const theCanvas = createCanvas(canvas_pixels, canvas_pixels);
  const theColor = color(0, 1, 1);
  const shape = sphere();
  // shape.transform = scaling(1, 0.5, 1);
  // shape.transform = scaling(0.5, 1, 1);
  // shape.transform = transform()
  //   .scaling(0.5, 1, 1)
  //   .rotationZ(Math.PI / 4)
  //   .m();
  // shape.transform = transform()
  //   .scaling(0.5, 1, 1)
  //   .shearing(1, 0, 0, 0, 0, 0)
  //   .m();

  for (let y = 0; y < canvas_pixels; y++) {
    const world_y = half - pixel_size * y;
    for (let x = 0; x < canvas_pixels; x++) {
      const world_x = -half + pixel_size * x;
      const thePosition = point(world_x, world_y, wall_z);
      const r = ray(ray_origin, normalize(subtract(thePosition, ray_origin)));
      const xs = intersect(shape, r);
      if (hit(xs)) {
        writePixel(
          theCanvas,
          x,
          y,
          color(rando() / 255, rando() / 255, rando() / 255)
        );
      }
    }
  }
  return canvasToPPM(theCanvas);
};*/
/*
const chp6Challenge = () => {
  const ray_origin = point(0, 0, -5);
  const wall_z = 10;
  const wall_size = 7;
  const canvas_pixels = 500;
  const pixel_size = wall_size / canvas_pixels;
  const half = wall_size / 2;

  const theCanvas = canvas(canvas_pixels, canvas_pixels);
  // const theColor = color(0, 1, 1);
  const shape = sphere();
  shape.material.color = color(1, 0.2, 1);

  const lightPosition = point(-10, 10, -10);
  const lightColor = color(1, 1, 1);
  const light = pointLight(lightPosition, lightColor);

  // shape.transform = scaling(1, 0.5, 1);
  // shape.transform = scaling(0.5, 1, 1);
  // shape.transform = transform()
  //   .scaling(0.5, 1, 1)
  //   .rotationZ(Math.PI / 4)
  //   .m();
  // shape.transform = transform()
  //   .scaling(0.5, 1, 1)
  //   .shearing(1, 0, 0, 0, 0, 0)
  //   .m();

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
        writePixel(theCanvas, x, y, theColor);
      }
    }
  }
  return canvasToPPM(theCanvas);
};*/

/*
const chp6Challenge: Job<Canvas> = params => {
  const { data: canvas } = params;
  console.log('**** HERE 1 ****');
  // if (!canvas) return;
  console.log('**** HERE 2 ****');
  // const { canvas, setBuffer } = useRenderBuffer();

  const ray_origin = point(0, 0, -5);
  console.log('**** HERE 3 ****');
  const wall_z = 10;
  const wall_size = 7;
  const canvas_pixels = 500;
  const pixel_size = wall_size / canvas_pixels;
  const half = wall_size / 2;

  // const theCanvas = canvas(canvas_pixels, canvas_pixels);
  // const theColor = color(0, 1, 1);
  const shape = sphere();
  shape.material.color = color(1, 0.2, 1);

  const lightPosition = point(-10, 10, -10);
  const lightColor = color(1, 1, 1);
  const light = pointLight(lightPosition, lightColor);

  // shape.transform = scaling(1, 0.5, 1);
  // shape.transform = scaling(0.5, 1, 1);
  // shape.transform = transform()
  //   .scaling(0.5, 1, 1)
  //   .rotationZ(Math.PI / 4)
  //   .m();
  // shape.transform = transform()
  //   .scaling(0.5, 1, 1)
  //   .shearing(1, 0, 0, 0, 0, 0)
  //   .m();

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

        console.log(`plotting x:${x} y:${y}`);
        writePixel(canvas, x, y, theColor);
        postMessage({ canvas, status: 'PENDING' });
        // didUpdate(canvas);
        // setBuffer({ buffer: canvas.data });
      }
    }
  }
  return { data: canvas, status: 'SUCCESS' as any };

  // return canvasToPPM(theCanvas);
};*/

// const ppm = doStuff();
// const ppm = clockChallenge();
// const ppm = chp6Challenge();

// const thing: Uint8ClampedArray = [];
// const fileData = 'some-text';
// const blob = new Blob([ppm], { type: 'text/plain' });
// const url = window.URL.createObjectURL(blob);
{
  /* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */
}
{
  /* <a className="ppm-link" href={url} download="filename.ppm">
          download ppm
        </a> */
}
