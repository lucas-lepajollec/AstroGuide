import { useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { celestialObjects } from '../data/mockData';
import { useAstroStore } from '../store/useAstroStore';
import { ChevronLeft, ChevronRight, Maximize2, Route, Telescope, Ruler } from 'lucide-react';

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
        case 'star': return 'border-yellow-500/30 text-yellow-300';
        case 'planet': return 'border-blue-500/30 text-blue-300';
        case 'galaxy': return 'border-purple-500/30 text-purple-300';
        case 'blackhole': return 'border-violet-500/30 text-violet-300';
        case 'system': return 'border-amber-500/30 text-amber-300';
        default: return 'border-white/20 text-white/60';
    }
}

export default function SizeComparison() {
    const selectedAstro = useAstroStore((s) => s.selectedAstro);
    const setSelectedAstro = useAstroStore((s) => s.setSelectedAstro);
    const comparisonIds = useAstroStore((s) => s.comparisonIds);
    const setCardVisible = useAstroStore((s) => s.setCardVisible);

    // All objects sorted by size
    const allSorted = useMemo(
        () => [...celestialObjects].sort((a, b) => a.sizeKm - b.sizeKm),
        []
    );

    // Filtered sorted list from store
    const sorted = useMemo(
        () => allSorted.filter((o) => comparisonIds.has(o.id)),
        [allSorted, comparisonIds]
    );

    const currentIndex = useMemo(() => {
        if (!selectedAstro || sorted.length === 0) return 0;
        const idx = sorted.findIndex((o) => o.id === selectedAstro.id);
        return idx >= 0 ? idx : 0;
    }, [selectedAstro, sorted]);

    const current = sorted.length > 0 ? sorted[currentIndex] : null;
    const prev1 = currentIndex > 0 ? sorted[currentIndex - 1] : null;
    const prev2 = currentIndex > 1 ? sorted[currentIndex - 2] : null;

    const goPrev = useCallback(() => {
        if (currentIndex > 0 && sorted.length > 0) {
            setSelectedAstro(sorted[currentIndex - 1]);
            setCardVisible(true);
        }
    }, [currentIndex, sorted, setSelectedAstro, setCardVisible]);

    const goNext = useCallback(() => {
        if (currentIndex < sorted.length - 1) {
            setSelectedAstro(sorted[currentIndex + 1]);
            setCardVisible(true);
        }
    }, [currentIndex, sorted, setSelectedAstro, setCardVisible]);

    // Force selection on mount so SidePanel always shows up
    useEffect(() => {
        if (!selectedAstro && sorted.length > 0) {
            setSelectedAstro(sorted[0]);
            setCardVisible(true);
        }
    }, [selectedAstro, sorted, setSelectedAstro, setCardVisible]);

    // Visual sizes — LINEAR ratio (true to scale)
    const getVisualSize = useCallback(
        (sizeKm: number, currentSizeKm: number) => {
            const isMobile = window.innerWidth < 1024;
            const maxPx = isMobile ? 180 : 350;
            const minPx = 6;
            if (sizeKm >= currentSizeKm) return maxPx;
            const ratio = sizeKm / currentSizeKm;
            const scaled = ratio * maxPx;
            return Math.max(minPx, Math.min(scaled, maxPx));
        },
        []
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-30 bg-[#030610]"
        >
            {/* Content area - offset for NavPanel (220px) and SidePanel (300px) on desktop, full width on mobile */}
            <div className="absolute left-0 right-0 md:left-[220px] md:right-[300px] top-[80px] md:top-24 bottom-0 flex">
                {/* Ligne de séparation horizontale supérieure (Desktop uniquement) */}
                <div className="hidden md:block absolute top-0 left-0 right-0 h-[1px] bg-white/10 z-10"></div>

                {/* LEFT: Comparison visual area */}
                <div className="flex-1 flex flex-col relative w-full overflow-hidden">
                    {/* Top bar */}
                    <div className="flex items-center justify-between px-6 pt-4 pb-2">
                        <div>
                            <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-emerald-400">
                                Comparaison des Tailles
                            </h2>
                            <p className="text-[9px] font-mono text-white/30 mt-1">
                                Du plus petit au plus grand • {sorted.length}/{allSorted.length} éléments
                            </p>
                        </div>
                        {current && (
                            <span className="text-xs font-mono text-white/30">
                                #{currentIndex + 1} / {sorted.length}
                            </span>
                        )}
                    </div>

                    {/* Main visual area with spheres */}
                    {!current ? (
                        <div className="flex-1 flex items-center justify-center">
                            <p className="text-white/30 font-mono text-sm text-center px-6">
                                Sélectionnez des éléments dans le menu à gauche
                            </p>
                        </div>
                    ) : (
                        <div className="flex-1 flex items-center justify-center relative px-2 md:px-16 w-full">
                            {/* Prev Arrow */}
                            <button
                                onClick={goPrev}
                                disabled={currentIndex === 0}
                                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-emerald-500/30 hover:bg-emerald-500/20 transition-all disabled:opacity-20 cursor-pointer text-emerald-400 shadow-lg shadow-black/40"
                            >
                                <ChevronLeft size={18} />
                            </button>

                            {/* Next Arrow */}
                            <button
                                onClick={goNext}
                                disabled={currentIndex === sorted.length - 1}
                                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-emerald-500/30 hover:bg-emerald-500/20 transition-all disabled:opacity-20 cursor-pointer text-emerald-400 shadow-lg shadow-black/40"
                            >
                                <ChevronRight size={18} />
                            </button>

                            {/* Floor line */}
                            <div className="absolute bottom-[12%] left-4 right-4 md:left-16 md:right-16 h-[1px] bg-white/10" />

                            {/* Spheres: prev2, prev1, current — aligned bottom */}
                            {/* SVG Filter to map luminance to alpha for the black hole JPG */}
                            <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                                <filter id="knockout-black" colorInterpolationFilters="sRGB">
                                    <feColorMatrix type="matrix" values="
                                            1 0 0 0 0
                                            0 1 0 0 0
                                            0 0 1 0 0
                                            0.33 0.33 0.33 0 0" />
                                </filter>
                            </svg>
                            <div className="flex items-end gap-2 md:gap-10 justify-center w-full max-w-full">
                                <AnimatePresence mode="popLayout">
                                    {/* prev2 (2 steps back) */}
                                    {prev2 && (
                                        <motion.div
                                            key={`p2-${prev2.id}`}
                                            initial={{ opacity: 0, x: -60, scale: 0.5 }}
                                            animate={{ opacity: 1, x: 0, scale: 1 }}
                                            exit={{ opacity: 0, x: -60, scale: 0.5 }}
                                            transition={{ type: 'spring', damping: 22, stiffness: 120 }}
                                            className="flex flex-col items-center cursor-pointer shrink-0"
                                            onClick={goPrev}
                                        >
                                            <div
                                                className="relative transition-all duration-500"
                                                style={{
                                                    width: getVisualSize(prev2.sizeKm, current.sizeKm),
                                                    height: getVisualSize(prev2.sizeKm, current.sizeKm),
                                                }}
                                            >
                                                <div
                                                    className="absolute inset-0 rounded-full"
                                                    style={{
                                                        backgroundColor: ((prev2.type === 'galaxy' || prev2.type === 'blackhole') && prev2.textureUrl) ? (prev2.type === 'blackhole' ? '#000000' : 'transparent') : prev2.color,
                                                        boxShadow: ((prev2.type === 'galaxy' || prev2.type === 'blackhole') && prev2.textureUrl) ? 'none' : `0 0 20px ${prev2.color}60`,
                                                    }}
                                                />

                                                <div
                                                    className="absolute inset-0 rounded-full"
                                                    style={{
                                                        backgroundColor: ((prev2.type === 'galaxy' || prev2.type === 'blackhole') && prev2.textureUrl) ? (prev2.type === 'blackhole' ? '#000000' : 'transparent') : prev2.color,
                                                        boxShadow: ((prev2.type === 'galaxy' || prev2.type === 'blackhole') && prev2.textureUrl) ? 'none' : `0 0 20px ${prev2.color}60`,
                                                    }}
                                                />

                                                {/* Background Oversized Texture for Blackholes */}
                                                {prev2.type === 'blackhole' && prev2.textureUrl && (
                                                    <div className="absolute pointer-events-none w-[260%] h-[260%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                                                        style={{
                                                            mixBlendMode: 'screen',
                                                            filter: 'url(#knockout-black)',
                                                            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 75%)',
                                                            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 75%)',
                                                        }}
                                                    >
                                                        <div
                                                            className="w-full h-full"
                                                            style={{
                                                                transform: 'rotate(90deg)',
                                                                backgroundImage: `url("${prev2.textureUrl}")`,
                                                                backgroundSize: 'contain',
                                                                backgroundRepeat: 'no-repeat',
                                                                backgroundPosition: 'center',
                                                            }}
                                                        />
                                                    </div>
                                                )}

                                                {/* Standard Texture Layer for Galaxies/Planets/Stars */}
                                                {prev2.shape === 'tinyStar' && prev2.textureUrl ? (
                                                    <div
                                                        className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
                                                        style={{
                                                            backgroundColor: prev2.color,
                                                            boxShadow: `inset -12px -12px 24px rgba(0,0,0,0.7), inset 5px 5px 15px rgba(255,255,255,0.4)`
                                                        }}
                                                    >
                                                        <div
                                                            className="w-full h-full rounded-full"
                                                            style={{
                                                                backgroundImage: `url("${prev2.textureUrl}")`,
                                                                backgroundSize: 'cover',
                                                                backgroundPosition: 'center',
                                                                filter: 'grayscale(1) contrast(1.2) brightness(1.2)',
                                                                mixBlendMode: 'multiply'
                                                            }}
                                                        />
                                                    </div>
                                                ) : (
                                                    prev2.type !== 'blackhole' && prev2.textureUrl && (
                                                        <div
                                                            className="absolute inset-0 rounded-full pointer-events-none"
                                                            style={{
                                                                backgroundImage: `url("${prev2.textureUrl}")`,
                                                                backgroundSize: 'cover',
                                                                backgroundPosition: 'center',
                                                                mixBlendMode: prev2.type === 'galaxy' ? 'screen' : 'normal',
                                                                transform: prev2.type === 'galaxy' ? 'scale(1.4)' : 'none',
                                                            }}
                                                        />
                                                    )
                                                )}
                                            </div>
                                            <p className="text-[10px] font-mono text-white/60 mt-2 text-center max-w-[90px] truncate">{prev2.name}</p>
                                        </motion.div>
                                    )}

                                    {/* prev1 (1 step back) */}
                                    {prev1 && (
                                        <motion.div
                                            key={`p1-${prev1.id}`}
                                            initial={{ opacity: 0, x: -40, scale: 0.7 }}
                                            animate={{ opacity: 1, x: 0, scale: 1 }}
                                            exit={{ opacity: 0, x: -60, scale: 0.5 }}
                                            transition={{ type: 'spring', damping: 22, stiffness: 120 }}
                                            className="flex flex-col items-center cursor-pointer shrink-0"
                                            onClick={goPrev}
                                        >
                                            <div
                                                className="relative transition-all duration-500"
                                                style={{
                                                    width: getVisualSize(prev1.sizeKm, current.sizeKm),
                                                    height: getVisualSize(prev1.sizeKm, current.sizeKm),
                                                }}
                                            >
                                                <div
                                                    className="absolute inset-0 rounded-full"
                                                    style={{
                                                        backgroundColor: ((prev1.type === 'galaxy' || prev1.type === 'blackhole') && prev1.textureUrl) ? (prev1.type === 'blackhole' ? '#000000' : 'transparent') : prev1.color,
                                                        boxShadow: ((prev1.type === 'galaxy' || prev1.type === 'blackhole') && prev1.textureUrl) ? 'none' : `0 0 20px ${prev1.color}60`,
                                                    }}
                                                />

                                                <div
                                                    className="absolute inset-0 rounded-full"
                                                    style={{
                                                        backgroundColor: ((prev1.type === 'galaxy' || prev1.type === 'blackhole') && prev1.textureUrl) ? (prev1.type === 'blackhole' ? '#000000' : 'transparent') : prev1.color,
                                                        boxShadow: ((prev1.type === 'galaxy' || prev1.type === 'blackhole') && prev1.textureUrl) ? 'none' : `0 0 20px ${prev1.color}60`,
                                                    }}
                                                />

                                                {/* Background Oversized Texture for Blackholes */}
                                                {prev1.type === 'blackhole' && prev1.textureUrl && (
                                                    <div className="absolute pointer-events-none w-[260%] h-[260%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                                                        style={{
                                                            mixBlendMode: 'screen',
                                                            filter: 'url(#knockout-black)',
                                                            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 75%)',
                                                            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 75%)',
                                                        }}
                                                    >
                                                        <div
                                                            className="w-full h-full"
                                                            style={{
                                                                transform: 'rotate(90deg)',
                                                                backgroundImage: `url("${prev1.textureUrl}")`,
                                                                backgroundSize: 'contain',
                                                                backgroundRepeat: 'no-repeat',
                                                                backgroundPosition: 'center',
                                                            }}
                                                        />
                                                    </div>
                                                )}

                                                {/* Standard Texture Layer for Galaxies/Planets/Stars */}
                                                {prev1.shape === 'tinyStar' && prev1.textureUrl ? (
                                                    <div
                                                        className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
                                                        style={{
                                                            backgroundColor: prev1.color,
                                                            boxShadow: `inset -16px -16px 32px rgba(0,0,0,0.8), inset 8px 8px 20px rgba(255,255,255,0.5)`
                                                        }}
                                                    >
                                                        <div
                                                            className="w-full h-full rounded-full"
                                                            style={{
                                                                backgroundImage: `url("${prev1.textureUrl}")`,
                                                                backgroundSize: 'cover',
                                                                backgroundPosition: 'center',
                                                                filter: 'grayscale(1) contrast(1.2) brightness(1.2)',
                                                                mixBlendMode: 'multiply'
                                                            }}
                                                        />
                                                    </div>
                                                ) : (
                                                    prev1.type !== 'blackhole' && prev1.textureUrl && (
                                                        <div
                                                            className="absolute inset-0 rounded-full pointer-events-none"
                                                            style={{
                                                                backgroundImage: `url("${prev1.textureUrl}")`,
                                                                backgroundSize: 'cover',
                                                                backgroundPosition: 'center',
                                                                mixBlendMode: prev1.type === 'galaxy' ? 'screen' : 'normal',
                                                                transform: prev1.type === 'galaxy' ? 'scale(1.4)' : 'none',
                                                            }}
                                                        />
                                                    )
                                                )}
                                            </div>
                                            <p className="text-[11px] font-mono text-white/70 mt-2 text-center max-w-[100px] truncate">{prev1.name}</p>
                                            {prev1.sizeKm < current.sizeKm && (
                                                <p className="text-[9px] font-mono text-white/40 mt-0.5">
                                                    {(current.sizeKm / prev1.sizeKm).toFixed(1)}× plus petit
                                                </p>
                                            )}
                                        </motion.div>
                                    )}

                                    {/* Current (selected) — always the biggest visually */}
                                    <motion.div
                                        key={`cur-${current.id}`}
                                        initial={{ opacity: 0, scale: 0.3, x: 60 }}
                                        animate={{ opacity: 1, scale: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 1.3, x: 60 }}
                                        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                                        className="flex flex-col items-center shrink-0"
                                    >
                                        {/* Rank */}
                                        <div className="mb-3 px-3 h-5 flex items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                            <span className="text-[10px] leading-none font-mono text-emerald-400">
                                                #{currentIndex + 1}
                                            </span>
                                        </div>

                                        {/* Container for Sphere layers */}
                                        <motion.div
                                            className="relative"
                                            animate={{
                                                width: getVisualSize(current.sizeKm, current.sizeKm),
                                                height: getVisualSize(current.sizeKm, current.sizeKm),
                                            }}
                                            transition={{ type: 'spring', damping: 18, stiffness: 80 }}
                                            style={{
                                                width: getVisualSize(current.sizeKm, current.sizeKm),
                                                height: getVisualSize(current.sizeKm, current.sizeKm),
                                            }}
                                        >
                                            {/* Base / Shadow Layer */}
                                            <div
                                                className="absolute inset-0 rounded-full"
                                                style={{
                                                    backgroundColor: ((current.type === 'galaxy' || current.type === 'blackhole') && current.textureUrl)
                                                        ? (current.type === 'blackhole' ? '#000000' : 'transparent')
                                                        : current.color,
                                                    boxShadow: ((current.type === 'galaxy' || current.type === 'blackhole') && current.textureUrl)
                                                        ? 'none'
                                                        : `0 0 50px ${current.color}80, 0 0 100px ${current.color}40`,
                                                }}
                                            />

                                            {/* Background Oversized Texture for Black Hole */}
                                            {current.type === 'blackhole' && current.textureUrl && (
                                                <div className="absolute pointer-events-none w-[260%] h-[260%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                                                    style={{
                                                        mixBlendMode: 'screen',
                                                        filter: 'url(#knockout-black)',
                                                        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 75%)',
                                                        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 75%)',
                                                    }}
                                                >
                                                    <div
                                                        className="w-full h-full"
                                                        style={{
                                                            transform: 'rotate(90deg)',
                                                            backgroundImage: `url("${current.textureUrl}")`,
                                                            backgroundSize: 'contain',
                                                            backgroundRepeat: 'no-repeat',
                                                            backgroundPosition: 'center',
                                                        }}
                                                    />
                                                </div>
                                            )}

                                            {/* Standard Texture Layer for Galaxies/Planets/Stars */}
                                            {current.shape === 'tinyStar' && current.textureUrl ? (
                                                <div
                                                    className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
                                                    style={{
                                                        backgroundColor: current.color,
                                                        boxShadow: `inset -20px -20px 40px rgba(0,0,0,0.8), inset 10px 10px 30px rgba(255,255,255,0.6)`
                                                    }}
                                                >
                                                    <div
                                                        className="w-full h-full rounded-full"
                                                        style={{
                                                            backgroundImage: `url("${current.textureUrl}")`,
                                                            backgroundSize: 'cover',
                                                            backgroundPosition: 'center',
                                                            filter: 'grayscale(1) contrast(1.2) brightness(1.2)',
                                                            mixBlendMode: 'multiply'
                                                        }}
                                                    />
                                                </div>
                                            ) : (
                                                current.type !== 'blackhole' && current.textureUrl && (
                                                    <div
                                                        className="absolute inset-0 pointer-events-none"
                                                        style={{
                                                            backgroundImage: `url("${current.textureUrl}")`,
                                                            backgroundSize: 'cover',
                                                            backgroundPosition: 'center',
                                                            borderRadius: current.type === 'galaxy' ? '0' : '9999px',
                                                            mixBlendMode: current.type === 'galaxy' ? 'screen' : 'normal',
                                                            transform: current.type === 'galaxy' ? 'scale(1.4)' : 'none',
                                                        }}
                                                    />
                                                )
                                            )}
                                            {/* Extra decoration for black holes without textures */}
                                            {current.type === 'blackhole' && !current.textureUrl && (
                                                <motion.div
                                                    className="absolute inset-[-6px] rounded-full border-2 border-purple-500/40"
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                                                />
                                            )}
                                        </motion.div>

                                        {/* Name */}
                                        <h3 className="text-lg font-bold text-white mt-3">{current.name}</h3>
                                        <span className={`text-[8px] font-mono uppercase tracking-[0.15em] px-2 py-0.5 rounded-full border mt-1 ${typeBadgeColor(current.type)}`}>
                                            {typeLabel(current.type)}
                                        </span>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    )}

                    {/* Progress bar */}
                    {current && sorted.length > 0 && (
                        <div className="px-6 pb-3">
                            <div className="relative h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    className="absolute top-0 left-0 h-full bg-emerald-500/30 rounded-full"
                                    animate={{ width: `${((currentIndex + 1) / sorted.length) * 100}%` }}
                                    transition={{ type: 'spring', damping: 20 }}
                                />
                            </div>
                            <div className="flex justify-between mt-1 text-[8px] font-mono text-white/20">
                                <span>{sorted[0]?.name}</span>
                                <span>{sorted[sorted.length - 1]?.name}</span>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </motion.div >
    );
}
