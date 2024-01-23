import { color, point, pointLight } from '.';

describe('light', () => {
  it('has a position and intensity', () => {
    const intensity = color(1, 1, 1);
    const position = point(0, 0, 0);

    const light = pointLight(position, intensity);
    expect(light.position).toApproxEqualTuple(position);
    expect(light.intensity).toApproxEqualColor(intensity);
  });
});
