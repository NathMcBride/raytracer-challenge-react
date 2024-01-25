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
  intersection,
  prepareComputations,
  shadeHit,
  colorAt
} from '.';

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

      const colorAtHit = shadeHit(theWorld, computations);

      expect(colorAtHit).toApproxEqualColor(color(0.38066, 0.47583, 0.2855));
    });

    it('shades an intersection from the inside', () => {
      const theWorld = defaultWorld();
      theWorld.lightSources = [pointLight(point(0, 0.25, 0), color(1, 1, 1))];
      const theRay = ray(point(0, 0, 0), vector(0, 0, 1));
      const shape = theWorld.objects[1];
      const theIntersection = intersection(0.5, shape);
      const computations = prepareComputations(theIntersection, theRay);

      const colorAtHit = shadeHit(theWorld, computations);

      expect(colorAtHit).toApproxEqualColor(color(0.90498, 0.90498, 0.90498));
    });
  });

  describe('shading an intersection in the world', () => {
    it('returns black when the ray misses', () => {
      const theWorld = defaultWorld();
      const theRay = ray(point(0, 0, -5), vector(0, 1, 0));

      const theColor = colorAt(theWorld, theRay);

      expect(theColor).toEqual(color(0, 0, 0));
    });

    it('returns the color when the ray hits', () => {
      const theWorld = defaultWorld();
      const theRay = ray(point(0, 0, -5), vector(0, 0, 1));

      const theColor = colorAt(theWorld, theRay);

      expect(theColor).toApproxEqualColor(color(0.38066, 0.47583, 0.2855));
    });

    it('returns the color of a intersection behind the ray', () => {
      const theWorld = defaultWorld();
      theWorld.objects[0].material.ambient = 1;
      theWorld.objects[1].material.ambient = 1;
      const theRay = ray(point(0, 0, 0.75), vector(0, 0, -1));

      const theColor = colorAt(theWorld, theRay);

      expect(theColor).toApproxEqualColor(theWorld.objects[1].material.color);
    });
  });
});
