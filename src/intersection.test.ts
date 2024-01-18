import { intersection, intersections, hit } from './model/intersection';
import { sphere } from './model/sphere';

describe('intersection', () => {
  it('an intersection encapsulates a t and an object', () => {
    const s = sphere();
    const i = intersection(3.5, s);

    expect(i.t).toEqual(3.5);
    expect(i.object).toEqual(s);
  });

  it('aggregates intersections', () => {
    const s = sphere();
    const i1 = intersection(1, s);
    const i2 = intersection(2, s);

    const xs = intersections(i1, i2);
    expect(xs.length).toEqual(2);
    expect(xs[0].t).toEqual(1);
    expect(xs[1].t).toEqual(2);
  });

  describe('hit', () => {
    it('when all intersections have a positive t', () => {
      const s = sphere();
      const i1 = intersection(1, s);
      const i2 = intersection(2, s);

      const xs = intersections(i2, i1);

      expect(hit(xs)).toEqual(i1);
    });

    it('when some intersections have a negative t', () => {
      const s = sphere();
      const i1 = intersection(-1, s);
      const i2 = intersection(2, s);

      const xs = intersections(i2, i1);

      expect(hit(xs)).toEqual(i2);
    });

    it('when all intersections have a negative t', () => {
      const s = sphere();
      const i1 = intersection(-2, s);
      const i2 = intersection(-1, s);

      const xs = intersections(i2, i1);

      expect(hit(xs)).toBeNull();
    });

    it('hit is always the lowest non negative intersection', () => {
      const s = sphere();
      const i1 = intersection(5, s);
      const i2 = intersection(7, s);
      const i3 = intersection(-3, s);
      const i4 = intersection(2, s);

      const xs = intersections(i1, i2, i3, i4);

      expect(hit(xs)).toEqual(i4);
    });
  });
});
