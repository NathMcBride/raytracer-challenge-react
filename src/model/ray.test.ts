import {
  point,
  vector,
  scaling,
  translation,
  ray,
  position,
  transform
} from '.';

describe('rays', () => {
  it('creates a ray', () => {
    const origin = point(1, 2, 3);
    const direction = vector(4, 5, 6);

    const r = ray(origin, direction);

    expect(r.origin).toApproxEqualTuple(origin);
    expect(r.direction).toApproxEqualTuple(direction);
  });

  it('computes a point given distance', () => {
    const r = ray(point(2, 3, 4), vector(1, 0, 0));

    expect(position(r, 0)).toApproxEqualTuple(point(2, 3, 4));
    expect(position(r, 1)).toApproxEqualTuple(point(3, 3, 4));
    expect(position(r, -1)).toApproxEqualTuple(point(1, 3, 4));
    expect(position(r, 2.5)).toApproxEqualTuple(point(4.5, 3, 4));
  });

  it('translates a ray', () => {
    const r = ray(point(1, 2, 3), vector(0, 1, 0));
    const m = translation(3, 4, 5);

    const r2 = transform(r, m);

    expect(r2.origin).toApproxEqualTuple(point(4, 6, 8));
    expect(r2.direction).toApproxEqualTuple(vector(0, 1, 0));
  });

  it('scaling a ray', () => {
    const r = ray(point(1, 2, 3), vector(0, 1, 0));
    const m = scaling(2, 3, 4);

    const r2 = transform(r, m);

    expect(r2.origin).toApproxEqualTuple(point(2, 6, 12));
    expect(r2.direction).toApproxEqualTuple(vector(0, 3, 0));
  });
});
