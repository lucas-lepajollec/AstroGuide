import { motion, AnimatePresence } from 'motion/react';
import { X, Maximize2, Route, Telescope, Ruler, Info } from 'lucide-react';
import { useAstroStore } from '../store/useAstroStore';
import { useMemo, useEffect, useState } from 'react';
import { celestialObjects } from '../data/mockData';

function typeLabel(type: string) {
    switch (type) {
        case 'star': return 'Étoile';
        case 'planet': return 'Planète';
        case 'galaxy': return 'Galaxie';
        case 'blackhole': return 'Trou Noir';
        case 'system': return 'Système';
        default: return type;
    }
}

function typeBadgeColor(type: string) {
    switch (type) {
        case 'star': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
        case 'planet': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
        case 'galaxy': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
        case 'blackhole': return 'bg-violet-500/20 text-violet-300 border-violet-500/30';
        case 'system': return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
        default: return 'bg-white/10 text-white/70 border-white/20';
    }
}

export default function SidePanel() {
    const selectedAstro = useAstroStore((s) => s.selectedAstro);
    const setSelectedAstro = useAstroStore((s) => s.setSelectedAstro);
    const currentView = useAstroStore((s) => s.currentView);
    const comparisonIds = useAstroStore((s) => s.comparisonIds);
    const isInfoOpen = useAstroStore((s) => s.isInfoOpen);
    const setInfoOpen = useAstroStore((s) => s.setInfoOpen);
    const isCardVisible = useAstroStore((s) => s.isCardVisible);
    const setCardVisible = useAstroStore((s) => s.setCardVisible);

    const [displayAstro, setDisplayAstro] = useState(selectedAstro);

    // Keep displayAstro populated during exit animation 
    useEffect(() => {
        const shouldBeVisible = currentView !== '3D' || isCardVisible;
        if (selectedAstro && shouldBeVisible) {
            setDisplayAstro(selectedAstro);
        } else {
            const timer = setTimeout(() => {
                setDisplayAstro(null);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [selectedAstro, isCardVisible, currentView]);

    const sorted = useMemo(() => {
        if (currentView !== 'SIZE') return [];
        return celestialObjects.filter((o) => comparisonIds.has(o.id)).sort((a, b) => a.sizeKm - b.sizeKm);
    }, [currentView, comparisonIds]);

    const currentIndex = useMemo(() => {
        if (!displayAstro || sorted.length === 0) return 0;
        const idx = sorted.findIndex((o) => o.id === displayAstro.id);
        return idx >= 0 ? idx : 0;
    }, [displayAstro, sorted]);

    return (
        <>
            {/* Mobile floating button to reopen info if closed */}
            <AnimatePresence>
                {selectedAstro && (currentView !== '3D' || isCardVisible) && displayAstro && !isInfoOpen && (
                    <motion.button
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        onClick={() => setInfoOpen(true)}
                        className="md:hidden fixed bottom-16 left-1/2 -translate-x-1/2 z-40 bg-black/80 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 flex items-center gap-2 text-white shadow-xl shadow-black/50"
                    >
                        <Info size={16} className="text-emerald-400" />
                        <span className="text-xs font-medium tracking-wide">Infos sur {displayAstro.name}</span>
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {selectedAstro && (currentView !== '3D' || isCardVisible) && displayAstro && (
                    <motion.div
                        key="side-panel"
                        initial={{ x: window.innerWidth < 1024 ? 0 : 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{
                            x: window.innerWidth < 1024 ? 0 : 300,
                            opacity: 0,
                            transition: window.innerWidth < 1024 ? { duration: 0 } : undefined
                        }}
                        transition={{ type: 'spring', damping: 28, stiffness: 250 }}
                        className={`fixed flex flex-col z-40 pointer-events-auto max-md:transition-all max-md:duration-300 md:opacity-100 md:scale-100 md:translate-y-0 md:pointer-events-auto
                            md:top-24 md:right-0 md:bottom-0 md:left-auto md:w-[300px] md:rounded-none
                            ${isInfoOpen
                                ? 'inset-x-4 top-[20%] bottom-4 rounded-t-3xl border border-white/10 opacity-100 pointer-events-auto translate-y-0'
                                : 'inset-x-4 top-[20%] bottom-4 rounded-t-3xl border border-white/10 opacity-0 pointer-events-none translate-y-20 hidden md:flex'
                            }
                        `}
                    >
                        <div className="h-full bg-black/80 md:bg-black/50 backdrop-blur-xl md:border-l border-white/8 flex flex-col overflow-hidden rounded-t-3xl md:rounded-none">
                            {/* Close button conditionally shown */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    if (window.innerWidth < 1024) {
                                        // On mobile, completely close the panel and info
                                        setInfoOpen(false);
                                        setCardVisible(false);
                                    } else {
                                        // On desktop, only works in 3D view to close
                                        if (currentView === '3D') {
                                            setCardVisible(false);
                                        }
                                    }
                                }}
                                className={`absolute top-4 right-4 z-10 p-1.5 rounded-full bg-black/40 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer backdrop-blur-md flex ${currentView !== '3D' ? 'md:hidden' : 'md:flex'}`}
                            >
                                <X size={14} className="text-white/60" />
                            </button>

                            <div className="flex-1 overflow-y-auto px-4 pt-12 pb-6 custom-scrollbar">
                                {/* Color glow / Texture */}
                                <div className={`relative ${displayAstro.type === 'galaxy' || displayAstro.type === 'blackhole' ? 'w-16 h-16' : 'w-10 h-10'} mx-auto mb-3`}>
                                    {displayAstro.shape === 'tinyStar' && displayAstro.textureUrl ? (
                                        <div
                                            className="absolute inset-0 rounded-full overflow-hidden"
                                            style={{
                                                backgroundColor: displayAstro.color,
                                                boxShadow: `0 0 25px ${displayAstro.color}80, 0 0 50px ${displayAstro.color}40, inset -10px -10px 20px rgba(0,0,0,0.8), inset 5px 5px 15px rgba(255,255,255,0.6)`
                                            }}
                                        >
                                            <div
                                                className="w-full h-full rounded-full"
                                                style={{
                                                    backgroundImage: `url("${displayAstro.textureUrl}")`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                    filter: 'grayscale(1) contrast(1.2) brightness(1.2)',
                                                    mixBlendMode: 'multiply'
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <>
                                            {/* Base background or shadow */}
                                            <div
                                                className="absolute inset-0 rounded-full"
                                                style={{
                                                    backgroundColor: ((displayAstro.type === 'galaxy' || displayAstro.type === 'blackhole') && displayAstro.textureUrl)
                                                        ? (displayAstro.type === 'blackhole' ? '#000000' : 'transparent')
                                                        : displayAstro.color,
                                                    boxShadow: ((displayAstro.type === 'galaxy' || displayAstro.type === 'blackhole') && displayAstro.textureUrl)
                                                        ? 'none'
                                                        : `0 0 25px ${displayAstro.color}80, 0 0 50px ${displayAstro.color}40`,
                                                    transform: displayAstro.type === 'blackhole' ? 'scale(0.35)' : 'none',
                                                }}
                                            />
                                            {/* Texture layer with blend mode */}
                                            {displayAstro.textureUrl && (
                                                <div
                                                    className={`absolute inset-0 pointer-events-none ${displayAstro.type === 'blackhole' ? '' : 'rounded-full'}`}
                                                    style={{
                                                        backgroundImage: `url("${displayAstro.textureUrl}")`,
                                                        backgroundSize: displayAstro.type === 'blackhole' ? 'contain' : 'cover',
                                                        backgroundRepeat: 'no-repeat',
                                                        backgroundPosition: 'center',
                                                        mixBlendMode: 'screen',
                                                        transform: displayAstro.type === 'blackhole' ? 'scale(1.4)' : (displayAstro.type === 'galaxy' ? 'scale(1.2)' : 'none'),
                                                    }}
                                                />
                                            )}
                                        </>
                                    )}
                                </div>

                                <h2 className="text-lg font-bold text-white text-center mb-1">{displayAstro.name}</h2>

                                <div className="flex justify-center mb-4">
                                    <span className={`text-[9px] font-mono uppercase tracking-[0.12em] px-2 py-0.5 rounded-full border ${typeBadgeColor(displayAstro.type)}`}>
                                        {typeLabel(displayAstro.type)}
                                    </span>
                                </div>

                                {/* Size */}
                                <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15 mb-3">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <Maximize2 size={11} className="text-emerald-400" />
                                        <span className="text-[8px] font-mono uppercase tracking-widest text-emerald-400/80">
                                            Taille relative
                                        </span>
                                    </div>
                                    <p className="text-lg font-bold text-emerald-300 leading-tight">
                                        {displayAstro.relativeSize}
                                    </p>
                                    <p className="text-[10px] text-white/30 mt-0.5 font-mono">
                                        {displayAstro.scientificSize}
                                    </p>
                                </div>

                                {/* Distance */}
                                <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15 mb-3">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <Route size={11} className="text-emerald-400" />
                                        <span className="text-[8px] font-mono uppercase tracking-widest text-emerald-400/80">
                                            Distance relative
                                        </span>
                                    </div>
                                    <p className="text-lg font-bold text-emerald-300 leading-tight">
                                        {displayAstro.relativeDistance}
                                    </p>
                                    <p className="text-[10px] text-white/30 mt-0.5 font-mono">
                                        {displayAstro.scientificDistance}
                                    </p>
                                </div>

                                {/* Description */}
                                <div className="mb-3">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <Telescope size={11} className="text-white/40" />
                                        <span className="text-[8px] font-mono uppercase tracking-widest text-white/40">
                                            Description
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-white/60 leading-relaxed">
                                        {displayAstro.description}
                                    </p>
                                </div>

                                {/* Scientific data */}
                                <div className="p-3 rounded-xl bg-white/3 border border-white/5 mb-3">
                                    <div className="flex items-center gap-1.5 mb-2">
                                        <Ruler size={11} className="text-white/30" />
                                        <span className="text-[8px] font-mono uppercase tracking-widest text-white/30">
                                            Données Scientifiques
                                        </span>
                                    </div>
                                    <div className="space-y-1 text-[10px] font-mono text-white/25">
                                        {currentView === 'SIZE' && sorted.length > 0 && (
                                            <div className="flex justify-between">
                                                <span>Rang</span>
                                                <span className="text-emerald-400">{currentIndex + 1}e / {sorted.length}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between">
                                            <span>Taille</span>
                                            <span className="text-white/40">{displayAstro.scientificSize}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Distance</span>
                                            <span className="text-white/40">{displayAstro.scientificDistance}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Constellation */}
                                {displayAstro.constellation && (
                                    <div className="p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/10 text-center">
                                        <span className="text-[8px] font-mono uppercase tracking-widest text-emerald-400/60">
                                            Constellation
                                        </span>
                                        <p className="text-sm text-emerald-300 font-semibold mt-0.5">
                                            {displayAstro.constellation}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence >
        </>
    );
}
