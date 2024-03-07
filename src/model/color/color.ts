import { min, max, hadmardProduct } from '..';
export type Color = { red: number; green: number; blue: number };

export const color = (red: number, green: number, blue: number) => ({
  red,
  green,
  blue
});

export const addColor = (
  a: { red: number; green: number; blue: number },
  b: { red: number; green: number; blue: number }
): { red: number; green: number; blue: number } => ({
  red: a.red + b.red,
  green: a.green + b.green,
  blue: a.blue + b.blue
});

export const subtractColor = (a: Color, b: Color): Color => ({
  red: a.red - b.red,
  green: a.green - b.green,
  blue: a.blue - b.blue
});

export const multiplyByScalar = (a: Color, scalar: number): Color => ({
  red: a.red * scalar,
  green: a.green * scalar,
  blue: a.blue * scalar
});

export const multiplyByColor = (a: Color, b: Color): Color =>
  hadmardProduct(a, b);

export const clampColor = (color: Color, b?: number): Color => ({
  red: min(max(color.red)),
  green: min(max(color.green)),
  blue: min(max(color.blue))
});

export const round = (color: Color, b?: number): Color => ({
  red: Math.round(color.red),
  green: Math.round(color.green),
  blue: Math.round(color.blue)
});

export const black = color(0, 0, 0);
