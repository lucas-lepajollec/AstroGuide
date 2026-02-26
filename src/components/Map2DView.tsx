import { motion } from 'motion/react';
import { celestialObjects, CelestialObject } from '../mockData';
import { useState, useRef, useEffect } from 'react';
import { Crosshair, ZoomIn, ZoomOut } from 'lucide-react';

interface Map2DViewProps {
  onSelectObject: (obj: CelestialObject) => void;
  onClose: () => void;
}

export default function Map2DView({ onSelectObject, onClose }: Map2DViewProps) {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    dragStart.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    setOffset({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomSensitivity = 0.001;
    const newScale = Math.max(0.1, Math.min(5, scale - e.deltaY * zoomSensitivity));
    setScale(newScale);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 bg-[#020813] z-20 overflow-hidden flex flex-col"
    >
      {/* Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, #10b981 1px, transparent 1px),
            linear-gradient(to bottom, #10b981 1px, transparent 1px)
          `,
          backgroundSize: `${50 * scale}px ${50 * scale}px`,
          backgroundPosition: `${offset.x}px ${offset.y}px`,
        }}
      />

      {/* Map Content */}
      <div
        className="flex-1 relative cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onWheel={handleWheel}
      >
        <div
          className="absolute top-1/2 left-1/2"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            transformOrigin: '0 0',
          }}
        >
          {celestialObjects.map((obj) => (
            <div
              key={obj.id}
              className="absolute group"
              style={{
                left: obj.position[0] * 2,
                top: obj.position[2] * 2, // Map Z to Y for 2D view
                transform: 'translate(-50%, -50%)',
              }}
              onClick={(e) => {
                e.stopPropagation();
                onSelectObject(obj);
                onClose();
              }}
            >
              <div
                className="w-4 h-4 rounded-full border border-white/30 flex items-center justify-center transition-transform group-hover:scale-150 group-hover:border-emerald-400"
                style={{ backgroundColor: obj.color + '40' }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: obj.color }}
                />
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                <div className="bg-black/80 backdrop-blur border border-emerald-500/30 px-2 py-1 rounded text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                  {obj.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map Controls Overlay */}
      <div className="absolute top-6 right-6 flex flex-col gap-2">
        <button
          onClick={() => setScale((s) => Math.min(5, s + 0.2))}
          className="w-10 h-10 bg-black/60 backdrop-blur border border-white/10 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          onClick={() => setScale((s) => Math.max(0.1, s - 0.2))}
          className="w-10 h-10 bg-black/60 backdrop-blur border border-white/10 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <button
          onClick={() => {
            setScale(1);
            setOffset({ x: 0, y: 0 });
          }}
          className="w-10 h-10 bg-black/60 backdrop-blur border border-white/10 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors mt-4"
        >
          <Crosshair className="w-5 h-5" />
        </button>
      </div>

      {/* Map Legend/Info */}
      <div className="absolute bottom-6 left-6 pointer-events-none">
        <div className="bg-black/60 backdrop-blur border border-white/10 rounded-xl p-4">
          <h3 className="text-xs font-mono text-white/50 uppercase tracking-widest mb-3">Légende</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#FDB813]" />
              <span className="text-[10px] font-mono text-white/70 uppercase">Étoile</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#2B82C9]" />
              <span className="text-[10px] font-mono text-white/70 uppercase">Planète</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#9B59B6]" />
              <span className="text-[10px] font-mono text-white/70 uppercase">Galaxie</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
