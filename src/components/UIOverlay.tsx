import { motion, AnimatePresence } from 'motion/react';
import { Search, Map, Globe, Crosshair, Info, ChevronRight } from 'lucide-react';
import { CelestialObject } from '../mockData';

interface UIOverlayProps {
  currentView: '3d' | 'map';
  onViewChange: (view: '3d' | 'map') => void;
  selectedObject: CelestialObject | null;
  onClosePanel: () => void;
}

export default function UIOverlay({ currentView, onViewChange, selectedObject, onClosePanel }: UIOverlayProps) {
  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 z-10 overflow-hidden">
      {/* Top Bar */}
      <header className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-emerald-500/30 bg-black/40 backdrop-blur-md flex items-center justify-center pointer-events-auto">
            <Globe className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-xl font-mono font-bold text-white tracking-widest uppercase">AstroGuide</h1>
            <p className="text-xs font-mono text-emerald-400/70 uppercase tracking-widest">Sector 7G - Local Cluster</p>
          </div>
        </div>

        <div className="flex items-center gap-4 pointer-events-auto">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="bg-black/40 backdrop-blur-md border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm font-mono text-white focus:outline-none focus:border-emerald-500/50 transition-colors w-64"
            />
          </div>
        </div>
      </header>

      {/* Side Panel (HUD) */}
      <AnimatePresence>
        {selectedObject && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute right-6 top-24 bottom-24 w-80 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col pointer-events-auto"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="text-xs font-mono text-emerald-400 mb-1 uppercase tracking-wider">{selectedObject.type}</div>
                <h2 className="text-2xl font-mono font-bold text-white">{selectedObject.name}</h2>
              </div>
              <button onClick={onClosePanel} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <Crosshair className="w-5 h-5 text-white/50" />
              </button>
            </div>

            <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <div>
                <div className="text-xs font-mono text-white/50 mb-2 uppercase tracking-wider flex items-center gap-2">
                  <Info className="w-3 h-3" /> Description
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                  {selectedObject.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider mb-1">Distance</div>
                  <div className="text-sm font-mono text-white">{selectedObject.distance}</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider mb-1">Taille relative</div>
                  <div className="text-sm font-mono text-white">{selectedObject.size}x</div>
                </div>
              </div>

              <div>
                <div className="text-xs font-mono text-white/50 mb-2 uppercase tracking-wider">Coordonnées Galactiques</div>
                <div className="bg-black/50 rounded-xl p-3 border border-white/5 font-mono text-xs text-emerald-400/80 flex justify-between">
                  <span>X: {selectedObject.position[0].toFixed(2)}</span>
                  <span>Y: {selectedObject.position[1].toFixed(2)}</span>
                  <span>Z: {selectedObject.position[2].toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button className="mt-6 w-full py-3 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 rounded-xl text-emerald-400 font-mono text-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2">
              Scanner <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <footer className="flex justify-center pointer-events-auto">
        <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-full p-1.5 flex gap-1">
          <button
            onClick={() => onViewChange('3d')}
            className={`px-6 py-2.5 rounded-full text-sm font-mono uppercase tracking-wider transition-all flex items-center gap-2 ${
              currentView === '3d'
                ? 'bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                : 'text-white/50 hover:text-white/80 hover:bg-white/5'
            }`}
          >
            <Globe className="w-4 h-4" /> Exploration 3D
          </button>
          <button
            onClick={() => onViewChange('map')}
            className={`px-6 py-2.5 rounded-full text-sm font-mono uppercase tracking-wider transition-all flex items-center gap-2 ${
              currentView === 'map'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                : 'text-white/50 hover:text-white/80 hover:bg-white/5'
            }`}
          >
            <Map className="w-4 h-4" /> Carte Tactique
          </button>
        </div>
      </footer>
    </div>
  );
}
