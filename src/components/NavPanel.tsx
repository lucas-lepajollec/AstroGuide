import { useEffect, useMemo, useState } from 'react';
import { useAstroStore } from '../store/useAstroStore';
import type { CelestialObject } from '../data/celestialData';
import { LanguageSwitch, useI18n } from '../i18n';
import {
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    Search,
    Sun,
    Globe2,
    Sparkles,
    Circle,
    List,
    Waypoints,
    Check,
    X,
    Orbit,
    Map as MapIcon,
    Scaling
} from 'lucide-react';

type FilterType = 'all' | 'star' | 'planet' | 'galaxy' | 'blackhole' | 'constellation';

export default function NavPanel() {
    const {m, objects} = useI18n();
    const selectedAstro = useAstroStore((s) => s.selectedAstro);
    const setSelectedAstro = useAstroStore((s) => s.setSelectedAstro);
    const currentView = useAstroStore((s) => s.currentView);
    const setView = useAstroStore((s) => s.setView);
    const comparisonIds = useAstroStore((s) => s.comparisonIds);
    const toggleComparisonId = useAstroStore((s) => s.toggleComparisonId);
    const selectAllComparison = useAstroStore((s) => s.selectAllComparison);
    const deselectAllComparison = useAstroStore((s) => s.deselectAllComparison);
    const isNavOpen = useAstroStore((s) => s.isNavOpen);
    const setNavOpen = useAstroStore((s) => s.setNavOpen);
    const setCardVisible = useAstroStore((s) => s.setCardVisible);

    const [activeFilter, setActiveFilter] = useState<FilterType>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isMobileLayout, setIsMobileLayout] = useState(() => window.matchMedia('(max-width: 1023px)').matches);

    const filters: { key: FilterType; label: string; icon: React.ReactNode }[] = [
        { key: 'all', label: m.all, icon: <List size={12} /> },
        { key: 'star', label: m.stars, icon: <Sun size={12} /> },
        { key: 'planet', label: m.planets, icon: <Globe2 size={12} /> },
        { key: 'galaxy', label: m.galaxies, icon: <Sparkles size={12} /> },
        { key: 'blackhole', label: m.blackHoles, icon: <Circle size={12} /> },
        { key: 'constellation', label: m.constellations, icon: <Waypoints size={12} /> },
    ];

    const constellationGroups = useMemo(() => {
        const groups = new Map<string, CelestialObject[]>();
        objects.forEach((obj) => {
            if (!obj.constellation) return;
            if (!groups.has(obj.constellation)) groups.set(obj.constellation, []);
            groups.get(obj.constellation)!.push(obj);
        });
        return groups;
    }, [objects]);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 1023px)');
        const updateLayout = () => setIsMobileLayout(mediaQuery.matches);
        mediaQuery.addEventListener('change', updateLayout);
        return () => mediaQuery.removeEventListener('change', updateLayout);
    }, []);

    const isSizeView = currentView === 'SIZE';

    const filteredObjects = useMemo(() => {
        let objs = objects;
        if (activeFilter === 'constellation') {
            objs = objects.filter((o) => o.constellation);
        } else if (activeFilter !== 'all') {
            objs = objects.filter((o) => o.type === activeFilter);
        }
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            objs = objs.filter((o) =>
                o.name.toLowerCase().includes(q) ||
                objectTypeLabel(o.type, m).toLowerCase().includes(q) ||
                o.constellation?.toLowerCase().includes(q)
            );
        }
        return objs;
    }, [activeFilter, searchQuery, objects, m]);

    const currentIndex = useMemo(() => {
        if (!selectedAstro) return -1;
        return filteredObjects.findIndex((o) => o.id === selectedAstro.id);
    }, [selectedAstro, filteredObjects]);

    const navigateTo = (obj: CelestialObject) => {
        setSelectedAstro(obj);
        setCardVisible(true);
        if (window.innerWidth < 1024) {
            setNavOpen(false);
        }
    };

    const goPrev = () => {
        if (filteredObjects.length === 0) return;
        const idx = currentIndex <= 0 ? filteredObjects.length - 1 : currentIndex - 1;
        navigateTo(filteredObjects[idx]);
    };

    const goNext = () => {
        if (filteredObjects.length === 0) return;
        const idx = currentIndex >= filteredObjects.length - 1 ? 0 : currentIndex + 1;
        navigateTo(filteredObjects[idx]);
    };

    const activeFilterObj = filters.find((f) => f.key === activeFilter)!;

    return (
        <aside
            id="astro-navigation"
            aria-label={m.celestialNavigation}
            aria-hidden={isMobileLayout && !isNavOpen}
            inert={isMobileLayout && !isNavOpen ? true : undefined}
            className={`fixed z-50 bg-black/90 md:bg-black/70 backdrop-blur-xl flex flex-col transition-all duration-300 transform-gpu
            md:left-0 md:top-24 md:bottom-0 md:w-[220px] md:border-r md:border-white/8 md:rounded-none md:opacity-100 md:scale-100 md:pointer-events-auto
            ${isNavOpen
                ? 'inset-x-4 top-24 bottom-4 rounded-2xl border border-white/10 opacity-100 scale-100 pointer-events-auto'
                : 'inset-x-4 top-24 bottom-4 rounded-2xl border border-transparent opacity-0 scale-95 pointer-events-none'
            }
        `}>
            {/* View Switching (Mobile Only) */}
            <div className="md:hidden flex items-center justify-center p-3 border-b border-white/5 bg-black/40 rounded-t-2xl">
                <div className="flex items-center gap-1 p-1 rounded-full bg-black/40 border border-white/10">
                    <button
                        onClick={() => { setView('3D'); setNavOpen(false); setCardVisible(true); }}
                        aria-pressed={currentView === '3D'}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer ${currentView === '3D' ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300' : 'text-white/40 hover:text-white/70 border border-transparent'}`}
                    >
                        <Orbit size={14} /> <span>3D</span>
                    </button>
                    <button
                        onClick={() => { setView('2D'); setNavOpen(false); setCardVisible(true); }}
                        aria-pressed={currentView === '2D'}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer ${currentView === '2D' ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300' : 'text-white/40 hover:text-white/70 border border-transparent'}`}
                    >
                        <MapIcon size={14} /> <span>{m.map}</span>
                    </button>
                    <button
                        onClick={() => { setView('SIZE'); setNavOpen(false); setCardVisible(true); }}
                        aria-pressed={currentView === 'SIZE'}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer ${currentView === 'SIZE' ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300' : 'text-white/40 hover:text-white/70 border border-transparent'}`}
                    >
                        <Scaling size={14} /> <span>{m.size}</span>
                    </button>
                </div>
                <LanguageSwitch compact />
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center justify-between px-3 py-2.5 border-b border-white/5">
                <button
                    onClick={goPrev}
                    aria-label={m.previousObject}
                    className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-emerald-500/15 hover:border-emerald-500/30 transition-all cursor-pointer"
                >
                    <ChevronLeft size={14} className="text-emerald-400" />
                </button>
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                    {currentIndex >= 0
                        ? `${currentIndex + 1} / ${filteredObjects.length}`
                        : `${filteredObjects.length} ${m.objects}`}
                </span>
                <button
                    onClick={goNext}
                    aria-label={m.nextObject}
                    className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-emerald-500/15 hover:border-emerald-500/30 transition-all cursor-pointer"
                >
                    <ChevronRight size={14} className="text-emerald-400" />
                </button>
            </div>

            {/* Search Bar */}
            <div className="px-2.5 py-2 border-b border-white/5">
                <div className="relative">
                    <label htmlFor="astro-search" className="sr-only">{m.searchLabel}</label>
                    <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/25" />
                    <input
                        id="astro-search"
                        type="text"
                        placeholder={m.search}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-7 pr-2.5 py-1.5 rounded-lg bg-white/5 border border-white/8 text-[10px] font-mono text-white/80 placeholder:text-white/20 focus:outline-none focus:border-emerald-500/30 focus:bg-emerald-500/5 transition-all"
                    />
                </div>
            </div>

            {/* Category Dropdown */}
            <div className="px-2.5 py-2 border-b border-white/5 relative">
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    aria-expanded={dropdownOpen}
                    aria-haspopup="menu"
                    className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/8 text-[10px] font-mono text-white/60 hover:bg-white/8 transition-all cursor-pointer"
                >
                    <span className="flex items-center gap-1.5">
                        {activeFilterObj.icon}
                        <span className="uppercase tracking-wider">{activeFilterObj.label}</span>
                    </span>
                    <ChevronDown size={12} className={`text-white/30 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {dropdownOpen && (
                    <div role="menu" className="absolute left-2.5 right-2.5 top-full mt-1 bg-black/95 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden z-50 shadow-xl">
                        {filters.map((f) => (
                            <button
                                key={f.key}
                                role="menuitemradio"
                                aria-checked={activeFilter === f.key}
                                onClick={() => {
                                    setActiveFilter(f.key);
                                    setDropdownOpen(false);
                                }}
                                className={`w-full flex items-center gap-2 px-3 py-2 text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${activeFilter === f.key
                                    ? 'bg-emerald-500/15 text-emerald-300'
                                    : 'text-white/50 hover:bg-white/5 hover:text-white/80'
                                    }`}
                            >
                                {f.icon}
                                {f.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Select All / Deselect All — only in SIZE view */}
            {isSizeView && (
                <div className="px-2.5 py-2 border-b border-white/5 flex gap-1.5">
                    <button
                        onClick={selectAllComparison}
                        className="flex-1 flex items-center justify-center gap-1 px-2 py-1 rounded-md text-[9px] font-mono uppercase tracking-wider border cursor-pointer transition-all bg-emerald-500/5 border-emerald-500/15 text-emerald-400 hover:bg-emerald-500/15"
                    >
                        <Check size={10} /> {m.selectAll}
                    </button>
                    <button
                        onClick={deselectAllComparison}
                        className="flex-1 flex items-center justify-center gap-1 px-2 py-1 rounded-md text-[9px] font-mono uppercase tracking-wider border cursor-pointer transition-all bg-white/3 border-white/8 text-white/40 hover:bg-red-500/10 hover:border-red-500/15 hover:text-red-300"
                    >
                        <X size={10} /> {m.selectNone}
                    </button>
                </div>
            )}

            {/* Object List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {activeFilter === 'constellation' && !searchQuery.trim() ? (
                    // Grouped by constellation
                    Array.from(constellationGroups.entries()).map(([name, stars]) => (
                        <div key={name}>
                            <div className="px-3 py-1.5 bg-white/3 border-b border-white/5">
                                <p className="text-[9px] font-mono uppercase tracking-[0.15em] text-emerald-400/60 flex items-center gap-1.5">
                                    <Waypoints size={10} />
                                    {name}
                                </p>
                            </div>
                            {stars.map((obj) => (
                                <ObjectRow
                                    key={obj.id}
                                    obj={obj}
                                    isActive={selectedAstro?.id === obj.id}
                                    isSizeView={isSizeView}
                                    isIncluded={comparisonIds.has(obj.id)}
                                    onSelect={navigateTo}
                                    onToggle={toggleComparisonId}
                                />
                            ))}
                        </div>
                    ))
                ) : (
                    // Flat list (filtered + searched)
                    filteredObjects.length > 0 ? (
                        filteredObjects.map((obj) => (
                            <ObjectRow
                                key={obj.id}
                                obj={obj}
                                isActive={selectedAstro?.id === obj.id}
                                isSizeView={isSizeView}
                                isIncluded={comparisonIds.has(obj.id)}
                                onSelect={navigateTo}
                                onToggle={toggleComparisonId}
                            />
                        ))
                    ) : (
                        <p role="status" className="px-4 py-8 text-center text-[11px] font-mono text-white/40">
                            {m.noResults}
                        </p>
                    )
                )}
            </div>
        </aside>
    );
}

/* ── Object Row Component ─── */
function ObjectRow({
    obj,
    isActive,
    isSizeView,
    isIncluded,
    onSelect,
    onToggle,
}: {
    obj: CelestialObject;
    isActive: boolean;
    isSizeView: boolean;
    isIncluded: boolean;
    onSelect: (obj: CelestialObject) => void;
    onToggle: (id: string) => void;
}) {
    const {m} = useI18n();
    return (
        <div
            className={`w-full text-left px-3 py-1.5 flex items-center gap-2 transition-all border-l-2 ${isActive
                ? 'bg-emerald-500/10 border-l-emerald-400 text-white'
                : 'border-l-transparent text-white/50 hover:bg-white/3 hover:text-white/80'
                }`}
        >
            {/* Checkbox in SIZE view */}
            {isSizeView && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggle(obj.id);
                    }}
                    aria-pressed={isIncluded}
                    aria-label={`${isIncluded ? m.removeComparison : m.addComparison} ${obj.name} ${m.comparisonSuffix}`}
                    className={`w-3.5 h-3.5 rounded border shrink-0 flex items-center justify-center transition-all cursor-pointer ${isIncluded
                        ? 'bg-emerald-500/30 border-emerald-500/50'
                        : 'bg-white/5 border-white/15'
                        }`}
                >
                    {isIncluded && <Check size={9} className="text-emerald-300" />}
                </button>
            )}

            {/* Main clickable area */}
            <button
                onClick={() => onSelect(obj)}
                aria-current={isActive ? 'true' : undefined}
                className="flex-1 flex items-center gap-2 min-w-0 cursor-pointer"
            >
                <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{
                        backgroundColor: obj.color,
                        boxShadow: isActive ? `0 0 8px ${obj.color}` : 'none',
                    }}
                />
                <div className="min-w-0 text-left">
                    <p className={`text-[11px] font-medium truncate ${isSizeView && !isIncluded ? 'line-through opacity-30' : ''}`}>
                        {obj.name}
                    </p>
                    <p className="text-[8px] font-mono text-white/25 uppercase">
                        {obj.constellation || objectTypeLabel(obj.type, m)}
                    </p>
                </div>
            </button>
        </div>
    );
}

function objectTypeLabel(type: CelestialObject['type'], m: ReturnType<typeof useI18n>['m']) {
    if (type === 'star') return m.star;
    if (type === 'planet') return m.planet;
    if (type === 'galaxy') return m.galaxy;
    if (type === 'blackhole') return m.blackHole;
    return m.system;
}
