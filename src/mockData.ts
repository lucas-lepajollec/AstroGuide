export interface CelestialObject {
  id: string;
  name: string;
  type: 'Star' | 'Planet' | 'Galaxy' | 'Exoplanet' | 'Constellation';
  description: string;
  distance: string;
  position: [number, number, number];
  color: string;
  size: number;
  orbitRadius?: number;
  orbitSpeed?: number;
  parent?: string;
  connections?: string[];
}

export const celestialObjects: CelestialObject[] = [
  {
    id: 'sun',
    name: 'Soleil',
    type: 'Star',
    description: 'Étoile centrale du système solaire. Naine jaune de type spectral G2V.',
    distance: '0 AL',
    position: [0, 0, 0],
    color: '#FDB813',
    size: 5,
  },
  {
    id: 'earth',
    name: 'Terre',
    type: 'Planet',
    description: 'Notre planète bleue. Seule planète connue abritant la vie.',
    distance: '0.0000158 AL',
    position: [15, 0, 0],
    color: '#2B82C9',
    size: 1.5,
    orbitRadius: 15,
    orbitSpeed: 0.001,
    parent: 'sun',
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    type: 'Planet',
    description: 'La plus grande planète du système solaire. Géante gazeuse.',
    distance: '0.000082 AL',
    position: [35, 0, 0],
    color: '#C88B3A',
    size: 3.5,
    orbitRadius: 35,
    orbitSpeed: 0.0004,
    parent: 'sun',
  },
  {
    id: 'betelgeuse',
    name: 'Bételgeuse',
    type: 'Star',
    description: 'Supergéante rouge dans la constellation d\'Orion.',
    distance: '642 AL',
    position: [120, 50, -80],
    color: '#FF5733',
    size: 4,
    connections: ['bellatrix', 'alnitak'],
  },
  {
    id: 'rigel',
    name: 'Rigel',
    type: 'Star',
    description: 'Supergéante bleue, l\'étoile la plus brillante d\'Orion.',
    distance: '860 AL',
    position: [100, -40, -90],
    color: '#85C1E9',
    size: 4,
    connections: ['saiph', 'mintaka'],
  },
  {
    id: 'bellatrix',
    name: 'Bellatrix',
    type: 'Star',
    description: 'La troisième étoile la plus brillante d\'Orion.',
    distance: '250 AL',
    position: [90, 45, -70],
    color: '#A9CCE3',
    size: 2.5,
    connections: ['mintaka'],
  },
  {
    id: 'saiph',
    name: 'Saiph',
    type: 'Star',
    description: 'Étoile supergéante bleue d\'Orion.',
    distance: '650 AL',
    position: [130, -35, -75],
    color: '#A9CCE3',
    size: 2.5,
    connections: ['alnitak'],
  },
  {
    id: 'alnitak',
    name: 'Alnitak',
    type: 'Star',
    description: 'Étoile du baudrier d\'Orion.',
    distance: '1260 AL',
    position: [115, 5, -85],
    color: '#D4E6F1',
    size: 2,
    connections: ['alnilam'],
  },
  {
    id: 'alnilam',
    name: 'Alnilam',
    type: 'Star',
    description: 'Étoile centrale du baudrier d\'Orion.',
    distance: '2000 AL',
    position: [110, 0, -85],
    color: '#D4E6F1',
    size: 2.5,
    connections: ['mintaka'],
  },
  {
    id: 'mintaka',
    name: 'Mintaka',
    type: 'Star',
    description: 'Étoile du baudrier d\'Orion.',
    distance: '1200 AL',
    position: [105, -5, -85],
    color: '#D4E6F1',
    size: 2,
  },
  {
    id: 'andromeda',
    name: 'Galaxie d\'Andromède',
    type: 'Galaxy',
    description: 'La galaxie spirale la plus proche de la Voie lactée.',
    distance: '2.5 millions AL',
    position: [-200, 150, -300],
    color: '#9B59B6',
    size: 20,
  },
  {
    id: 'kepler-186f',
    name: 'Kepler-186f',
    type: 'Exoplanet',
    description: 'Première exoplanète de taille terrestre découverte dans la zone habitable de son étoile.',
    distance: '582 AL',
    position: [-150, -80, 200],
    color: '#27AE60',
    size: 1.8,
  }
];
