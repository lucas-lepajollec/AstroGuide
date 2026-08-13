import { describe, expect, it } from 'vitest';
import { celestialObjects, constellationLines } from './celestialData';

describe('celestial data', () => {
  it('keeps the published catalogue size stable', () => {
    expect(celestialObjects).toHaveLength(39);
  });

  it('uses unique non-empty identifiers', () => {
    const ids = celestialObjects.map((object) => object.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.every(Boolean)).toBe(true);
  });

  it('provides positive comparison sizes and complete display fields', () => {
    for (const object of celestialObjects) {
      expect(object.sizeKm).toBeGreaterThan(0);
      expect(object.name.trim()).not.toBe('');
      expect(object.scientificSize.trim()).not.toBe('');
      expect(object.scientificDistance.trim()).not.toBe('');
      expect(object.description.trim()).not.toBe('');
    }
  });

  it('labels black-hole masses separately from their diameters', () => {
    const blackHoles = celestialObjects.filter((object) => object.type === 'blackhole');
    expect(blackHoles.length).toBeGreaterThan(0);
    expect(blackHoles.every((object) => object.relativeSizeLabel?.includes('Masse'))).toBe(true);
  });

  it('references existing objects in every constellation segment', () => {
    const ids = new Set(celestialObjects.map((object) => object.id));
    for (const segments of Object.values(constellationLines)) {
      for (const [from, to] of segments) {
        expect(ids.has(from)).toBe(true);
        expect(ids.has(to)).toBe(true);
        expect(from).not.toBe(to);
      }
    }
  });

  it('links moons to an existing parent object', () => {
    const ids = new Set(celestialObjects.map((object) => object.id));
    const children = celestialObjects.filter((object) => object.parentId);
    expect(children.length).toBeGreaterThan(0);
    expect(children.every((object) => ids.has(object.parentId!))).toBe(true);
  });
});
