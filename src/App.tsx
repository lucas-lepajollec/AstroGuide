/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Scene3D from './components/Scene3D';
import UIOverlay from './components/UIOverlay';
import Map2DView from './components/Map2DView';
import { CelestialObject } from './mockData';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [currentView, setCurrentView] = useState<'3d' | 'map'>('3d');
  const [selectedObject, setSelectedObject] = useState<CelestialObject | null>(null);

  return (
    <div className="w-screen h-screen overflow-hidden bg-black text-white selection:bg-emerald-500/30">
      {/* 3D Scene Layer */}
      <Scene3D
        onSelectObject={setSelectedObject}
        selectedObjectId={selectedObject?.id || null}
      />

      {/* UI Overlay Layer */}
      <UIOverlay
        currentView={currentView}
        onViewChange={setCurrentView}
        selectedObject={selectedObject}
        onClosePanel={() => setSelectedObject(null)}
      />

      {/* 2D Map Layer */}
      <AnimatePresence>
        {currentView === 'map' && (
          <Map2DView
            onSelectObject={(obj) => {
              setSelectedObject(obj);
              setCurrentView('3d');
            }}
            onClose={() => setCurrentView('3d')}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
