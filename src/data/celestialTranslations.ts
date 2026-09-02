import {celestialObjects, type CelestialObject} from './celestialData';
import type {Locale} from '../locales';

type CelestialTranslation = Pick<CelestialObject,
  'name' | 'scientificSize' | 'relativeSize' | 'scientificDistance' |
  'relativeDistance' | 'description'> & Pick<Partial<CelestialObject>, 'constellation' | 'relativeSizeLabel'>;

const tr = (
  name: string,
  scientificSize: string,
  relativeSize: string,
  scientificDistance: string,
  relativeDistance: string,
  description: string,
  constellation?: string,
  relativeSizeLabel?: string,
): CelestialTranslation => ({name, scientificSize, relativeSize, scientificDistance, relativeDistance, description, constellation, relativeSizeLabel});

const en: Record<string, CelestialTranslation> = {
  sun: tr('Sun', '1,392,700 km', '109× Earth', '0 km', 'Centre (0)', 'The star at the centre of our system. It accounts for 99.8% of the total mass of the Solar System.'),
  mercury: tr('Mercury', '4,879 km', '0.38× Earth', '57.9 million km', '3 light-minutes from the Sun', 'The closest planet to the Sun. Its crater-covered surface resembles that of our Moon.'),
  venus: tr('Venus', '12,104 km', '0.95× Earth', '108.2 million km', '6 light-minutes from the Sun', 'Earth’s sister planet, but with a very dense toxic atmosphere and a powerful greenhouse effect.'),
  earth: tr('Earth', '12,742 km', '1× (reference)', '149.6 million km', '8 light-minutes from the Sun', 'Our home. The only pale blue dot in the known universe known to harbour life.'),
  moon: tr('Moon', '3,474 km', '0.27× Earth', '384,400 km', '1 light-second from Earth', 'Earth’s only natural satellite. The first and only extraterrestrial world visited by humans.'),
  mars: tr('Mars', '6,779 km', '0.53× Earth', '225 million km', '12.5 light-minutes from the Sun', 'The red planet. It is home to Olympus Mons, the largest volcano in the Solar System.'),
  jupiter: tr('Jupiter', '139,820 km', '11× Earth', '778 million km', '43 light-minutes from the Sun', 'The gas giant. It is more massive than all the other planets in the Solar System combined.'),
  saturn: tr('Saturn', '116,460 km', '9× Earth', '1.4 billion km', '1.3 light-hours from the Sun', 'Famous for its spectacular ring system, made of rock and ice.'),
  uranus: tr('Uranus', '50,724 km', '4× Earth', '2.9 billion km', '2.6 light-hours from the Sun', 'An ice giant that rotates almost on its side. The origin of this extreme tilt remains debated.'),
  neptune: tr('Neptune', '49,244 km', '3.8× Earth', '4.5 billion km', '4 light-hours from the Sun', 'The windiest planet, swept by supersonic winds exceeding 2,000 km/h.'),
  pluto: tr('Pluto', '2,376 km', '0.18× Earth', '5.9 billion km', '5.5 light-hours from the Sun', 'The best-known dwarf planet, located in the distant, icy Kuiper Belt.'),
  'solar-system': tr('Solar System', '~240 AU (~36 billion km)', 'Approximate diameter of the heliosphere', '0 km', 'Our system', 'Our planetary system, with the Sun at its centre, eight planets, dwarf planets, and billions of small bodies.', undefined, 'Extent used'),
  sirius: tr('Sirius A', '2.38 million km', '1.7× the Sun', '81 trillion km', '8.6 light-years', 'The brightest star in the night sky. It belongs to an intensely luminous binary system.', 'Canis Major'),
  betelgeuse: tr('Betelgeuse', '1.2 billion km', '764× the Sun', '6 quadrillion km', '640 light-years', 'A red supergiant near the end of its life. At the centre of the Solar System, its outer atmosphere could extend beyond Jupiter’s orbit.', 'Orion'),
  rigel: tr('Rigel', '109 million km', '78× the Sun', '8.1 quadrillion km', '860 light-years', 'An extremely luminous blue supergiant that marks the left foot of Orion the hunter.', 'Orion'),
  bellatrix: tr('Bellatrix', '8.4 million km', '6× the Sun', '~2.4 quadrillion km', '~250 light-years', 'Orion’s left shoulder. A blue giant whose name means “female warrior” in Latin.', 'Orion'),
  polaris: tr('Polaris', '52 million km', '37× the Sun', '4 quadrillion km', '430 light-years', 'The North Star. It appears almost motionless because it is aligned with Earth’s rotation axis.', 'Ursa Minor'),
  vega: tr('Vega', '3.8 million km', '2.1× the Sun', '236 trillion km', '25 light-years', 'One of the brightest stars in our neighbourhood; it rotates so quickly that it is flattened at the poles.', 'Lyra'),
  antares: tr('Antares', '946 million km', '680× the Sun', '5.2 quadrillion km', '550 light-years', 'The red heart of Scorpius. A supergiant so vast that its atmosphere dissipates into space.', 'Scorpius'),
  arcturus: tr('Arcturus', '35 million km', '25× the Sun', '347 trillion km', '36.7 light-years', 'An old red giant and the brightest star in the northern celestial hemisphere.', 'Boötes'),
  deneb: tr('Deneb', '280 million km', '200× the Sun', '24 quadrillion km', '2,600 light-years', 'One of the most distant stars visible to the naked eye. It radiates roughly 200,000 times as much energy as the Sun.', 'Cygnus'),
  aldebaran: tr('Aldebaran', '61 million km', '44× the Sun', '615 trillion km', '65 light-years', 'The fiery red eye of Taurus, easy to spot in the winter sky.', 'Taurus'),
  spica: tr('Spica', '10 million km', '7× the Sun', '2.3 quadrillion km', '250 light-years', 'Two stars so close together that their mutual gravity distorts them into egg-like shapes.', 'Virgo'),
  dubhe: tr('Dubhe', '23 million km', '17× the Sun', '~1.2 quadrillion km', '~124 light-years', 'Alpha Ursae Majoris. Together with Merak, it forms the “Pointers” towards Polaris.', 'Ursa Major'),
  merak: tr('Merak', '4.2 million km', '3× the Sun', '~750 trillion km', '~79 light-years', 'Beta Ursae Majoris. Together with Dubhe, it points towards Polaris. It has a debris disc.', 'Ursa Major'),
  alioth: tr('Alioth', '5.6 million km', '4× the Sun', '~770 trillion km', '~81 light-years', 'The brightest star in Ursa Major. It is a magnetic variable star.', 'Ursa Major'),
  schedar: tr('Schedar', '56 million km', '42× the Sun', '~2.2 quadrillion km', '~228 light-years', 'Alpha Cassiopeiae. An orange giant anchoring Cassiopeia’s distinctive W shape.', 'Cassiopeia'),
  caph: tr('Caph', '5 million km', '3.5× the Sun', '~510 trillion km', '~54 light-years', 'Beta Cassiopeiae. A variable star that pulsates every 2.5 hours and forms the right end of the W.', 'Cassiopeia'),
  navi: tr('Navi', '14 million km', '10× the Sun', '~5.8 quadrillion km', '~610 light-years', 'Gamma Cassiopeiae. An eruptive star whose nickname reverses astronaut Gus “Ivan” Grissom’s middle name.', 'Cassiopeia'),
  'sagittarius-a': tr('Sagittarius A*', '~25 million km (Schwarzschild diameter)', '~4.3 million solar masses', '26,000 light-years', 'Centre of our galaxy', 'The supermassive black hole at the centre of the Milky Way, and our galaxy’s gravitational anchor.', undefined, 'Estimated mass'),
  'm87-bh': tr('M87*', '~38 billion km (Schwarzschild diameter)', '~6.5 billion solar masses', '55 million light-years', 'Extremely distant', 'The first black hole whose shadow was imaged, by the Event Horizon Telescope in 2019. Its galaxy produces a powerful relativistic jet.', undefined, 'Estimated mass'),
  'ton-618': tr('TON 618', '~240 billion km (estimate)', '~40.7 billion solar masses', '10.4 billion light-years', 'Near the limits of the observable universe', 'One of the most massive black holes known, at the heart of a very distant quasar. Its mass is estimated indirectly and varies with the method used.', undefined, 'Estimated mass'),
  'cygnus-x1': tr('Cygnus X-1', '~125 km (Schwarzschild diameter)', '~21 solar masses', '6,000 light-years', 'Within our galaxy', 'The first widely accepted stellar black hole. It draws gas from its companion star.', undefined, 'Estimated mass'),
  'phoenix-a': tr('Phoenix A (candidate)', '~590 billion km (hypothesis)', '~100 billion solar masses, highly uncertain', '~5.8 billion light-years (light-travel distance)', 'Phoenix Cluster, z≈0.596', 'The central black hole of the Phoenix Cluster. The value of 100 billion solar masses is an indirect extrapolation, not a robust measurement.', undefined, 'Proposed indirect mass'),
  'v404-cygni': tr('V404 Cygni', '~55 km (Schwarzschild diameter)', '~9 solar masses', '7,800 light-years', 'Within our galaxy', 'A binary black hole known for violent X-ray outbursts.', undefined, 'Estimated mass'),
  'oj-287': tr('OJ 287 (binary)', '~106 billion km (primary black hole)', '~18 billion solar masses', '3.5 billion light-years', 'Distant galaxy', 'Two supermassive black holes orbiting one another.', undefined, 'Primary mass'),
  andromeda: tr('Andromeda Galaxy', '~220,000 light-years across', '~2× the diameter of the Milky Way', '2.5 million light-years', 'Our cosmic neighbour', 'A large spiral galaxy approaching the Milky Way. Hubble and Gaia data suggest roughly a one-in-two chance of a direct collision within the next 10 billion years.'),
  sombrero: tr('Sombrero Galaxy', '~50,000 light-years across', '~0.5× the diameter of the Milky Way', '31 million light-years', 'Virgo Cluster region', 'Recognisable by its bright central bulge and dark dust lane.'),
  whirlpool: tr('Whirlpool Galaxy', '~76,000 light-years across', '~0.75× the diameter of the Milky Way', '23 million light-years', 'Canes Venatici', 'A spiral galaxy interacting with a companion galaxy, with spectacular arms.'),
};

const es: Record<string, CelestialTranslation> = {
  sun: tr('Sol', '1 392 700 km', '109× la Tierra', '0 km', 'Centro (0)', 'La estrella situada en el centro de nuestro sistema. Reúne el 99,8 % de la masa total del Sistema Solar.'),
  mercury: tr('Mercurio', '4 879 km', '0,38× la Tierra', '57,9 millones de km', '3 minutos-luz del Sol', 'El planeta más cercano al Sol. Su superficie, cubierta de cráteres, se parece a la de nuestra Luna.'),
  venus: tr('Venus', '12 104 km', '0,95× la Tierra', '108,2 millones de km', '6 minutos-luz del Sol', 'El planeta hermano de la Tierra, pero con una atmósfera tóxica muy densa y un potente efecto invernadero.'),
  earth: tr('Tierra', '12 742 km', '1× (referencia)', '149,6 millones de km', '8 minutos-luz del Sol', 'Nuestro hogar. El único punto azul pálido del universo conocido que sabemos que alberga vida.'),
  moon: tr('Luna', '3 474 km', '0,27× la Tierra', '384 400 km', '1 segundo-luz de la Tierra', 'El único satélite natural de la Tierra. El primer y único mundo extraterrestre visitado por seres humanos.'),
  mars: tr('Marte', '6 779 km', '0,53× la Tierra', '225 millones de km', '12,5 minutos-luz del Sol', 'El planeta rojo. Alberga el monte Olimpo, el volcán más grande del Sistema Solar.'),
  jupiter: tr('Júpiter', '139 820 km', '11× la Tierra', '778 millones de km', '43 minutos-luz del Sol', 'El gigante gaseoso. Es más masivo que todos los demás planetas del Sistema Solar juntos.'),
  saturn: tr('Saturno', '116 460 km', '9× la Tierra', '1 400 millones de km', '1,3 horas-luz del Sol', 'Famoso por su espectacular sistema de anillos, compuesto de roca y hielo.'),
  uranus: tr('Urano', '50 724 km', '4× la Tierra', '2 900 millones de km', '2,6 horas-luz del Sol', 'Un gigante helado que gira casi tumbado sobre su órbita. El origen de esta inclinación extrema sigue siendo objeto de debate.'),
  neptune: tr('Neptuno', '49 244 km', '3,8× la Tierra', '4 500 millones de km', '4 horas-luz del Sol', 'El planeta con los vientos más intensos, azotado por corrientes supersónicas que superan los 2 000 km/h.'),
  pluto: tr('Plutón', '2 376 km', '0,18× la Tierra', '5 900 millones de km', '5,5 horas-luz del Sol', 'El planeta enano más conocido, situado en el lejano y helado cinturón de Kuiper.'),
  'solar-system': tr('Sistema Solar', '~240 ua (~36 000 millones de km)', 'Diámetro aproximado de la heliosfera', '0 km', 'Nuestro sistema', 'Nuestro sistema planetario, con el Sol en el centro, ocho planetas, planetas enanos y miles de millones de cuerpos pequeños.', undefined, 'Extensión utilizada'),
  sirius: tr('Sirio A', '2,38 millones de km', '1,7× el Sol', '81 billones de km', '8,6 años-luz', 'La estrella más brillante del cielo nocturno. Pertenece a un sistema binario de intenso brillo.', 'Can Mayor'),
  betelgeuse: tr('Betelgeuse', '1 200 millones de km', '764× el Sol', '6 000 billones de km', '640 años-luz', 'Una supergigante roja al final de su vida. Situada en el centro del Sistema Solar, su atmósfera exterior podría extenderse más allá de la órbita de Júpiter.', 'Orión'),
  rigel: tr('Rigel', '109 millones de km', '78× el Sol', '8 100 billones de km', '860 años-luz', 'Una supergigante azul extremadamente luminosa que marca el pie izquierdo del cazador Orión.', 'Orión'),
  bellatrix: tr('Bellatrix', '8,4 millones de km', '6× el Sol', '~2 400 billones de km', '~250 años-luz', 'El hombro izquierdo de Orión. Una gigante azul cuyo nombre significa «guerrera» en latín.', 'Orión'),
  polaris: tr('Estrella Polar', '52 millones de km', '37× el Sol', '4 000 billones de km', '430 años-luz', 'La estrella del norte. Parece casi inmóvil porque está alineada con el eje de rotación de la Tierra.', 'Osa Menor'),
  vega: tr('Vega', '3,8 millones de km', '2,1× el Sol', '236 billones de km', '25 años-luz', 'Una de las estrellas más brillantes de nuestro vecindario; gira tan deprisa que está achatada por los polos.', 'Lira'),
  antares: tr('Antares', '946 millones de km', '680× el Sol', '5 200 billones de km', '550 años-luz', 'El corazón rojo de Escorpio. Una supergigante tan colosal que su atmósfera se disipa en el espacio.', 'Escorpio'),
  arcturus: tr('Arturo', '35 millones de km', '25× el Sol', '347 billones de km', '36,7 años-luz', 'Una antigua gigante roja y la estrella más brillante del hemisferio celeste norte.', 'Boyero'),
  deneb: tr('Deneb', '280 millones de km', '200× el Sol', '24 000 billones de km', '2 600 años-luz', 'Una de las estrellas más lejanas visibles a simple vista. Irradia unas 200 000 veces más energía que el Sol.', 'Cisne'),
  aldebaran: tr('Aldebarán', '61 millones de km', '44× el Sol', '615 billones de km', '65 años-luz', 'El intenso ojo rojo de Tauro, fácil de reconocer en el cielo de invierno.', 'Tauro'),
  spica: tr('Espiga', '10 millones de km', '7× el Sol', '2 300 billones de km', '250 años-luz', 'Dos estrellas tan próximas que su gravedad mutua las deforma hasta darles una forma parecida a un huevo.', 'Virgo'),
  dubhe: tr('Dubhe', '23 millones de km', '17× el Sol', '~1 200 billones de km', '~124 años-luz', 'Alfa Ursae Majoris. Junto con Merak forma las «Indicadoras» que señalan hacia la Estrella Polar.', 'Osa Mayor'),
  merak: tr('Merak', '4,2 millones de km', '3× el Sol', '~750 billones de km', '~79 años-luz', 'Beta Ursae Majoris. Junto con Dubhe señala hacia la Estrella Polar. Posee un disco de escombros.', 'Osa Mayor'),
  alioth: tr('Alioth', '5,6 millones de km', '4× el Sol', '~770 billones de km', '~81 años-luz', 'La estrella más brillante de la Osa Mayor. Es una estrella variable magnética.', 'Osa Mayor'),
  schedar: tr('Schedar', '56 millones de km', '42× el Sol', '~2 200 billones de km', '~228 años-luz', 'Alfa Cassiopeiae. Una gigante naranja que ancla la característica forma de W de Casiopea.', 'Casiopea'),
  caph: tr('Caph', '5 millones de km', '3,5× el Sol', '~510 billones de km', '~54 años-luz', 'Beta Cassiopeiae. Una estrella variable que pulsa cada 2,5 horas y forma el extremo derecho de la W.', 'Casiopea'),
  navi: tr('Navi', '14 millones de km', '10× el Sol', '~5 800 billones de km', '~610 años-luz', 'Gamma Cassiopeiae. Una estrella eruptiva cuyo apodo invierte el segundo nombre del astronauta Gus «Ivan» Grissom.', 'Casiopea'),
  'sagittarius-a': tr('Sagitario A*', '~25 millones de km (diámetro de Schwarzschild)', '~4,3 millones de masas solares', '26 000 años-luz', 'Centro de nuestra galaxia', 'El agujero negro supermasivo del centro de la Vía Láctea y el ancla gravitatoria de nuestra galaxia.', undefined, 'Masa estimada'),
  'm87-bh': tr('M87*', '~38 000 millones de km (diámetro de Schwarzschild)', '~6 500 millones de masas solares', '55 millones de años-luz', 'Extremadamente lejano', 'El primer agujero negro cuya sombra fue fotografiada, por el Event Horizon Telescope en 2019. Su galaxia produce un potente chorro relativista.', undefined, 'Masa estimada'),
  'ton-618': tr('TON 618', '~240 000 millones de km (estimación)', '~40 700 millones de masas solares', '10 400 millones de años-luz', 'Cerca de los límites del universo observable', 'Uno de los agujeros negros más masivos conocidos, en el centro de un cuásar muy lejano. Su masa se estima de forma indirecta y varía según el método empleado.', undefined, 'Masa estimada'),
  'cygnus-x1': tr('Cygnus X-1', '~125 km (diámetro de Schwarzschild)', '~21 masas solares', '6 000 años-luz', 'En nuestra galaxia', 'El primer agujero negro estelar ampliamente aceptado. Extrae gas de su estrella compañera.', undefined, 'Masa estimada'),
  'phoenix-a': tr('Phoenix A (candidato)', '~590 000 millones de km (hipótesis)', '~100 000 millones de masas solares, muy incierto', '~5 800 millones de años-luz (distancia de recorrido de la luz)', 'Cúmulo de Fénix, z≈0,596', 'El agujero negro central del Cúmulo de Fénix. El valor de 100 000 millones de masas solares es una extrapolación indirecta, no una medición sólida.', undefined, 'Masa indirecta propuesta'),
  'v404-cygni': tr('V404 Cygni', '~55 km (diámetro de Schwarzschild)', '~9 masas solares', '7 800 años-luz', 'En nuestra galaxia', 'Un agujero negro binario conocido por sus violentas erupciones de rayos X.', undefined, 'Masa estimada'),
  'oj-287': tr('OJ 287 (binario)', '~106 000 millones de km (agujero negro primario)', '~18 000 millones de masas solares', '3 500 millones de años-luz', 'Galaxia lejana', 'Dos agujeros negros supermasivos que orbitan uno alrededor del otro.', undefined, 'Masa del primario'),
  andromeda: tr('Galaxia de Andrómeda', '~220 000 años-luz de diámetro', '~2× el diámetro de la Vía Láctea', '2,5 millones de años-luz', 'Nuestra vecina cósmica', 'Una gran galaxia espiral que se aproxima a la Vía Láctea. Los datos de Hubble y Gaia indican aproximadamente una probabilidad entre dos de colisión directa durante los próximos 10 000 millones de años.'),
  sombrero: tr('Galaxia del Sombrero', '~50 000 años-luz de diámetro', '~0,5× el diámetro de la Vía Láctea', '31 millones de años-luz', 'Región del Cúmulo de Virgo', 'Reconocible por su brillante bulbo central y su oscura franja de polvo.'),
  whirlpool: tr('Galaxia del Remolino', '~76 000 años-luz de diámetro', '~0,75× el diámetro de la Vía Láctea', '23 millones de años-luz', 'Perros de Caza', 'Una galaxia espiral que interactúa con una galaxia compañera y presenta brazos espectaculares.'),
};
const de: Record<string, CelestialTranslation> = {
  sun: tr('Sonne', '1.392.700 km', '109× Erde', '0 km', 'Zentrum (0)', 'Der Stern im Zentrum unseres Systems. Er vereint 99,8 % der gesamten Masse des Sonnensystems.'),
  mercury: tr('Merkur', '4.879 km', '0,38× Erde', '57,9 Millionen km', '3 Lichtminuten von der Sonne', 'Der sonnennächste Planet. Seine von Kratern bedeckte Oberfläche ähnelt der unseres Mondes.'),
  venus: tr('Venus', '12.104 km', '0,95× Erde', '108,2 Millionen km', '6 Lichtminuten von der Sonne', 'Der Schwesterplanet der Erde, jedoch mit einer sehr dichten giftigen Atmosphäre und einem starken Treibhauseffekt.'),
  earth: tr('Erde', '12.742 km', '1× (Referenz)', '149,6 Millionen km', '8 Lichtminuten von der Sonne', 'Unsere Heimat. Der einzige blassblaue Punkt im bekannten Universum, von dem wir wissen, dass er Leben beherbergt.'),
  moon: tr('Mond', '3.474 km', '0,27× Erde', '384.400 km', '1 Lichtsekunde von der Erde', 'Der einzige natürliche Satellit der Erde. Die erste und einzige außerirdische Welt, die Menschen besucht haben.'),
  mars: tr('Mars', '6.779 km', '0,53× Erde', '225 Millionen km', '12,5 Lichtminuten von der Sonne', 'Der rote Planet. Auf ihm befindet sich Olympus Mons, der größte Vulkan des Sonnensystems.'),
  jupiter: tr('Jupiter', '139.820 km', '11× Erde', '778 Millionen km', '43 Lichtminuten von der Sonne', 'Der Gasriese. Er ist massereicher als alle anderen Planeten des Sonnensystems zusammen.'),
  saturn: tr('Saturn', '116.460 km', '9× Erde', '1,4 Milliarden km', '1,3 Lichtstunden von der Sonne', 'Berühmt für sein spektakuläres Ringsystem aus Gestein und Eis.'),
  uranus: tr('Uranus', '50.724 km', '4× Erde', '2,9 Milliarden km', '2,6 Lichtstunden von der Sonne', 'Ein Eisriese, der nahezu auf der Seite liegend rotiert. Der Ursprung dieser extremen Neigung ist weiterhin umstritten.'),
  neptune: tr('Neptun', '49.244 km', '3,8× Erde', '4,5 Milliarden km', '4 Lichtstunden von der Sonne', 'Der windreichste Planet, über den Überschallwinde mit mehr als 2.000 km/h hinwegfegen.'),
  pluto: tr('Pluto', '2.376 km', '0,18× Erde', '5,9 Milliarden km', '5,5 Lichtstunden von der Sonne', 'Der bekannteste Zwergplanet im fernen, eisigen Kuipergürtel.'),
  'solar-system': tr('Sonnensystem', '~240 AE (~36 Milliarden km)', 'Ungefährer Durchmesser der Heliosphäre', '0 km', 'Unser System', 'Unser Planetensystem mit der Sonne im Zentrum, acht Planeten, Zwergplaneten und Milliarden kleiner Himmelskörper.', undefined, 'Verwendete Ausdehnung'),
  sirius: tr('Sirius A', '2,38 Millionen km', '1,7× die Sonne', '81 Billionen km', '8,6 Lichtjahre', 'Der hellste Stern am Nachthimmel. Er gehört zu einem besonders leuchtkräftigen Doppelsternsystem.', 'Großer Hund'),
  betelgeuse: tr('Beteigeuze', '1,2 Milliarden km', '764× die Sonne', '6 Billiarden km', '640 Lichtjahre', 'Ein roter Überriese am Ende seines Lebens. Im Zentrum des Sonnensystems könnte seine äußere Atmosphäre über die Umlaufbahn des Jupiter hinausreichen.', 'Orion'),
  rigel: tr('Rigel', '109 Millionen km', '78× die Sonne', '8,1 Billiarden km', '860 Lichtjahre', 'Ein extrem leuchtkräftiger blauer Überriese, der den linken Fuß des Jägers Orion markiert.', 'Orion'),
  bellatrix: tr('Bellatrix', '8,4 Millionen km', '6× die Sonne', '~2,4 Billiarden km', '~250 Lichtjahre', 'Die linke Schulter des Orion. Ein blauer Riese, dessen Name auf Latein „Kriegerin“ bedeutet.', 'Orion'),
  polaris: tr('Polarstern', '52 Millionen km', '37× die Sonne', '4 Billiarden km', '430 Lichtjahre', 'Der Nordstern. Er scheint nahezu stillzustehen, weil er an der Rotationsachse der Erde ausgerichtet ist.', 'Kleiner Bär'),
  vega: tr('Wega', '3,8 Millionen km', '2,1× die Sonne', '236 Billionen km', '25 Lichtjahre', 'Einer der hellsten Sterne unserer Nachbarschaft; er rotiert so schnell, dass er an den Polen abgeflacht ist.', 'Leier'),
  antares: tr('Antares', '946 Millionen km', '680× die Sonne', '5,2 Billiarden km', '550 Lichtjahre', 'Das rote Herz des Skorpions. Ein so gewaltiger Überriese, dass sich seine Atmosphäre in den Weltraum verflüchtigt.', 'Skorpion'),
  arcturus: tr('Arktur', '35 Millionen km', '25× die Sonne', '347 Billionen km', '36,7 Lichtjahre', 'Ein alter roter Riese und der hellste Stern der nördlichen Himmelshalbkugel.', 'Bärenhüter'),
  deneb: tr('Deneb', '280 Millionen km', '200× die Sonne', '24 Billiarden km', '2.600 Lichtjahre', 'Einer der fernsten mit bloßem Auge sichtbaren Sterne. Er strahlt ungefähr 200.000-mal so viel Energie ab wie die Sonne.', 'Schwan'),
  aldebaran: tr('Aldebaran', '61 Millionen km', '44× die Sonne', '615 Billionen km', '65 Lichtjahre', 'Das leuchtend rote Auge des Stiers, das am Winterhimmel leicht zu erkennen ist.', 'Stier'),
  spica: tr('Spica', '10 Millionen km', '7× die Sonne', '2,3 Billiarden km', '250 Lichtjahre', 'Zwei so nahe Sterne, dass ihre gegenseitige Gravitation sie eiförmig verformt.', 'Jungfrau'),
  dubhe: tr('Dubhe', '23 Millionen km', '17× die Sonne', '~1,2 Billiarden km', '~124 Lichtjahre', 'Alpha Ursae Majoris. Zusammen mit Merak bildet er die „Zeigersterne“ zum Polarstern.', 'Großer Bär'),
  merak: tr('Merak', '4,2 Millionen km', '3× die Sonne', '~750 Billionen km', '~79 Lichtjahre', 'Beta Ursae Majoris. Zusammen mit Dubhe weist er zum Polarstern. Er besitzt eine Trümmerscheibe.', 'Großer Bär'),
  alioth: tr('Alioth', '5,6 Millionen km', '4× die Sonne', '~770 Billionen km', '~81 Lichtjahre', 'Der hellste Stern im Großen Bären. Er ist ein magnetisch veränderlicher Stern.', 'Großer Bär'),
  schedar: tr('Schedar', '56 Millionen km', '42× die Sonne', '~2,2 Billiarden km', '~228 Lichtjahre', 'Alpha Cassiopeiae. Ein orangefarbener Riese, der die charakteristische W-Form der Kassiopeia verankert.', 'Kassiopeia'),
  caph: tr('Caph', '5 Millionen km', '3,5× die Sonne', '~510 Billionen km', '~54 Lichtjahre', 'Beta Cassiopeiae. Ein veränderlicher Stern, der alle 2,5 Stunden pulsiert und das rechte Ende des W bildet.', 'Kassiopeia'),
  navi: tr('Navi', '14 Millionen km', '10× die Sonne', '~5,8 Billiarden km', '~610 Lichtjahre', 'Gamma Cassiopeiae. Ein eruptiver Stern, dessen Spitzname den zweiten Vornamen des Astronauten Gus „Ivan“ Grissom umkehrt.', 'Kassiopeia'),
  'sagittarius-a': tr('Sagittarius A*', '~25 Millionen km (Schwarzschild-Durchmesser)', '~4,3 Millionen Sonnenmassen', '26.000 Lichtjahre', 'Zentrum unserer Galaxie', 'Das supermassereiche Schwarze Loch im Zentrum der Milchstraße und der gravitative Anker unserer Galaxie.', undefined, 'Geschätzte Masse'),
  'm87-bh': tr('M87*', '~38 Milliarden km (Schwarzschild-Durchmesser)', '~6,5 Milliarden Sonnenmassen', '55 Millionen Lichtjahre', 'Extrem weit entfernt', 'Das erste Schwarze Loch, dessen Schatten 2019 vom Event Horizon Telescope abgebildet wurde. Seine Galaxie erzeugt einen starken relativistischen Jet.', undefined, 'Geschätzte Masse'),
  'ton-618': tr('TON 618', '~240 Milliarden km (Schätzung)', '~40,7 Milliarden Sonnenmassen', '10,4 Milliarden Lichtjahre', 'Nahe den Grenzen des beobachtbaren Universums', 'Eines der massereichsten bekannten Schwarzen Löcher im Zentrum eines sehr fernen Quasars. Seine Masse wird indirekt geschätzt und hängt von der verwendeten Methode ab.', undefined, 'Geschätzte Masse'),
  'cygnus-x1': tr('Cygnus X-1', '~125 km (Schwarzschild-Durchmesser)', '~21 Sonnenmassen', '6.000 Lichtjahre', 'In unserer Galaxie', 'Das erste allgemein anerkannte stellare Schwarze Loch. Es zieht Gas von seinem Begleitstern ab.', undefined, 'Geschätzte Masse'),
  'phoenix-a': tr('Phoenix A (Kandidat)', '~590 Milliarden km (Hypothese)', '~100 Milliarden Sonnenmassen, höchst unsicher', '~5,8 Milliarden Lichtjahre (Lichtlaufstrecke)', 'Phoenix-Galaxienhaufen, z≈0,596', 'Das zentrale Schwarze Loch des Phoenix-Galaxienhaufens. Der Wert von 100 Milliarden Sonnenmassen ist eine indirekte Extrapolation und keine belastbare Messung.', undefined, 'Vorgeschlagene indirekte Masse'),
  'v404-cygni': tr('V404 Cygni', '~55 km (Schwarzschild-Durchmesser)', '~9 Sonnenmassen', '7.800 Lichtjahre', 'In unserer Galaxie', 'Ein binäres Schwarzes Loch, das für heftige Röntgenausbrüche bekannt ist.', undefined, 'Geschätzte Masse'),
  'oj-287': tr('OJ 287 (Doppelsystem)', '~106 Milliarden km (primäres Schwarzes Loch)', '~18 Milliarden Sonnenmassen', '3,5 Milliarden Lichtjahre', 'Ferne Galaxie', 'Zwei supermassereiche Schwarze Löcher, die einander umkreisen.', undefined, 'Masse des Primärobjekts'),
  andromeda: tr('Andromedagalaxie', '~220.000 Lichtjahre Durchmesser', '~2× der Durchmesser der Milchstraße', '2,5 Millionen Lichtjahre', 'Unsere kosmische Nachbarin', 'Eine große Spiralgalaxie, die sich der Milchstraße nähert. Daten von Hubble und Gaia deuten auf eine ungefähr fünfzigprozentige Wahrscheinlichkeit einer direkten Kollision innerhalb der nächsten 10 Milliarden Jahre hin.'),
  sombrero: tr('Sombrerogalaxie', '~50.000 Lichtjahre Durchmesser', '~0,5× der Durchmesser der Milchstraße', '31 Millionen Lichtjahre', 'Region des Virgo-Galaxienhaufens', 'Erkennbar an ihrer hellen zentralen Ausbuchtung und dem dunklen Staubband.'),
  whirlpool: tr('Whirlpool-Galaxie', '~76.000 Lichtjahre Durchmesser', '~0,75× der Durchmesser der Milchstraße', '23 Millionen Lichtjahre', 'Jagdhunde', 'Eine Spiralgalaxie, die mit einer Begleitgalaxie wechselwirkt und spektakuläre Arme besitzt.'),
};

const translatedCatalogues: Record<Exclude<Locale, 'fr'>, Record<string, CelestialTranslation>> = {en, es, de};

export function getCelestialObjects(locale: Locale): CelestialObject[] {
  if (locale === 'fr') return celestialObjects.map((object) => ({...object}));
  const catalogue = translatedCatalogues[locale];
  return celestialObjects.map((object) => {
    const translation = catalogue[object.id];
    if (!translation) throw new Error(`Missing ${locale} translation for celestial object: ${object.id}`);
    return {...object, ...translation};
  });
}

export function getCelestialTranslationGaps() {
  return (Object.entries(translatedCatalogues) as [Exclude<Locale, 'fr'>, Record<string, CelestialTranslation>][])
    .flatMap(([locale, catalogue]) => celestialObjects.filter((object) => !catalogue[object.id]).map((object) => `${locale}:${object.id}`));
}
