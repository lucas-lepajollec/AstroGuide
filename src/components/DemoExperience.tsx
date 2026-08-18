import {useEffect, useRef, useState} from 'react';
import {CircleHelp, Map, Orbit, RotateCcw, Scaling, ShieldCheck, Sparkles} from 'lucide-react';
import {celestialObjects} from '../data/celestialData';
import {useAstroStore} from '../store/useAstroStore';

export default function DemoExperience() {
  const [isGuideOpen, setGuideOpen] = useState(true);
  const [announcement, setAnnouncement] = useState('');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const guideTitleRef = useRef<HTMLHeadingElement>(null);
  const resetExploration = useAstroStore((state) => state.resetExploration);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isGuideOpen && !dialog.open) {
      dialog.showModal();
      guideTitleRef.current?.focus({preventScroll: true});
      dialog.scrollTop = 0;
    }
    if (!isGuideOpen && dialog.open) dialog.close();
  }, [isGuideOpen]);

  const resetDemo = () => {
    resetExploration();
    setAnnouncement('La démonstration est en cours de réinitialisation.');
    window.location.reload();
  };

  return (
    <>
      <div className="fixed bottom-3 right-3 z-[70] flex items-center rounded-full border border-emerald-400/25 bg-[#050b0a]/90 p-1 text-white shadow-2xl shadow-black/70 backdrop-blur-xl md:bottom-auto md:right-auto md:left-1/2 md:top-4 md:-translate-x-1/2">
        <button
          type="button"
          onClick={() => setGuideOpen(true)}
          className="flex min-h-9 items-center gap-2 rounded-full px-3 font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-200 transition-colors hover:bg-emerald-400/10"
          aria-label="Afficher les informations de la démonstration"
        >
          <Sparkles size={13} aria-hidden="true" />
          <span>Démo</span>
          <CircleHelp size={13} className="text-white/45" aria-hidden="true" />
        </button>
        <span className="h-5 w-px bg-white/10" aria-hidden="true" />
        <button
          type="button"
          onClick={resetDemo}
          className="grid size-9 place-items-center rounded-full text-white/55 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Réinitialiser la démonstration"
          title="Réinitialiser"
        >
          <RotateCcw size={14} aria-hidden="true" />
        </button>
      </div>

      <p className="sr-only" aria-live="polite">{announcement}</p>

      <dialog
        ref={dialogRef}
        onCancel={(event) => {
          event.preventDefault();
          setGuideOpen(false);
        }}
        onClose={() => setGuideOpen(false)}
        aria-labelledby="demo-guide-title"
        aria-describedby="demo-guide-description"
        className="m-auto max-h-[calc(100dvh-2rem)] w-[min(92vw,680px)] max-w-none overflow-x-hidden overflow-y-auto rounded-[28px] border border-white/10 bg-[#050807]/95 p-0 text-white shadow-[0_30px_120px_rgba(0,0,0,0.9)] backdrop-blur-2xl backdrop:bg-black/80"
      >
        <div className="demo-guide-content relative overflow-hidden p-5 sm:p-8">
          <div className="pointer-events-none absolute inset-x-16 -top-32 h-64 rounded-full bg-emerald-400/15 blur-3xl" aria-hidden="true" />

          <div className="relative">
            <div className="demo-guide-header mb-5 flex items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/8 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-200">
                <ShieldCheck size={13} aria-hidden="true" />
                Démonstration publique
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">
                {celestialObjects.length} objets
              </span>
            </div>

            <h2 ref={guideTitleRef} id="demo-guide-title" tabIndex={-1} className="demo-guide-title max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Explorez l’espace selon trois points de vue.
            </h2>
            <p id="demo-guide-description" className="demo-guide-copy mt-3 max-w-2xl text-sm leading-6 text-white/55 sm:text-[15px]">
              Cette démo est le vrai produit AstroGuide, exécuté uniquement dans votre navigateur. Elle n’utilise aucun compte, aucune API distante et ne conserve aucune modification.
            </p>

            <div className="demo-guide-grid mt-5 grid gap-2 sm:mt-7 sm:grid-cols-3 sm:gap-3">
              {[
                {icon: Orbit, title: 'Exploration 3D', text: 'Observez les astres et déplacez librement la caméra.'},
                {icon: Map, title: 'Carte', text: 'Parcourez le catalogue sur une représentation spatiale illustrative.'},
                {icon: Scaling, title: 'Comparaison', text: 'Comparez les ordres de grandeur et filtrez les objets.'},
              ].map(({icon: Icon, title, text}) => (
                <div key={title} className="demo-guide-card flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.035] p-3 sm:block sm:p-4">
                  <Icon size={18} className="shrink-0 text-emerald-300" aria-hidden="true" />
                  <h3 className="text-sm font-medium text-white/90 sm:mt-3">{title}</h3>
                  <p className="demo-feature-description mt-1.5 hidden text-xs leading-5 text-white/40 sm:block">{text}</p>
                </div>
              ))}
            </div>

            <div className="demo-guide-limits mt-4 rounded-2xl border border-amber-200/10 bg-amber-100/[0.035] px-4 py-3 text-xs leading-5 text-white/45 sm:mt-6">
              Les positions, distances visuelles, orbites et tailles rendues sont illustratives. Les valeurs textuelles sont arrondies et certaines estimations scientifiques restent incertaines.
            </div>

            <div className="demo-guide-actions mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setGuideOpen(false)}
                className="min-h-11 rounded-xl bg-emerald-400 px-6 text-sm font-semibold text-[#032016] transition-colors hover:bg-emerald-300 sm:order-2"
              >
                Commencer l’exploration
              </button>
              <button
                type="button"
                onClick={resetDemo}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 px-4 text-sm text-white/55 transition-colors hover:bg-white/5 hover:text-white sm:order-1"
              >
                <RotateCcw size={15} aria-hidden="true" />
                Repartir de zéro
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
