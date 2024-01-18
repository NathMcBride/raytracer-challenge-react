import { color } from './model/color';
import { point } from './model/tuple';
import { pointLight } from './model/light';

describe('light', () => {
  it('has a position and intensity', () => {
    const intensity = color(1, 1, 1);
    const position = point(0, 0, 0);

    const light = pointLight(position, intensity);

    expect(light.position).approxEqual(position);
    expect(light.intensity).approxEqualC(intensity);
  });
});
