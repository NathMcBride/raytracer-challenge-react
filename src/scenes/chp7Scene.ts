import {
  Scene,
  world,
  sphere,
  scaling,
  material,
  color,
  matrixTransform,
  translation,
  multiplyMatrix,
  pointLight,
  point,
  camera,
  vector,
  viewTransform
} from '../model';

export const chp7Scene = (
  width: number,
  height: number
): Omit<Scene, 'bufferedCanvas'> => {
  const theWorld = world();

  const floor = sphere();
  floor.transform = scaling(10, 0.01, 10);
  floor.material = material();
  floor.material.color = color(1, 0.9, 0.9);
  floor.material.specular = 0;

  const lefWall = sphere();
  lefWall.transform = matrixTransform()
    .scaling(10, 0.01, 10)
    .rotationX(Math.PI / 2)
    .rotationY(-Math.PI / 4)
    .translation(0, 0, 5)
    .m();

  lefWall.material = material();
  lefWall.material.color = color(1, 0.9, 0.9);
  lefWall.material.specular = 0;

  const rightWall = sphere();
  rightWall.transform = matrixTransform()
    .scaling(10, 0.01, 10)
    .rotationX(Math.PI / 2)
    .rotationY(Math.PI / 4)
    .translation(0, 0, 5)
    .m();

  rightWall.material = material();
  rightWall.material.color = color(1, 0.9, 0.9);
  rightWall.material.specular = 0;

  const middle = sphere();
  middle.transform = translation(-0.5, 1, 0.5);
  middle.material = material();
  middle.material.color = color(0.1, 1, 0.5);
  middle.material.diffuse = 0.7;
  middle.material.specular = 0.3;

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
  left.material.color = color(1, 0.8, 0.1);
  left.material.diffuse = 0.7;
  left.material.specular = 0.3;

  const light = pointLight(point(-10, 10, -10), color(1, 1, 1));

  theWorld.lightSources = [light];
  theWorld.objects = [floor, lefWall, rightWall, middle, right, left];

  const theCamera = camera(width, height, Math.PI / 3);
  const from = point(0, 1.5, -5);
  const to = point(0, 1, 0);
  const up = vector(0, 1, 0);
  theCamera.transform = viewTransform(from, to, up);

  return { world: theWorld, camera: theCamera };
};
