import { beforeEach, describe, expect, it } from 'vitest';
import { celestialObjects } from '../data/celestialData';
import { useAstroStore } from './useAstroStore';

const allIds = new Set(celestialObjects.map((object) => object.id));

beforeEach(() => {
  useAstroStore.setState({
    currentView: '3D',
    selectedAstro: null,
    comparisonIds: new Set(allIds),
    isNavOpen: false,
    isInfoOpen: false,
    isCardVisible: false,
  });
});

describe('AstroGuide store', () => {
  it('selects an object and reveals its information card', () => {
    const earth = celestialObjects.find((object) => object.id === 'earth');
    expect(earth).toBeDefined();

    useAstroStore.getState().setSelectedAstro(earth!);

    expect(useAstroStore.getState().selectedAstro?.id).toBe('earth');
    expect(useAstroStore.getState().isCardVisible).toBe(true);
  });

  it('toggles comparison membership without mutating the previous set', () => {
    const previous = useAstroStore.getState().comparisonIds;
    useAstroStore.getState().toggleComparisonId('earth');
    const next = useAstroStore.getState().comparisonIds;

    expect(next).not.toBe(previous);
    expect(previous.has('earth')).toBe(true);
    expect(next.has('earth')).toBe(false);
  });

  it('supports clearing and restoring the full comparison', () => {
    useAstroStore.getState().deselectAllComparison();
    expect(useAstroStore.getState().comparisonIds.size).toBe(0);

    useAstroStore.getState().selectAllComparison();
    expect(useAstroStore.getState().comparisonIds).toEqual(allIds);
  });

  it('switches between the three supported views', () => {
    for (const view of ['3D', '2D', 'SIZE'] as const) {
      useAstroStore.getState().setView(view);
      expect(useAstroStore.getState().currentView).toBe(view);
    }
  });
});
