import {
  color,
  addColor,
  subtractColor,
  multiplyByScalar,
  multiplyByColor
} from '.';

describe('color', () => {
  it('adds colors', () => {
    const a = color(0.9, 0.6, 0.75);
    const b = color(0.7, 0.1, 0.25);

    expect(addColor(a, b)).toEqual({ red: 1.6, green: 0.7, blue: 1.0 });
  });

  it('subtracts colors', () => {
    const a = color(0.9, 0.6, 0.75);
    const b = color(0.7, 0.1, 0.25);

    expect(subtractColor(a, b)).approxEqualC({
      red: 0.2,
      green: 0.5,
      blue: 0.5
    });
  });

  it('multiplies by a scalar', () => {
    const a = color(0.2, 0.3, 0.4);

    expect(multiplyByScalar(a, 2)).toEqual({ red: 0.4, green: 0.6, blue: 0.8 });
  });

  it('multiplies by a color', () => {
    const a = color(1, 0.2, 0.4);
    const b = color(0.9, 1, 0.1);

    expect(multiplyByColor(a, b)).approxEqualC({
      red: 0.9,
      green: 0.2,
      blue: 0.04
    });
  });
});
