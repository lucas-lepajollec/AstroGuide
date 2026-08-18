import Scene3D from './components/Scene3D';
import Map2D from './components/Map2D';
import SizeComparison from './components/SizeComparison';
import Header from './components/Header';
import SidePanel from './components/SidePanel';
import NavPanel from './components/NavPanel';
import { useAstroStore } from './store/useAstroStore';
import { AnimatePresence, useReducedMotion } from 'motion/react';
import LoadingScreen from './components/LoadingScreen';
import { useState, useEffect } from 'react';
import DemoExperience from './components/DemoExperience';
import {isDemoMode} from './config/runtimeMode';

export default function App() {
  const currentView = useAstroStore((s) => s.currentView);
  const [isLoading, setIsLoading] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, prefersReducedMotion ? 150 : 1200);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <main className="w-screen h-dvh min-h-[320px] overflow-hidden bg-black text-white selection:bg-emerald-500/30">
      {/* 3D Scene (always mounted for smooth transitions) */}
      <Scene3D />

      {/* HUD */}
      <Header />

      {/* Left Navigation Panel (visible in all views) */}
      <NavPanel />

      {/* Right Side Panel (selected details) */}
      <SidePanel />

      {/* Overlay views */}
      <AnimatePresence>
        {currentView === '2D' && <Map2D />}
        {currentView === 'SIZE' && <SizeComparison />}
      </AnimatePresence>

      {/* Loading Screen Overlay (highest z-index) */}
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      {isDemoMode && !isLoading && <DemoExperience />}
    </main>
  );
}
