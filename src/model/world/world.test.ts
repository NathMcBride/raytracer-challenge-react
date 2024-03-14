import {
  world,
  defaultWorld,
  pointLight,
  color,
  point,
  sphere,
  scaling,
  material,
  ray,
  vector,
  intersectWorld,
  prepareComputations,
  shadeHit,
  colorAt,
  isShadowed,
  translation,
  intersection,
  reflectedColor,
  plane
} from '..';

describe('world', () => {
  describe('creating a new world', () => {
    const theWorld = world();
    it('has no objects', () => {
      expect(theWorld.objects).toBeEmpty();
    });

    it('has no light sources', () => {
      expect(theWorld.lightSources).toBeEmpty();
    });
  });

  describe('default world', () => {
    const theWorld = defaultWorld();

    it('contains the default light source', () => {
      const expectedLight = pointLight(point(-10, 10, -10), color(1, 1, 1));
      expect(theWorld.lightSources).toContainEqual(expectedLight);
    });

    it('contains the default objects', () => {
      const sphere1 = sphere({
        material: material({
          color: color(0.8, 1.0, 0.6),
          diffuse: 0.7,
          specular: 0.2
        })
      });
      const sphere2 = sphere({ transform: scaling(0.5, 0.5, 0.5) });

      expect(theWorld.objects).toContainEqual(sphere1);
      expect(theWorld.objects).toContainEqual(sphere2);
    });
  });

  describe('intersect a world with a ray', () => {
    it('creates the expected intersections', () => {
      const theWorld = defaultWorld();
      const theRay = ray(point(0, 0, -5), vector(0, 0, 1));

      const interSections = intersectWorld(theWorld, theRay);

      expect(interSections.length).toEqual(4);
      expect(interSections[0].t).toEqual(4);
      expect(interSections[1].t).toEqual(4.5);
      expect(interSections[2].t).toEqual(5.5);
      expect(interSections[3].t).toEqual(6);
    });
  });

  describe('shading an intersection', () => {
    it('shades an intersection from the outside', () => {
      const theWorld = defaultWorld();
      const theRay = ray(point(0, 0, -5), vector(0, 0, 1));
      const shape = theWorld.objects[0];
      const theIntersection = intersection(4, shape);
      const computations = prepareComputations(theIntersection, theRay);

      const colorAtHit = shadeHit(theWorld, computations, 1);

      expect(colorAtHit).toApproxEqualColor(color(0.38066, 0.47583, 0.2855));
    });

    it('shades an intersection from the inside', () => {
      const theWorld = defaultWorld();
      theWorld.lightSources = [pointLight(point(0, 0.25, 0), color(1, 1, 1))];
      const theRay = ray(point(0, 0, 0), vector(0, 0, 1));
      const shape = theWorld.objects[1];
      const theIntersection = intersection(0.5, shape);
      const computations = prepareComputations(theIntersection, theRay);

      const colorAtHit = shadeHit(theWorld, computations, 1);

      expect(colorAtHit).toApproxEqualColor(color(0.90498, 0.90498, 0.90498));
    });

    it('shades a reflective material', () => {
      const theWorld = defaultWorld();
      const shape = plane();
      shape.material.reflective = 0.5;
      shape.transform = translation(0, -1, 0);
      theWorld.objects.push(shape);
      const r = ray(
        point(0, 0, -3),
        vector(0, -Math.sqrt(2) / 2, Math.sqrt(2) / 2)
      );
      const i = intersection(Math.sqrt(2), shape);
      const comps = prepareComputations(i, r);

      const theColor = shadeHit(theWorld, comps, 1);

      expect(theColor).toApproxEqualColor(color(0.87675, 0.92434, 0.82917));
    });
  });

  describe('shading an intersection in the world', () => {
    it('returns black when the ray misses', () => {
      const theWorld = defaultWorld();
      const theRay = ray(point(0, 0, -5), vector(0, 1, 0));

      const theColor = colorAt(theWorld, theRay, 1);

      expect(theColor).toEqual(color(0, 0, 0));
    });

    it('returns the color when the ray hits', () => {
      const theWorld = defaultWorld();
      const theRay = ray(point(0, 0, -5), vector(0, 0, 1));

      const theColor = colorAt(theWorld, theRay, 1);

      expect(theColor).toApproxEqualColor(color(0.38066, 0.47583, 0.2855));
    });

    it('returns the color of a intersection behind the ray', () => {
      const theWorld = defaultWorld();
      theWorld.objects[0].material.ambient = 1;
      theWorld.objects[1].material.ambient = 1;
      const theRay = ray(point(0, 0, 0.75), vector(0, 0, -1));

      const theColor = colorAt(theWorld, theRay, 1);

      expect(theColor).toApproxEqualColor(theWorld.objects[1].material.color);
    });

    it('limits recursion of mutually reflective surfaces', () => {
      const theWorld = world();
      theWorld.lightSources = [pointLight(point(0, 0, 0), color(1, 1, 1))];
      const lower = plane();
      lower.material.reflective = 1;
      lower.transform = translation(0, -1, 0);
      theWorld.objects.push(lower);

      const upper = plane();
      upper.material.reflective = 1;
      upper.transform = translation(0, 1, 0);
      theWorld.objects.push(upper);

      const r = ray(point(0, 0, 0), vector(0, 1, 0));
      const theColor = colorAt(theWorld, r, 5);
      expect(theColor).toApproxEqualColor(color(11.4, 11.4, 11.4));
    });
  });

  describe('shadows', () => {
    it('does not detect a shadow when nothing is colinear with point and light', () => {
      const theWorld = defaultWorld();
      const thePoint = point(0, 0, -5);

      const shadowed = isShadowed(theWorld, thePoint);

      expect(shadowed).toBeFalse();
    });

    it('detects a shadow when an object is between the point and light', () => {
      const theWorld = defaultWorld();
      const thePoint = point(10, -10, 10);

      const shadowed = isShadowed(theWorld, thePoint);

      expect(shadowed).toBeTrue();
    });

    it('no shadow when an object is behind the light', () => {
      const theWorld = defaultWorld();
      const thePoint = point(-20, 20, -20);

      const shadowed = isShadowed(theWorld, thePoint);

      expect(shadowed).toBeFalse();
    });

    it('no shadow when an object is behind the point', () => {
      const theWorld = defaultWorld();
      const thePoint = point(-2, 2, -2);

      const shadowed = isShadowed(theWorld, thePoint);

      expect(shadowed).toBeFalse();
    });

    it('shades a shadow when given an intersection in shadow', () => {
      const theWorld = world();
      const light = pointLight(point(0, 0, -10), color(1, 1, 1));
      const sphere1 = sphere();
      const sphere2 = sphere();
      sphere2.transform = translation(0, 0, 10);

      theWorld.lightSources = [light];
      theWorld.objects = [sphere1, sphere2];

      const theRay = ray(point(0, 0, 5), vector(0, 0, 1));
      const theIntersection = intersection(4, sphere2);
      const comps = prepareComputations(theIntersection, theRay);
      const shadedColor = shadeHit(theWorld, comps, 1);

      expect(shadedColor).toApproxEqualColor(color(0.1, 0.1, 0.1));
    });
  });

  describe('reflection', () => {
    it('calculates the reflected color for a non-reflective material', () => {
      const theWorld = defaultWorld();
      const r = ray(point(0, 0, 0), vector(0, 0, 1));
      theWorld.objects[1].material.ambient = 1;
      const i = intersection(1, theWorld.objects[1]);
      const comps = prepareComputations(i, r);

      const theColor = reflectedColor(theWorld, comps, 1);
      expect(theColor).toApproxEqualColor(color(0, 0, 0));
    });

    it('calculates the reflected color for a reflective material', () => {
      const theWorld = defaultWorld();
      const shape = plane();
      shape.material.reflective = 0.5;
      shape.transform = translation(0, -1, 0);
      theWorld.objects.push(shape);
      const r = ray(
        point(0, 0, -3),
        vector(0, -Math.sqrt(2) / 2, Math.sqrt(2) / 2)
      );
      const i = intersection(Math.sqrt(2), shape);
      const comps = prepareComputations(i, r);

      const theColor = reflectedColor(theWorld, comps, 1);

      expect(theColor).toApproxEqualColor(color(0.190332, 0.23791, 0.142741));
    });

    it('calculates the color for the maximum recursive depth', () => {
      const theWorld = defaultWorld();
      const shape = plane();
      shape.material.reflective = 0.5;
      shape.transform = translation(0, -1, 0);
      theWorld.objects.push(shape);
      const r = ray(
        point(0, 0, -3),
        vector(0, -Math.sqrt(2) / 2, Math.sqrt(2) / 2)
      );
      const i = intersection(Math.sqrt(2), shape);
      const comps = prepareComputations(i, r);

      const theColor = reflectedColor(theWorld, comps, 0);

      expect(theColor).toApproxEqualColor(color(0, 0, 0));
    });
  });
});
