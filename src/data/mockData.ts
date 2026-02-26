// ╔═══════════════════════════════════════════════════════════════╗
// ║  HOW TO ADD A NEW CELESTIAL OBJECT:                         ║
// ║  1. Add an entry to the `celestialObjects` array below      ║
// ║  2. Fill in all required fields (id, name, type, etc.)      ║
// ║  3. It will AUTOMATICALLY appear in all 3 views:            ║
// ║     • 3D Exploration (with label + orbit if planet)         ║
// ║     • 2D Tactical Map                                       ║
// ║     • Size Comparison                                       ║
// ║  Optional flags:                                            ║
// ║     hideIn3D: true → won't render a 3D sphere               ║
// ║     systemCircle: true → draws a circle around its members  ║
// ║                   on the 2D map (for groups like "Système    ║
// ║                   Solaire")                                  ║
// ╚═══════════════════════════════════════════════════════════════╝
export interface CelestialObject {
    id: string;
    name: string;
    type: 'star' | 'planet' | 'galaxy' | 'blackhole' | 'system';
    position: [number, number, number];
    scientificSize: string;
    relativeSize: string;
    scientificDistance: string;
    relativeDistance: string;
    description: string;
    color: string;
    constellation?: string;
    orbitalRadius?: number;
    orbitalSpeed?: number;
    orbitalOffset?: number;
    sizeKm: number; // numeric size in km for comparison sorting
    hideIn3D?: boolean; // if true, no 3D mesh is rendered (only label)
    systemCircle?: boolean; // if true, draw a circle on 2D map around solar system bodies
    parentId?: string; // for moon: orbits around this object
    textureUrl?: string; // Optional URL for 3D rendered texture
    shape?: 'sphere' | 'disc' | 'blackhole' | 'tinyStar'; // For conditional rendering
}

export const celestialObjects: CelestialObject[] = [
    // ═══════════════════════════════════════════
    //  ☀️ LE SYSTÈME SOLAIRE
    //export const celestialObjects: CelestialObject[] = [
    {
        id: 'sun', name: 'Le Soleil', type: 'star', color: '#FDB813',
        position: [0, 0, 0], sizeKm: 1_392_700,
        scientificSize: '1 392 700 km', relativeSize: '109× la Terre',
        scientificDistance: '0 km', relativeDistance: 'Centre (0)',
        description: "L'étoile au centre de notre système. Elle représente 99,8% de la masse totale du système solaire.",
        textureUrl: '/textures/sun.jpg',
    },
    {
        id: 'mercury', name: 'Mercure', type: 'planet', color: '#8C8C8C',
        position: [3.5, 0, 0], sizeKm: 4_879,
        scientificSize: '4 879 km', relativeSize: '0,38× la Terre',
        scientificDistance: '57,9 millions km', relativeDistance: '3 minutes-lumière du Soleil',
        description: "La planète la plus proche du Soleil. Sa surface ressemble à celle de notre Lune, couverte de cratères.",
        orbitalRadius: 3.5, orbitalSpeed: 0.47, orbitalOffset: 2,
        textureUrl: '/textures/mercury.jpg',
    },
    {
        id: 'venus', name: 'Vénus', type: 'planet', color: '#E3BB76',
        position: [6.5, 0, 0], sizeKm: 12_104,
        scientificSize: '12 104 km', relativeSize: '0,95× la Terre',
        scientificDistance: '108,2 millions km', relativeDistance: '6 minutes-lumière du Soleil',
        description: "La sœur jumelle de la Terre, mais avec une atmosphère toxique très dense et un puissant effet de serre.",
        orbitalRadius: 6.5, orbitalSpeed: 0.35, orbitalOffset: 5,
        textureUrl: '/textures/venus.jpg',
    },
    {
        id: 'earth', name: 'La Terre', type: 'planet', color: '#2B82C9',
        position: [10, 0, 0], sizeKm: 12_742,
        scientificSize: '12 742 km', relativeSize: '1× (Référence)',
        scientificDistance: '149,6 millions km', relativeDistance: '8 minutes-lumière du Soleil',
        description: "Notre maison. Le seul point bleu pâle de l'univers connu pour abriter la vie.",
        orbitalRadius: 10, orbitalSpeed: 0.17, orbitalOffset: 0,
        textureUrl: '/textures/earth.jpg',
    },
    {
        id: 'moon', name: 'La Lune', type: 'planet', color: '#C0C0C0',
        position: [12, 0, 0], sizeKm: 3_474,
        scientificSize: '3 474 km', relativeSize: '0,27× la Terre',
        scientificDistance: '384 400 km', relativeDistance: '1 seconde-lumière de la Terre',
        description: "Le seul satellite naturel de la Terre. Le premier et seul astre extraterrestre visité par l'humanité.",
        orbitalRadius: 2, orbitalSpeed: 0.8, orbitalOffset: 0,
        parentId: 'earth',
        textureUrl: '/textures/moon.jpg',
    },
    {
        id: 'mars', name: 'Mars', type: 'planet', color: '#C1440E',
        position: [14, 0, 0], sizeKm: 6_779,
        scientificSize: '6 779 km', relativeSize: '0,53× la Terre',
        scientificDistance: '225 millions km', relativeDistance: '12,5 minutes-lumière du Soleil',
        description: "La planète rouge. Elle abrite Olympus Mons, le plus grand volcan de tout le système solaire.",
        orbitalRadius: 14, orbitalSpeed: 0.13, orbitalOffset: 3.5,
        textureUrl: '/textures/mars.jpg',
    },
    {
        id: 'jupiter', name: 'Jupiter', type: 'planet', color: '#C88B3A',
        position: [24, 0, 0], sizeKm: 139_820,
        scientificSize: '139 820 km', relativeSize: '11× la Terre',
        scientificDistance: '778 millions km', relativeDistance: '43 minutes-lumière du Soleil',
        description: "La géante gazeuse. Plus massive que toutes les autres planètes du système solaire réunies.",
        orbitalRadius: 24, orbitalSpeed: 0.05, orbitalOffset: 1,
        textureUrl: '/textures/jupiter.jpg',
    },
    {
        id: 'saturn', name: 'Saturne', type: 'planet', color: '#E3D599',
        position: [34, 0, 0], sizeKm: 116_460,
        scientificSize: '116 460 km', relativeSize: '9× la Terre',
        scientificDistance: '1,4 milliard km', relativeDistance: '1,3 heures-lumière du Soleil',
        description: "Célèbre pour son système d'anneaux spectaculaires composés de roche et de glace.",
        orbitalRadius: 34, orbitalSpeed: 0.03, orbitalOffset: 4,
        textureUrl: '/textures/saturn.jpg',
    },
    {
        id: 'uranus', name: 'Uranus', type: 'planet', color: '#B3D0DF',
        position: [44, 0, 0], sizeKm: 50_724,
        scientificSize: '50 724 km', relativeSize: '4× la Terre',
        scientificDistance: '2,9 milliards km', relativeDistance: '2,6 heures-lumière du Soleil',
        description: "Une géante de glaces. Elle orbite couchée sur le côté en raison d'un impact massif dans son passé.",
        orbitalRadius: 44, orbitalSpeed: 0.02, orbitalOffset: 2.5,
        textureUrl: '/textures/uranus.jpg',
    },
    {
        id: 'neptune', name: 'Neptune', type: 'planet', color: '#274687',
        position: [54, 0, 0], sizeKm: 49_244,
        scientificSize: '49 244 km', relativeSize: '3,8× la Terre',
        scientificDistance: '4,5 milliards km', relativeDistance: '4 heures-lumière du Soleil',
        description: "La planète la plus venteuse, balayée par des vents supersoniques dépassant 2000 km/h.",
        orbitalRadius: 54, orbitalSpeed: 0.015, orbitalOffset: 6,
        textureUrl: '/textures/neptune.jpg',
    },
    {
        id: 'pluto', name: 'Pluton', type: 'planet', color: '#D1C5B4',
        position: [-64, 0, 42], sizeKm: 2_376,
        scientificSize: '2 376 km', relativeSize: '0,18× la Terre',
        scientificDistance: '5,9 milliards km', relativeDistance: '5,5 heures-lumière du Soleil',
        description: "La planète naine la plus célèbre, située dans la lointaine et glaciale ceinture de Kuiper.",
        orbitalRadius: 64, orbitalSpeed: 0.010, orbitalOffset: 2.8,
    },
    // Système Solaire — virtual group
    {
        id: 'solar-system', name: 'Système Solaire', type: 'system', color: '#FFD700',
        position: [0, 0, 0], sizeKm: 18_000_000_000,
        scientificSize: '~120 UA (~18 milliards km)', relativeSize: 'Contient 8 planètes + 1 naine',
        scientificDistance: '0 km', relativeDistance: 'Notre système',
        description: "Notre système planétaire avec le Soleil au centre, 8 planètes, des planètes naines et des milliards de petits corps.",
        hideIn3D: true,
        systemCircle: true,
    },

    // ═══════════════════════════════════════════
    //  ✨ GRANDES ÉTOILES & CONSTELLATIONS
    // ═══════════════════════════════════════════
    {
        id: 'sirius', name: 'Sirius A', type: 'star', color: '#FFFFFF',
        position: [80, 15, -60], sizeKm: 2_380_000,
        scientificSize: '2,38 millions km', relativeSize: '1,7× le Soleil',
        scientificDistance: '81 000 milliards km', relativeDistance: '8,6 Années-Lumière',
        description: "L'étoile la plus brillante du ciel nocturne. C'est un système binaire scintillant intensément.",
        constellation: 'Grand Chien',
        shape: 'tinyStar',
        textureUrl: '/textures/sun.jpg',
    },
    {
        id: 'betelgeuse', name: 'Bételgeuse', type: 'star', color: '#FF5E00',
        position: [-90, 40, 100], sizeKm: 1_200_000_000,
        scientificSize: '1,2 milliards km', relativeSize: '764× le Soleil',
        scientificDistance: '6 millions de milliards km', relativeDistance: '640 Années-Lumière',
        description: "Supergéante rouge en fin de vie. Si elle remplaçait le Soleil, elle engloutirait Jupiter.",
        constellation: 'Orion',
        shape: 'tinyStar',
        textureUrl: '/textures/sun.jpg',
    },
    {
        id: 'rigel', name: 'Rigel', type: 'star', color: '#80B3FF',
        position: [-95, -25, 110], sizeKm: 109_000_000,
        scientificSize: '109 millions km', relativeSize: '78× le Soleil',
        scientificDistance: '8,1 millions de milliards km', relativeDistance: '860 Années-Lumière',
        description: "Supergéante bleue extrêmement lumineuse, c'est le pied gauche du chasseur Orion.",
        constellation: 'Orion',
        shape: 'tinyStar',
        textureUrl: '/textures/sun.jpg',
    },
    {
        id: 'bellatrix', name: 'Bellatrix', type: 'star', color: '#B0D0FF',
        position: [-85, 35, 95], sizeKm: 8_400_000,
        scientificSize: '8,4 millions km', relativeSize: '6× le Soleil',
        scientificDistance: '250 Années-Lumière', relativeDistance: '~15 millions de milliards km',
        description: "L'épaule gauche d'Orion. Géante bleue dont le nom signifie « guerrière » en latin.",
        constellation: 'Orion',
        shape: 'tinyStar',
        textureUrl: '/textures/sun.jpg',
    },
    {
        id: 'polaris', name: "L'Étoile Polaire", type: 'star', color: '#FFFDD0',
        position: [0, 120, 25], sizeKm: 52_000_000,
        scientificSize: '52 millions km', relativeSize: '37× le Soleil',
        scientificDistance: '4 millions de milliards km', relativeDistance: '430 Années-Lumière',
        description: "L'étoile du Nord. Elle semble immobile car alignée avec l'axe de rotation de la Terre.",
        constellation: 'Petite Ourse',
        shape: 'tinyStar',
        textureUrl: '/textures/sun.jpg',
    },
    {
        id: 'vega', name: 'Véga', type: 'star', color: '#A1C4FF',
        position: [65, 75, 90], sizeKm: 3_800_000,
        scientificSize: '3,8 millions km', relativeSize: '2,1× le Soleil',
        scientificDistance: '236 000 milliards km', relativeDistance: '25 Années-Lumière',
        description: "L'une des étoiles les plus lumineuses de notre voisinage, tourne si vite qu'elle est aplatie aux pôles.",
        constellation: 'Lyre',
        shape: 'tinyStar',
        textureUrl: '/textures/sun.jpg',
    },
    {
        id: 'antares', name: 'Antarès', type: 'star', color: '#FF4D4D',
        position: [120, -50, -90], sizeKm: 946_000_000,
        scientificSize: '946 millions km', relativeSize: '680× le Soleil',
        scientificDistance: '5,2 millions de milliards km', relativeDistance: '550 Années-Lumière',
        description: "Le cœur rouge du Scorpion. Supergéante si colossale que son atmosphère se dissipe dans l'espace.",
        constellation: 'Scorpion',
        shape: 'tinyStar',
        textureUrl: '/textures/sun.jpg',
    },
    {
        id: 'arcturus', name: 'Arcturus', type: 'star', color: '#FFC266',
        position: [-75, 90, -70], sizeKm: 35_000_000,
        scientificSize: '35 millions km', relativeSize: '25× le Soleil',
        scientificDistance: '347 000 milliards km', relativeDistance: '36,7 Années-Lumière',
        description: "Une géante rouge ancienne, l'étoile la plus brillante de l'hémisphère nord céleste.",
        constellation: 'Bouvier',
        shape: 'tinyStar',
        textureUrl: '/textures/sun.jpg',
    },
    {
        id: 'deneb', name: 'Deneb', type: 'star', color: '#FFFFFF',
        position: [110, 110, 130], sizeKm: 280_000_000,
        scientificSize: '280 millions km', relativeSize: '200× le Soleil',
        scientificDistance: '24 millions de milliards km', relativeDistance: '2 600 Années-Lumière',
        description: "Une des étoiles les plus lointaines visibles à l'œil nu. Brûle 200 000× plus que le Soleil.",
        constellation: 'Cygne',
        shape: 'tinyStar',
        textureUrl: '/textures/sun.jpg',
    },
    {
        id: 'aldebaran', name: 'Aldébaran', type: 'star', color: '#FF8C00',
        position: [-55, -15, 70], sizeKm: 61_000_000,
        scientificSize: '61 millions km', relativeSize: '44× le Soleil',
        scientificDistance: '615 000 milliards km', relativeDistance: '65 Années-Lumière',
        description: "L'œil rouge et furieux de la constellation du Taureau, repérable dans le ciel d'hiver.",
        constellation: 'Taureau',
        shape: 'tinyStar',
        textureUrl: '/textures/sun.jpg',
    },
    {
        id: 'spica', name: 'Spica', type: 'star', color: '#99CCFF',
        position: [100, -70, 55], sizeKm: 10_000_000,
        scientificSize: '10 millions km', relativeSize: '7× le Soleil',
        scientificDistance: '2,3 millions de milliards km', relativeDistance: '250 Années-Lumière',
        description: "Deux étoiles si proches qu'elles sont déformées en forme d'œufs par leur gravité mutuelle.",
        constellation: 'Vierge',
        shape: 'tinyStar',
        textureUrl: '/textures/sun.jpg',
    },
    {
        id: 'dubhe', name: 'Dubhé', type: 'star', color: '#FFD700',
        position: [85, 60, -80], sizeKm: 23_000_000,
        scientificSize: '23 millions km', relativeSize: '17× le Soleil',
        scientificDistance: '124 Années-Lumière', relativeDistance: '~7,6 millions de milliards km',
        description: "Alpha Ursae Majoris. Avec Merak, elles forment les « Pointeurs » vers l'Étoile Polaire.",
        constellation: 'Grande Ourse',
        shape: 'tinyStar',
        textureUrl: '/textures/sun.jpg',
    },
    {
        id: 'merak', name: 'Merak', type: 'star', color: '#FFFACD',
        position: [82, 52, -78], sizeKm: 4_200_000,
        scientificSize: '4,2 millions km', relativeSize: '3× le Soleil',
        scientificDistance: '79 Années-Lumière', relativeDistance: '~4,8 millions de milliards km',
        description: "Beta Ursae Majoris. Avec Dubhé, elle pointe vers la Polaire. Possède un disque de débris.",
        constellation: 'Grande Ourse',
        shape: 'tinyStar',
        textureUrl: '/textures/sun.jpg',
    },
    {
        id: 'alioth', name: 'Alioth', type: 'star', color: '#E0E7FF',
        position: [90, 55, -74], sizeKm: 5_600_000,
        scientificSize: '5,6 millions km', relativeSize: '4× le Soleil',
        scientificDistance: '81 Années-Lumière', relativeDistance: '~5 millions de milliards km',
        description: "L'étoile la plus brillante de la Grande Ourse. Étoile magnétiquement variable.",
        constellation: 'Grande Ourse',
        shape: 'tinyStar',
        textureUrl: '/textures/sun.jpg',
    },
    {
        id: 'schedar', name: 'Schedar', type: 'star', color: '#FF8C00',
        position: [-80, 80, 70], sizeKm: 56_000_000,
        scientificSize: '56 millions km', relativeSize: '42× le Soleil',
        scientificDistance: '228 Années-Lumière', relativeDistance: '~14 millions de milliards km',
        description: "Alpha Cassiopeiae. Géante orange qui ancre le W caractéristique de Cassiopée.",
        constellation: 'Cassiopée',
        shape: 'tinyStar',
        textureUrl: '/textures/sun.jpg',
    },
    {
        id: 'caph', name: 'Caph', type: 'star', color: '#F0F0FF',
        position: [-74, 88, 76], sizeKm: 5_000_000,
        scientificSize: '5 millions km', relativeSize: '3,5× le Soleil',
        scientificDistance: '54 Années-Lumière', relativeDistance: '~3,3 millions de milliards km',
        description: "Beta Cassiopeiae. Étoile variable pulsant toutes les 2,5 heures. Extrémité droite du W.",
        constellation: 'Cassiopée',
        shape: 'tinyStar',
        textureUrl: '/textures/sun.jpg',
    },
    {
        id: 'navi', name: 'Navi', type: 'star', color: '#ADD8E6',
        position: [-77, 84, 73], sizeKm: 14_000_000,
        scientificSize: '14 millions km', relativeSize: '10× le Soleil',
        scientificDistance: '610 Années-Lumière', relativeDistance: '~37 millions de milliards km',
        description: "Gamma Cassiopeiae. Étoile éruptive nommée en honneur inversé de l'astronaute Gus « Ivan » Grissom.",
        constellation: 'Cassiopée',
        shape: 'tinyStar',
        textureUrl: '/textures/sun.jpg',
    },

    // ═══════════════════════════════════════════
    //  🕳️ TROUS NOIRS LÉGENDAIRES
    // ═══════════════════════════════════════════
    {
        id: 'sagittarius-a', name: 'Sagittarius A*', type: 'blackhole', color: '#1A1A2E',
        position: [0, 0, 160], sizeKm: 44_000_000,
        scientificSize: '44 millions km', relativeSize: '4 Millions × masse du Soleil',
        scientificDistance: '26 000 Années-Lumière', relativeDistance: 'Centre de notre Galaxie',
        description: "Le trou noir supermassif au centre de la Voie Lactée. L'ancre gravitationnelle de notre galaxie.",
        shape: 'blackhole',
        textureUrl: '/textures/black-hole-comparaison.jpg',
    },
    {
        id: 'm87-bh', name: 'M87*', type: 'blackhole', color: '#1A0505',
        position: [140, 70, -170], sizeKm: 38_000_000_000,
        scientificSize: '38 milliards km', relativeSize: '6,5 Milliards × masse du Soleil',
        scientificDistance: "55 Millions d'AL", relativeDistance: 'Extrêmement lointain',
        description: "Premier trou noir photographié par l'humanité (2019). Un monstre crachant un jet de plasma.",
        shape: 'blackhole',
        textureUrl: '/textures/black-hole-comparaison.jpg',
    },
    {
        id: 'ton-618', name: 'TON 618', type: 'blackhole', color: '#0A0A1A',
        position: [-180, -100, 200], sizeKm: 390_000_000_000,
        scientificSize: '390 milliards km', relativeSize: '66 Milliards × masse du Soleil',
        scientificDistance: "10,4 Milliards d'AL", relativeDistance: "Aux confins de l'univers",
        description: "Le plus grand trou noir connu. 40× plus large que le système solaire.",
        shape: 'blackhole',
        textureUrl: '/textures/black-hole-comparaison.jpg',
    },
    {
        id: 'cygnus-x1', name: 'Cygnus X-1', type: 'blackhole', color: '#0A0A1A',
        position: [100, 80, 65], sizeKm: 125,
        scientificSize: '125 km (Horizon)', relativeSize: '21× masse du Soleil',
        scientificDistance: '6 000 AL', relativeDistance: 'Dans notre galaxie',
        description: "Premier trou noir stellaire découvert. Aspire le gaz de son étoile compagne.",
        shape: 'blackhole',
        textureUrl: '/textures/black-hole-comparaison.jpg',
    },
    {
        id: 'phoenix-a', name: 'Phoenix A*', type: 'blackhole', color: '#050011',
        position: [170, -140, -190], sizeKm: 590_000_000_000,
        scientificSize: '590 milliards km', relativeSize: '100 Milliards × masse du Soleil',
        scientificDistance: "8,5 Milliards d'AL", relativeDistance: "Au bord de l'univers observable",
        description: "Nouveau candidat au titre de « plus grand trou noir de l'univers ».",
        shape: 'blackhole',
        textureUrl: '/textures/black-hole-comparaison.jpg',
    },
    {
        id: 'v404-cygni', name: 'V404 Cygni', type: 'blackhole', color: '#0A0A1A',
        position: [-110, 45, -100], sizeKm: 55,
        scientificSize: '55 km', relativeSize: '9× masse du Soleil',
        scientificDistance: '7 800 AL', relativeDistance: 'Dans notre galaxie',
        description: "Un trou noir binaire connu pour ses éruptions violentes de rayons X.",
        shape: 'blackhole',
        textureUrl: '/textures/black-hole-comparaison.jpg',
    },
    {
        id: 'oj-287', name: 'OJ 287 (Binaire)', type: 'blackhole', color: '#110000',
        position: [130, -40, 150], sizeKm: 18_000_000_000,
        scientificSize: 'Système Binaire Massif', relativeSize: '18 Milliards × masse du Soleil',
        scientificDistance: "3,5 Milliards d'AL", relativeDistance: 'Galaxie Lointaine',
        description: "DEUX trous noirs supermassifs orbitant l'un autour de l'autre.",
        shape: 'blackhole',
        textureUrl: '/textures/black-hole-comparaison.jpg',
    },

    // ═══════════════════════════════════════════
    //  🌌 GALAXIES MAJEURES
    // ═══════════════════════════════════════════
    {
        id: 'andromeda', name: "Galaxie d'Andromède", type: 'galaxy', color: '#D1D1FF',
        position: [200, 60, 150], sizeKm: 2_080_000_000_000_000_000,
        scientificSize: "220 000 AL de large", relativeSize: '2× la Voie Lactée',
        scientificDistance: "2,5 Millions d'AL", relativeDistance: 'Notre voisine cosmique',
        description: "Galaxie spirale géante fonçant vers nous à 110 km/s. Fusionnera avec la Voie Lactée dans 4 milliards d'années.",
        shape: 'disc',
        textureUrl: '/textures/galaxie.png',
    },
    {
        id: 'sombrero', name: 'Galaxie du Sombrero', type: 'galaxy', color: '#FFF0D4',
        position: [-190, 30, -160], sizeKm: 473_000_000_000_000_000,
        scientificSize: "50 000 AL de large", relativeSize: '0,3× la Voie Lactée',
        scientificDistance: "31 Millions d'AL", relativeDistance: 'Amas de la Vierge',
        description: "Reconnaissable à son renflement central lumineux et sa bande de poussière sombre.",
        shape: 'disc',
        textureUrl: '/textures/galaxie.png',
    },
    {
        id: 'whirlpool', name: 'Galaxie du Tourbillon', type: 'galaxy', color: '#C8A0FF',
        position: [160, -55, -200], sizeKm: 719_000_000_000_000_000,
        scientificSize: "76 000 AL de large", relativeSize: '0,5× la Voie Lactée',
        scientificDistance: "23 Millions d'AL", relativeDistance: 'Chiens de Chasse',
        description: "Galaxie spirale en interaction avec une galaxie compagne. Bras spectaculaires.",
        shape: 'disc',
        textureUrl: '/textures/galaxie.png',
    },
];

// Constellation line connections
export const constellationLines: Record<string, string[][]> = {
    'Orion': [
        ['betelgeuse', 'bellatrix'],
        ['betelgeuse', 'rigel'],
        ['bellatrix', 'rigel'],
    ],
    'Grande Ourse': [
        ['dubhe', 'merak'],
        ['merak', 'alioth'],
        ['dubhe', 'alioth'],
    ],
    'Cassiopée': [
        ['schedar', 'navi'],
        ['navi', 'caph'],
    ],
};
