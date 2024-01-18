import { Color, Point } from '.';

export type PointLight = { position: Point; intensity: Color };

export const pointLight = (position: Point, intensity: Color): PointLight => ({
  position,
  intensity
});
