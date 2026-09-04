/* eslint-disable react-refresh/only-export-components -- the provider, hook, and language control form one typed i18n module */
import {createContext, useContext, useEffect, useMemo, useState, type ReactNode} from 'react';
import {ChevronDown} from 'lucide-react';
import {getCelestialObjects} from './data/celestialTranslations';
import {locales, type Locale} from './locales';

export {locales, type Locale} from './locales';

const en = {
  publicDemo: 'Public demo', spaceExploration: 'Space exploration', loading: 'Initializing space', view3d: '3D exploration', map: 'Map', comparison: 'Comparison', size: 'Size',
  openNav: 'Open navigation menu', closeNav: 'Close navigation menu', celestialNavigation: 'Celestial object navigation', previousObject: 'Previous object', nextObject: 'Next object', objects: 'objects', searchLabel: 'Search for a celestial object', search: 'Search…',
  all: 'All', stars: 'Stars', planets: 'Planets', galaxies: 'Galaxies', blackHoles: 'Black holes', constellations: 'Constellations', selectAll: 'Select all', selectNone: 'Select none', noResults: 'No object matches this search.', addComparison: 'Add', removeComparison: 'Remove', comparisonSuffix: 'from the comparison',
  informationAbout: 'Information about', closeInformation: 'Close information', star: 'Star', planet: 'Planet', galaxy: 'Galaxy', blackHole: 'Black hole', system: 'System', relativeSize: 'Relative size', relativeDistance: 'Relative distance', description: 'Description', scientificData: 'Scientific data', rank: 'Rank', distance: 'Distance', constellation: 'Constellation',
  scientificNotice: 'Rounded values. Positions, orbits, and renderings are illustrative and do not form a scale astronomical map.', mapRegion: 'Illustrative map of celestial objects', zoomIn: 'Zoom in on the map', zoomOut: 'Zoom out of the map', resetMap: 'Reset the map', resetView: 'Reset view', viewIn3d: 'View in 3D', solarSystem: 'SOLAR SYSTEM', mapNotice: 'Illustrative positions and distances · not to scale',
  comparisonTitle: 'Size comparison', smallestToLargest: 'From smallest to largest', items: 'items', sizeNotice: 'Approximate diameters or extents · minimum display size applied', selectComparison: 'Select objects from the left menu', smallerItem: 'Smaller object', largerItem: 'Larger object', timesSmaller: '× smaller', showObject: 'Show', sceneRegion: 'Illustrative 3D view of the sky', sceneError: 'The 3D view could not be initialized on this device.',
  demoInfo: 'Show demo information', demo: 'Demo', resetDemo: 'Reset demo', reset: 'Reset', resetting: 'The demo is being reset.', demoTitle: 'Explore space from three points of view.', demoDescription: 'This demo is the real AstroGuide product running entirely in your browser. It uses no account or remote API and stores no changes.', demo3dText: 'Observe celestial bodies and move the camera freely.', demoMapText: 'Browse the catalogue on an illustrative spatial representation.', demoComparisonText: 'Compare orders of magnitude and filter objects.', demoLimits: 'Rendered positions, visual distances, orbits, and sizes are illustrative. Text values are rounded, and some scientific estimates remain uncertain.', startExploration: 'Start exploring', startOver: 'Start over', language: 'Language',
  title: 'AstroGuide — interactive space exploration', metaDescription: 'Explore celestial objects through three interactive and educational views.',
};
type Messages = typeof en;

const fr: Messages = {
  publicDemo: 'Démonstration publique', spaceExploration: 'Exploration spatiale', loading: 'Initialisation spatiale', view3d: 'Exploration 3D', map: 'Carte', comparison: 'Comparaison', size: 'Taille',
  openNav: 'Ouvrir le menu de navigation', closeNav: 'Fermer le menu de navigation', celestialNavigation: 'Navigation des objets célestes', previousObject: 'Objet précédent', nextObject: 'Objet suivant', objects: 'objets', searchLabel: 'Rechercher un objet céleste', search: 'Rechercher…',
  all: 'Tout', stars: 'Étoiles', planets: 'Planètes', galaxies: 'Galaxies', blackHoles: 'Trous noirs', constellations: 'Constellations', selectAll: 'Tout sélectionner', selectNone: 'Tout désélectionner', noResults: 'Aucun objet ne correspond à cette recherche.', addComparison: 'Ajouter', removeComparison: 'Retirer', comparisonSuffix: 'de la comparaison',
  informationAbout: 'Informations sur', closeInformation: 'Fermer les informations', star: 'Étoile', planet: 'Planète', galaxy: 'Galaxie', blackHole: 'Trou noir', system: 'Système', relativeSize: 'Taille relative', relativeDistance: 'Distance relative', description: 'Description', scientificData: 'Données scientifiques', rank: 'Rang', distance: 'Distance', constellation: 'Constellation',
  scientificNotice: 'Valeurs arrondies. Les positions, orbites et rendus sont illustratifs et ne constituent pas une carte astronomique à l’échelle.', mapRegion: 'Carte illustrative des objets célestes', zoomIn: 'Zoomer sur la carte', zoomOut: 'Dézoomer sur la carte', resetMap: 'Réinitialiser la carte', resetView: 'Réinitialiser la vue', viewIn3d: 'Voir en 3D', solarSystem: 'SYSTÈME SOLAIRE', mapNotice: 'Positions et distances illustratives · hors échelle',
  comparisonTitle: 'Comparaison des tailles', smallestToLargest: 'Du plus petit au plus grand', items: 'éléments', sizeNotice: 'Diamètres ou étendues approximatifs · taille minimale d’affichage appliquée', selectComparison: 'Sélectionnez des éléments dans le menu à gauche', smallerItem: 'Élément plus petit', largerItem: 'Élément plus grand', timesSmaller: '× plus petit', showObject: 'Afficher', sceneRegion: 'Visualisation 3D illustrative du ciel', sceneError: 'La vue 3D n’a pas pu être initialisée sur cet appareil.',
  demoInfo: 'Afficher les informations de la démonstration', demo: 'Démo', resetDemo: 'Réinitialiser la démonstration', reset: 'Réinitialiser', resetting: 'La démonstration est en cours de réinitialisation.', demoTitle: 'Explorez l’espace selon trois points de vue.', demoDescription: 'Cette démo est le vrai produit AstroGuide, exécuté uniquement dans votre navigateur. Elle n’utilise aucun compte, aucune API distante et ne conserve aucune modification.', demo3dText: 'Observez les astres et déplacez librement la caméra.', demoMapText: 'Parcourez le catalogue sur une représentation spatiale illustrative.', demoComparisonText: 'Comparez les ordres de grandeur et filtrez les objets.', demoLimits: 'Les positions, distances visuelles, orbites et tailles rendues sont illustratives. Les valeurs textuelles sont arrondies et certaines estimations scientifiques restent incertaines.', startExploration: 'Commencer l’exploration', startOver: 'Repartir de zéro', language: 'Langue',
  title: 'AstroGuide — exploration spatiale interactive', metaDescription: 'Explorez des objets célestes dans trois visualisations interactives et pédagogiques.',
};

const es: Messages = {
  publicDemo: 'Demostración pública', spaceExploration: 'Exploración espacial', loading: 'Iniciando exploración espacial', view3d: 'Exploración 3D', map: 'Mapa', comparison: 'Comparación', size: 'Tamaño',
  openNav: 'Abrir el menú de navegación', closeNav: 'Cerrar el menú de navegación', celestialNavigation: 'Navegación de objetos celestes', previousObject: 'Objeto anterior', nextObject: 'Objeto siguiente', objects: 'objetos', searchLabel: 'Buscar un objeto celeste', search: 'Buscar…',
  all: 'Todos', stars: 'Estrellas', planets: 'Planetas', galaxies: 'Galaxias', blackHoles: 'Agujeros negros', constellations: 'Constelaciones', selectAll: 'Seleccionar todo', selectNone: 'Deseleccionar todo', noResults: 'Ningún objeto coincide con la búsqueda.', addComparison: 'Añadir', removeComparison: 'Quitar', comparisonSuffix: 'de la comparación',
  informationAbout: 'Información sobre', closeInformation: 'Cerrar la información', star: 'Estrella', planet: 'Planeta', galaxy: 'Galaxia', blackHole: 'Agujero negro', system: 'Sistema', relativeSize: 'Tamaño relativo', relativeDistance: 'Distancia relativa', description: 'Descripción', scientificData: 'Datos científicos', rank: 'Posición', distance: 'Distancia', constellation: 'Constelación',
  scientificNotice: 'Valores redondeados. Las posiciones, órbitas y representaciones son ilustrativas y no forman un mapa astronómico a escala.', mapRegion: 'Mapa ilustrativo de objetos celestes', zoomIn: 'Acercar el mapa', zoomOut: 'Alejar el mapa', resetMap: 'Restablecer el mapa', resetView: 'Restablecer la vista', viewIn3d: 'Ver en 3D', solarSystem: 'SISTEMA SOLAR', mapNotice: 'Posiciones y distancias ilustrativas · no está a escala',
  comparisonTitle: 'Comparación de tamaños', smallestToLargest: 'De menor a mayor', items: 'elementos', sizeNotice: 'Diámetros o extensiones aproximados · se aplica un tamaño mínimo de visualización', selectComparison: 'Selecciona objetos en el menú de la izquierda', smallerItem: 'Objeto más pequeño', largerItem: 'Objeto más grande', timesSmaller: '× más pequeño', showObject: 'Mostrar', sceneRegion: 'Vista 3D ilustrativa del cielo', sceneError: 'No se ha podido iniciar la vista 3D en este dispositivo.',
  demoInfo: 'Mostrar información de la demo', demo: 'Demo', resetDemo: 'Restablecer la demo', reset: 'Restablecer', resetting: 'La demo se está restableciendo.', demoTitle: 'Explora el espacio desde tres puntos de vista.', demoDescription: 'Esta demo es el producto AstroGuide real y se ejecuta por completo en tu navegador. No utiliza cuentas ni API remotas y no guarda ningún cambio.', demo3dText: 'Observa los astros y mueve la cámara libremente.', demoMapText: 'Recorre el catálogo en una representación espacial ilustrativa.', demoComparisonText: 'Compara órdenes de magnitud y filtra los objetos.', demoLimits: 'Las posiciones, distancias visuales, órbitas y tamaños representados son ilustrativos. Los valores textuales están redondeados y algunas estimaciones científicas siguen siendo inciertas.', startExploration: 'Empezar a explorar', startOver: 'Empezar de nuevo', language: 'Idioma',
  title: 'AstroGuide — exploración espacial interactiva', metaDescription: 'Explora objetos celestes mediante tres vistas interactivas y educativas.',
};

const de: Messages = {
  publicDemo: 'Öffentliche Demo', spaceExploration: 'Weltraumerkundung', loading: 'Weltraum wird initialisiert', view3d: '3D-Erkundung', map: 'Karte', comparison: 'Vergleich', size: 'Größe',
  openNav: 'Navigationsmenü öffnen', closeNav: 'Navigationsmenü schließen', celestialNavigation: 'Navigation der Himmelsobjekte', previousObject: 'Vorheriges Objekt', nextObject: 'Nächstes Objekt', objects: 'Objekte', searchLabel: 'Nach einem Himmelsobjekt suchen', search: 'Suchen…',
  all: 'Alle', stars: 'Sterne', planets: 'Planeten', galaxies: 'Galaxien', blackHoles: 'Schwarze Löcher', constellations: 'Sternbilder', selectAll: 'Alle auswählen', selectNone: 'Auswahl aufheben', noResults: 'Kein Objekt entspricht dieser Suche.', addComparison: 'Hinzufügen', removeComparison: 'Entfernen', comparisonSuffix: 'aus dem Vergleich',
  informationAbout: 'Informationen zu', closeInformation: 'Informationen schließen', star: 'Stern', planet: 'Planet', galaxy: 'Galaxie', blackHole: 'Schwarzes Loch', system: 'System', relativeSize: 'Relative Größe', relativeDistance: 'Relative Entfernung', description: 'Beschreibung', scientificData: 'Wissenschaftliche Daten', rank: 'Rang', distance: 'Entfernung', constellation: 'Sternbild',
  scientificNotice: 'Gerundete Werte. Positionen, Umlaufbahnen und Darstellungen sind illustrativ und bilden keine maßstabsgetreue astronomische Karte.', mapRegion: 'Illustrative Karte der Himmelsobjekte', zoomIn: 'Karte vergrößern', zoomOut: 'Karte verkleinern', resetMap: 'Karte zurücksetzen', resetView: 'Ansicht zurücksetzen', viewIn3d: 'In 3D anzeigen', solarSystem: 'SONNENSYSTEM', mapNotice: 'Illustrative Positionen und Entfernungen · nicht maßstabsgetreu',
  comparisonTitle: 'Größenvergleich', smallestToLargest: 'Vom kleinsten zum größten', items: 'Objekte', sizeNotice: 'Ungefähre Durchmesser oder Ausdehnungen · Mindestgröße für die Darstellung', selectComparison: 'Wähle Objekte im linken Menü aus', smallerItem: 'Kleineres Objekt', largerItem: 'Größeres Objekt', timesSmaller: '× kleiner', showObject: 'Anzeigen', sceneRegion: 'Illustrative 3D-Ansicht des Himmels', sceneError: 'Die 3D-Ansicht konnte auf diesem Gerät nicht initialisiert werden.',
  demoInfo: 'Informationen zur Demo anzeigen', demo: 'Demo', resetDemo: 'Demo zurücksetzen', reset: 'Zurücksetzen', resetting: 'Die Demo wird zurückgesetzt.', demoTitle: 'Erkunde den Weltraum aus drei Perspektiven.', demoDescription: 'Diese Demo ist das echte AstroGuide-Produkt und läuft vollständig in deinem Browser. Sie verwendet weder ein Konto noch eine entfernte API und speichert keine Änderungen.', demo3dText: 'Beobachte Himmelskörper und bewege die Kamera frei.', demoMapText: 'Durchsuche den Katalog auf einer illustrativen räumlichen Darstellung.', demoComparisonText: 'Vergleiche Größenordnungen und filtere die Objekte.', demoLimits: 'Dargestellte Positionen, visuelle Entfernungen, Umlaufbahnen und Größen sind illustrativ. Textwerte sind gerundet und einige wissenschaftliche Schätzungen bleiben unsicher.', startExploration: 'Erkundung starten', startOver: 'Neu beginnen', language: 'Sprache',
  title: 'AstroGuide — interaktive Weltraumerkundung', metaDescription: 'Erkunde Himmelsobjekte in drei interaktiven und lehrreichen Ansichten.',
};

export const messages: Record<Locale, Messages> = {en, fr, es, de};
const storageKey = 'astroguide.ui_language';
function readInitialLocale(): Locale {
  const query = new URLSearchParams(window.location.search).get('lang');
  if (locales.includes(query as Locale)) return query as Locale;
  const stored = window.localStorage.getItem(storageKey);
  return locales.includes(stored as Locale) ? stored as Locale : 'en';
}

type I18nValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  m: Messages;
  objects: ReturnType<typeof getCelestialObjects>;
};
const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({children}: {children: ReactNode}) {
  const [locale, setLocaleState] = useState<Locale>(readInitialLocale);
  const setLocale = (next: Locale) => {
    window.localStorage.setItem(storageKey, next);
    const url = new URL(window.location.href);
    if (next === 'en') url.searchParams.delete('lang'); else url.searchParams.set('lang', next);
    window.history.replaceState({}, '', url);
    setLocaleState(next);
  };
  useEffect(() => {
    const copy = messages[locale];
    document.documentElement.lang = locale;
    document.title = copy.title;
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', copy.metaDescription);
  }, [locale]);
  const value = useMemo(() => ({locale, setLocale, m: messages[locale], objects: getCelestialObjects(locale)}), [locale]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error('useI18n must be used inside I18nProvider');
  return value;
}

export function LanguageSwitch({compact = false}: {compact?: boolean}) {
  const {locale, setLocale, m} = useI18n();
  return <label className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-wider text-white/40">
    <span className={compact ? 'sr-only' : ''}>{m.language}</span>
    <span className="relative inline-flex h-9 items-center">
      <select aria-label={m.language} value={locale} onChange={(event) => setLocale(event.target.value as Locale)} className="h-9 min-w-[66px] appearance-none rounded-full border border-white/10 bg-black/70 py-0 pl-3 pr-8 text-[10px] text-white/70 outline-none transition-colors hover:border-white/20 focus:border-emerald-500/50">
        <option value="en">EN</option><option value="fr">FR</option><option value="es">ES</option><option value="de">DE</option>
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 h-3 w-3 text-white/45" aria-hidden="true" />
    </span>
  </label>;
}
