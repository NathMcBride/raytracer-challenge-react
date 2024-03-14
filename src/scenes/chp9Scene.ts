import {
  Scene,
  world,
  sphere,
  plane,
  scaling,
  material,
  color,
  translation,
  multiplyMatrix,
  pointLight,
  point,
  camera,
  vector,
  viewTransform,
  gradientPattern,
  checkerPattern
} from '../model';

export const chp9Scene = (
  width: number,
  height: number
): Omit<Scene, 'bufferedCanvas'> => {
  const theWorld = world();

  const floor = plane();
  floor.material = material();
  floor.material.pattern = checkerPattern(color(1, 1, 1), color(0, 0, 0));
  floor.material.color = color(1, 0.9, 0.9);
  floor.material.specular = 0;
  floor.material.reflective = 0.5;

  const middle = sphere();
  middle.transform = translation(-0.5, 1, 0.5);
  middle.material = material();
  middle.material.color = color(1, 0, 0);
  middle.material.shininess = 1600;
  middle.material.reflective = 1;

  const right = sphere();
  right.transform = multiplyMatrix(
    translation(1.5, 0.5, -0.5),
    scaling(0.5, 0.5, 0.5)
  );
  right.material = material();
  right.material.color = color(0.5, 1, 0.1);
  right.material.diffuse = 0.7;
  right.material.specular = 0.3;

  const left = sphere();
  left.transform = multiplyMatrix(
    translation(-1.5, 0.33, -0.75),
    scaling(0.33, 0.33, 0.33)
  );
  left.material = material();
  left.material.pattern = gradientPattern(color(1, 0, 0), color(0, 0, 1));
  left.material.pattern.transform = multiplyMatrix(
    translation(1, 0, 0),
    scaling(2, 2, 2)
  );
  left.material.diffuse = 0.7;
  left.material.specular = 0.3;
  left.material.ambient = 0.5;

  const light = pointLight(point(-10, 10, -10), color(1, 1, 1));

  theWorld.lightSources = [light];
  theWorld.objects = [floor, middle, right, left];

  const theCamera = camera(width, height, Math.PI / 3);
  const from = point(0, 1.5, -5);
  const to = point(0, 1, 0);
  const up = vector(0, 1, 0);
  theCamera.transform = viewTransform(from, to, up);

  return { world: theWorld, camera: theCamera };
};
