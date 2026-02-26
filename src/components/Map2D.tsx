import { useMemo, useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { celestialObjects, constellationLines, type CelestialObject } from '../data/mockData';
import { useAstroStore } from '../store/useAstroStore';
import { Eye, Focus, Plus, Minus } from 'lucide-react';

function mapRange(v: number, inMin: number, inMax: number, outMin: number, outMax: number) {
    return ((v - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

function typeIcon(type: CelestialObject['type']) {
    switch (type) {
        case 'star': return '★';
        case 'planet': return '●';
        case 'galaxy': return '✦';
        case 'blackhole': return '◉';
        case 'system': return '◎';
    }
}

function RadarGrid() {
    return (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            {[15, 30, 45].map((r) => (
                <circle key={r} cx="50%" cy="50%" r={`${r}%`} fill="none" stroke="rgba(16,185,129,0.12)" strokeWidth="1" />
            ))}
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="rgba(16,185,129,0.15)" strokeWidth="1" />
            <line x1="0" y1="50%" x2="100%" y2="100%" stroke="rgba(16,185,129,0.06)" strokeWidth="1" />
            <line x1="100%" y1="0" x2="0" y2="100%" stroke="rgba(16,185,129,0.06)" strokeWidth="1" />
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(16,185,129,0.15)" strokeWidth="1" />
        </svg>
    );
}

function SweepLine() {
    return (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <motion.div
                className="absolute w-full h-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
                <div
                    className="absolute top-1/2 left-1/2 h-[1px] origin-left"
                    style={{ width: '45%', background: 'linear-gradient(90deg, rgba(16,185,129,0.5) 0%, rgba(16,185,129,0) 100%)' }}
                />
            </motion.div>
        </div>
    );
}

export default function Map2D() {
    const setSelectedAstro = useAstroStore((s) => s.setSelectedAstro);
    const setView = useAstroStore((s) => s.setView);
    const selectedAstro = useAstroStore((s) => s.selectedAstro);
    const setCardVisible = useAstroStore((s) => s.setCardVisible);

    // Ensure a default selection so the side panel is always open in MAP view
    useEffect(() => {
        if (!selectedAstro) {
            setSelectedAstro(celestialObjects.find(o => o.id === 'sun') || null);
            setCardVisible(true);
        }
    }, [selectedAstro, setSelectedAstro, setCardVisible]);

    const [viewTransform, setViewTransform] = useState({ scale: 1, x: 0, y: 0 });
    const pointersRef = useRef<Map<number, { x: number, y: number }>>(new Map());
    const gestureRef = useRef({ type: 'none', startDist: 0, startScale: 1, startCenter: { x: 0, y: 0 }, startPan: { x: 0, y: 0 } });
    const containerRef = useRef<HTMLDivElement>(null);

    const getClampedTransform = (rawScale: number, rawX: number, rawY: number) => {
        let scale = Math.max(1, Math.min(rawScale, 20));
        if (scale <= 1) return { scale: 1, x: 0, y: 0 };

        let x = rawX;
        let y = rawY;
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
            // maxPan is scaled out based on container radius to prevent map leaving screen
            const maxPan = (rect.width / 2) * (scale - 1) + 20;
            const d = Math.sqrt(x * x + y * y);
            if (d > maxPan) {
                x = (x / d) * maxPan;
                y = (y / d) * maxPan;
            }
        }
        return { scale, x, y };
    };

    const handlePointerDown = (e: React.PointerEvent) => {
        pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
        if (pointersRef.current.size === 1) {
            const el = document.elementFromPoint(e.clientX, e.clientY);
            const astroId = el?.closest('[data-astro-id]')?.getAttribute('data-astro-id');
            if (astroId) {
                gestureRef.current.type = 'select'; // Drag to select
                const obj = celestialObjects.find(o => o.id === astroId);
                if (obj && selectedAstro?.id !== obj.id) {
                    setSelectedAstro(obj);
                    setCardVisible(true);
                }
            } else {
                gestureRef.current.type = 'pan'; // 1-finger pan if clicked on empty space
                gestureRef.current.startCenter = { x: e.clientX, y: e.clientY };
                gestureRef.current.startPan = { ...viewTransform };
            }
        } else if (pointersRef.current.size === 2) {
            gestureRef.current.type = 'panzoom'; // Pinch to zoom / 2-finger pan
            const pts = Array.from(pointersRef.current.values());
            const dx = pts[0].x - pts[1].x;
            const dy = pts[0].y - pts[1].y;
            gestureRef.current.startDist = Math.sqrt(dx * dx + dy * dy);
            gestureRef.current.startScale = viewTransform.scale;
            gestureRef.current.startCenter = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 };
            gestureRef.current.startPan = { ...viewTransform };
        }
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!pointersRef.current.has(e.pointerId)) return;
        pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

        if (gestureRef.current.type === 'pan') {
            const dx = e.clientX - gestureRef.current.startCenter.x;
            const dy = e.clientY - gestureRef.current.startCenter.y;
            setViewTransform(prev => getClampedTransform(prev.scale, gestureRef.current.startPan.x + dx, gestureRef.current.startPan.y + dy));
        } else if (gestureRef.current.type === 'panzoom' && pointersRef.current.size === 2) {
            const pts = Array.from(pointersRef.current.values());
            const dist = Math.sqrt((pts[0].x - pts[1].x) ** 2 + (pts[0].y - pts[1].y) ** 2);

            const clientCenterX = (pts[0].x + pts[1].x) / 2;
            const clientCenterY = (pts[0].y + pts[1].y) / 2;

            let newScale = gestureRef.current.startScale * (dist / gestureRef.current.startDist);
            newScale = Math.max(1, Math.min(newScale, 20)); // Limit scale before calculating ratio to prevent shift

            const rect = containerRef.current?.getBoundingClientRect();
            let panX = 0; let panY = 0;
            if (rect) {
                const mouseX = gestureRef.current.startCenter.x - (rect.left + rect.width / 2);
                const mouseY = gestureRef.current.startCenter.y - (rect.top + rect.height / 2);

                const ratio = newScale / gestureRef.current.startScale;
                const dpx = (mouseX - gestureRef.current.startPan.x) * (ratio - 1);
                const dpy = (mouseY - gestureRef.current.startPan.y) * (ratio - 1);

                panX = gestureRef.current.startPan.x - dpx + (clientCenterX - gestureRef.current.startCenter.x);
                panY = gestureRef.current.startPan.y - dpy + (clientCenterY - gestureRef.current.startCenter.y);
            }

            setViewTransform(getClampedTransform(newScale, panX, panY));
        }
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        pointersRef.current.delete(e.pointerId);
        if (pointersRef.current.size === 0) {
            gestureRef.current.type = 'none';
        } else if (pointersRef.current.size === 1) {
            gestureRef.current.type = 'pan'; // fallback to pan if one finger remains
            const pts = Array.from(pointersRef.current.values());
            gestureRef.current.startCenter = { x: pts[0].x, y: pts[0].y };
            gestureRef.current.startPan = { ...viewTransform };
        }
    };

    const handleWheel = (e: React.WheelEvent) => {
        if (!containerRef.current) return;
        // Obtenir la position de la souris par rapport au centre du CONTENEUR radar
        const rect = containerRef.current.getBoundingClientRect();
        const mouseX = e.clientX - (rect.left + rect.width / 2);
        const mouseY = e.clientY - (rect.top + rect.height / 2);

        setViewTransform(prev => {
            let newScale = prev.scale * (1 - Math.sign(e.deltaY) * 0.15);
            newScale = Math.max(1, Math.min(newScale, 20)); // Limit scale before ratio calculation
            if (newScale === prev.scale) return prev; // Avoid drift when zooming past limits

            // Calculer le décalage pour zoomer vers la souris
            const ratio = newScale / prev.scale;
            const dx = (mouseX - prev.x) * (ratio - 1);
            const dy = (mouseY - prev.y) * (ratio - 1);

            return getClampedTransform(newScale, prev.x - dx, prev.y - dy);
        });
    };

    const mapped = useMemo(() => {
        // Only map non-systemCircle objects for dots
        const dotObjects = celestialObjects.filter((o) => !o.systemCircle);

        // Find the absolute maximum distance from center (0,0) to ensure perfect radial bounds
        let maxDist = 0;
        for (const o of dotObjects) {
            const d = Math.sqrt(o.position[0] ** 2 + o.position[2] ** 2);
            if (d > maxDist) maxDist = d;
        }

        // Add 15% distance padding so edge items (like TON 618) aren't glued to the visual radar border
        const pad = maxDist * 0.15;
        const limit = maxDist + pad;

        return dotObjects.map((obj) => ({
            obj,
            px: mapRange(obj.position[0], -limit, limit, 8, 92),
            py: mapRange(obj.position[2], -limit, limit, 8, 92),
        }));
    }, []);

    // Solar system bounding circle
    const solarSystemCircle = useMemo(() => {
        const solarIds = new Set(['sun', 'mercury', 'venus', 'earth', 'moon', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto']);
        const solarMapped = mapped.filter(({ obj }) => solarIds.has(obj.id));
        if (solarMapped.length === 0) return null;
        const cx = solarMapped.reduce((s, m) => s + m.px, 0) / solarMapped.length;
        const cy = solarMapped.reduce((s, m) => s + m.py, 0) / solarMapped.length;
        let maxR = 0;
        for (const m of solarMapped) {
            const r = Math.sqrt((m.px - cx) ** 2 + (m.py - cy) ** 2);
            if (r > maxR) maxR = r;
        }
        return { cx, cy, r: maxR + 3 }; // +3% padding
    }, [mapped]);

    const svgLines = useMemo(() => {
        const idToPos = new Map(mapped.map((m) => [m.obj.id, { x: m.px, y: m.py }]));
        const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
        for (const pairs of Object.values(constellationLines)) {
            for (const [fromId, toId] of pairs) {
                const a = idToPos.get(fromId);
                const b = idToPos.get(toId);
                if (a && b) lines.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y });
            }
        }
        return lines;
    }, [mapped]);

    const handleClick = (obj: CelestialObject) => {
        setSelectedAstro(obj);
    };

    const handleViewElement = () => {
        if (selectedAstro) {
            setView('3D');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-30 bg-black/85 backdrop-blur-md touch-none overflow-hidden"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onPointerMove={handlePointerMove}
            onWheel={handleWheel}
        >
            <div className="absolute left-0 right-0 md:left-[220px] md:right-[300px] top-[80px] md:top-24 bottom-0 flex items-center justify-center pb-20 md:pb-0 pointer-events-none">
                {/* Ligne de séparation horizontale supérieure (Desktop uniquement) */}
                <div className="hidden md:block absolute top-0 left-0 right-0 h-[1px] bg-white/10 z-10"></div>

                {/* View Controls */}
                <div className="absolute top-4 right-4 md:top-4 md:right-auto md:left-6 z-50 flex md:flex-row flex-col items-end md:items-center gap-3 pointer-events-auto">
                    {selectedAstro && (
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={handleViewElement}
                            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 hover:bg-emerald-500/25 transition-all cursor-pointer shadow-lg shadow-black/40"
                        >
                            <Eye size={14} className="text-emerald-400" />
                            <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-300">
                                Voir l'élément
                            </span>
                        </motion.button>
                    )}

                    <div className="flex md:flex-row flex-col gap-2">
                        <button
                            onClick={() => setViewTransform(v => getClampedTransform(v.scale * 1.5, v.x * 1.5, v.y * 1.5))}
                            className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer text-white/70"
                        >
                            <Plus size={16} />
                        </button>
                        <button
                            onClick={() => setViewTransform(v => getClampedTransform(v.scale / 1.5, v.x / 1.5, v.y / 1.5))}
                            className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer text-white/70"
                        >
                            <Minus size={16} />
                        </button>
                        <button
                            onClick={() => setViewTransform({ scale: 1, x: 0, y: 0 })}
                            className={`p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer text-white/70 ${viewTransform.scale > 1 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                            title="Réinitialiser la vue"
                        >
                            <Focus size={16} />
                        </button>
                    </div>
                </div>

                {/* Radar Container - Fixed Boundary */}
                <div
                    ref={containerRef}
                    className="relative w-[min(90vw,75vh)] h-[min(90vw,75vh)] md:w-[min(65vh,55vw)] md:h-[min(65vh,55vw)] rounded-full border border-emerald-500/20 bg-black/50 overflow-hidden pointer-events-none"
                    style={{ maskImage: 'radial-gradient(circle, white 100%, black 100%)', WebkitMaskImage: 'radial-gradient(circle, white 100%, black 100%)' }}
                >
                    {/* Inner Zoomable Content */}
                    <div
                        className="absolute inset-0 w-full h-full"
                        style={{
                            transform: `translate(${viewTransform.x}px, ${viewTransform.y}px) scale(${viewTransform.scale})`,
                            transition: gestureRef.current.type === 'none' ? 'transform 0.25s ease-out' : 'none'
                        }}
                    >
                        <RadarGrid />
                        <SweepLine />

                        {/* Solar System circle */}
                        {solarSystemCircle && (
                            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
                                <ellipse
                                    cx={`${solarSystemCircle.cx}%`}
                                    cy={`${solarSystemCircle.cy}%`}
                                    rx={`${solarSystemCircle.r}%`}
                                    ry={`${solarSystemCircle.r}%`}
                                    fill="rgba(255,215,0,0.03)"
                                    stroke="rgba(255,215,0,0.15)"
                                    strokeWidth={1 / viewTransform.scale}
                                    strokeDasharray="4 4"
                                />
                                <text
                                    x={`${solarSystemCircle.cx}%`}
                                    y={`${solarSystemCircle.cy - solarSystemCircle.r - 1}%`}
                                    textAnchor="middle"
                                    fill="rgba(255,215,0,0.3)"
                                    fontSize={Math.max(4, 9 / viewTransform.scale)}
                                    fontFamily="monospace"
                                >
                                    SYSTÈME SOLAIRE
                                </text>
                            </svg>
                        )}

                        {/* Constellation lines */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                            {svgLines.map((line, i) => (
                                <line
                                    key={i}
                                    x1={`${line.x1}%`} y1={`${line.y1}%`}
                                    x2={`${line.x2}%`} y2={`${line.y2}%`}
                                    stroke="rgba(16,185,129,0.2)" strokeWidth={1 / viewTransform.scale}
                                />
                            ))}
                        </svg>
                    </div>

                    {/* Objects - Pushed outside of the scaled container! This prevents CSS transform blurriness on mobile. */}
                    <div className="absolute inset-0 overflow-visible pointer-events-auto">
                        {mapped.map(({ obj, px, py }) => {
                            const isSelected = selectedAstro?.id === obj.id;
                            const dotSize = obj.type === 'galaxy' ? 14 : obj.type === 'blackhole' ? 12 : 8;

                            // On limite la taille max des éléments à 3x pour amplifier l'écartement
                            const screenScale = Math.min(3, 1 + (viewTransform.scale - 1) * 0.15);
                            const actualSize = dotSize * screenScale;

                            return (
                                <div
                                    key={obj.id}
                                    className="absolute group flex items-center justify-center pointer-events-none"
                                    style={{
                                        left: `calc(50% + ${(px - 50) * viewTransform.scale}% + ${viewTransform.x}px)`,
                                        top: `calc(50% + ${(py - 50) * viewTransform.scale}% + ${viewTransform.y}px)`,
                                        transform: `translate(-50%, -50%)`,
                                        zIndex: isSelected ? 100 : 10,
                                        transition: gestureRef.current.type === 'none' ? 'left 0.25s ease-out, top 0.25s ease-out' : 'none'
                                    }}
                                >
                                    {/* Selection ring */}
                                    {isSelected && (
                                        <>
                                            <motion.div
                                                className="absolute rounded-full border border-emerald-400 pointer-events-none"
                                                style={{ inset: -6 * screenScale }}
                                                animate={{ scale: [1, 1.4], opacity: [0.8, 0] }}
                                                transition={{ duration: 1.2, repeat: Infinity }}
                                            />
                                            <div
                                                className="absolute rounded-full border border-emerald-400/60 pointer-events-none"
                                                style={{ inset: -4 * screenScale }}
                                            />
                                        </>
                                    )}
                                    {/* Dot hit-target - strict size prevents invisible overlap blocking clicks */}
                                    <button
                                        data-astro-id={obj.id}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleClick(obj);
                                        }}
                                        className="rounded-full transition-all duration-200 hover:brightness-150 pointer-events-auto cursor-pointer outline-none flex-shrink-0"
                                        style={{
                                            width: actualSize + 4, // tight hitbox
                                            height: actualSize + 4,
                                            backgroundColor: obj.color,
                                            borderColor: isSelected ? '#10b981' : 'rgba(255,255,255,0.15)',
                                            borderWidth: isSelected ? 2 : 1,
                                            boxShadow: isSelected ? `0 0 16px ${obj.color}, 0 0 4px #10b981` : `0 0 6px ${obj.color}60`,
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-3 md:gap-6 w-max text-[8px] md:text-[10px] whitespace-nowrap font-mono text-white/40 uppercase tracking-widest pointer-events-none">
                <span>★ Étoile</span>
                <span>● Planète</span>
                <span>✦ Galaxie</span>
                <span>◉ Trou noir</span>
            </div>
        </motion.div >
    );
}
