import {describe, expect, it} from 'vitest';
import {isDemoBuild} from './runtimeMode';

describe('runtime mode', () => {
  it('enables the public demo only for the explicit demo build', () => {
    expect(isDemoBuild('demo')).toBe(true);
    expect(isDemoBuild('production')).toBe(false);
    expect(isDemoBuild('development')).toBe(false);
  });
});
