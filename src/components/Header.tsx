import { useAstroStore } from '../store/useAstroStore';
import { Orbit, Map, Rocket, Scaling, Menu, X } from 'lucide-react';

export default function Header() {
    const currentView = useAstroStore((s) => s.currentView);
    const setView = useAstroStore((s) => s.setView);
    const isNavOpen = useAstroStore((s) => s.isNavOpen);
    const setNavOpen = useAstroStore((s) => s.setNavOpen);
    const setCardVisible = useAstroStore((s) => s.setCardVisible);

    const views = [
        { key: '3D' as const, label: 'Exploration 3D', icon: <Orbit size={14} /> },
        { key: '2D' as const, label: 'Carte Tactique', icon: <Map size={14} /> },
        { key: 'SIZE' as const, label: 'Comparaison', icon: <Scaling size={14} /> },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
            {/* items-stretch force les éléments à prendre toute la hauteur */}
            <div className="flex items-stretch justify-between h-[80px] md:h-24">

                {/* BLOC LOGO : On lui donne la fameuse bordure (border-r) */}
                {/* ⚠️ Si la ligne n'est pas droite avec ton menu, ajuste le w-[280px] ! */}
                <div className="w-full md:w-[220px] flex items-center justify-between md:justify-start px-6 md:px-4 md:bg-black/70 md:backdrop-blur-xl md:border-r md:border-white/8 pointer-events-auto pt-2 md:pt-0">
                    {/* Conteneur Titre/Logo avec fond unifié sur mobile (semblable au menu burger) */}
                    <div className="flex items-center justify-start gap-3 mt-1 pl-2 pr-4 py-1.5 rounded-xl bg-black/40 backdrop-blur-md md:bg-transparent md:backdrop-blur-none transition-all">
                        <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 shrink-0 md:bg-emerald-500/10">
                            <Rocket size={18} className="text-emerald-400" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h1 className="text-lg font-bold text-white tracking-wide leading-none">AstroGuide</h1>
                            <p className="text-[9px] font-mono uppercase tracking-[0.12em] text-white/30 mt-1 leading-none">
                                Exploration Spatiale
                            </p>
                        </div>
                    </div>

                    {/* Hamburger Menu Toggle (Mobile Only) */}
                    <button
                        onClick={() => setNavOpen(!isNavOpen)}
                        className="md:hidden p-2 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 text-white/70 shadow-[0_4px_12px_rgba(0,0,0,0.8)] hover:bg-emerald-500/20 hover:text-emerald-400 transition-colors cursor-pointer"
                    >
                        {isNavOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* BLOC BOUTONS (Vue 3D / 2D) */}
                <div className="hidden md:flex items-center pointer-events-auto pr-6">
                    <div className="flex items-center gap-1 p-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                        {views.map((v) => (
                            <button
                                key={v.key}
                                onClick={() => {
                                    setView(v.key);
                                    setCardVisible(true);
                                }}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer ${currentView === v.key
                                    ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300'
                                    : 'text-white/40 hover:text-white/70 border border-transparent'
                                    }`}
                            >
                                {v.icon}
                                <span className="hidden sm:inline">{v.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
}
