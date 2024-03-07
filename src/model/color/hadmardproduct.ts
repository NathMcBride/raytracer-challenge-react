import { Color } from '..';

export const hadmardProduct = (a: Color, b: Color): Color => ({
  red: a.red * b.red,
  green: a.green * b.green,
  blue: a.blue * b.blue
});
