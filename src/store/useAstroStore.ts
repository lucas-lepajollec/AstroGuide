import { create } from 'zustand';
import { celestialObjects, type CelestialObject } from '../data/mockData';

interface AstroState {
  currentView: '3D' | '2D' | 'SIZE';
  selectedAstro: CelestialObject | null;
  setView: (view: '3D' | '2D' | 'SIZE') => void;
  setSelectedAstro: (astro: CelestialObject | null) => void;
  // Comparison selection (for SIZE view)
  comparisonIds: Set<string>;
  toggleComparisonId: (id: string) => void;
  selectAllComparison: () => void;
  deselectAllComparison: () => void;

  // Mobile layout state
  isNavOpen: boolean;
  setNavOpen: (isOpen: boolean) => void;
  isInfoOpen: boolean;
  setInfoOpen: (isOpen: boolean) => void;
  // Card visibility
  isCardVisible: boolean;
  setCardVisible: (isVisible: boolean) => void;
}

export const useAstroStore = create<AstroState>((set) => ({
  currentView: '3D',
  selectedAstro: null,
  isCardVisible: false,
  setCardVisible: (isVisible) => set({ isCardVisible: isVisible }),
  setView: (view) => set({ currentView: view }),
  setSelectedAstro: (astro) => set({ selectedAstro: astro, isCardVisible: !!astro }),
  comparisonIds: new Set(celestialObjects.map((o) => o.id)),
  toggleComparisonId: (id) =>
    set((state) => {
      const next = new Set(state.comparisonIds);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { comparisonIds: next };
    }),
  selectAllComparison: () =>
    set({ comparisonIds: new Set(celestialObjects.map((o) => o.id)) }),
  deselectAllComparison: () =>
    set({ comparisonIds: new Set() }),
  isNavOpen: false,
  setNavOpen: (isOpen) => set({ isNavOpen: isOpen }),
  isInfoOpen: false,
  setInfoOpen: (isOpen) => set({ isInfoOpen: isOpen }),
}));
