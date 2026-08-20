# Contribuer à AstroGuide

Merci de contribuer à AstroGuide. Les changements doivent rester ciblés, vérifiables et accessibles.

## Préparer l'environnement

1. Forkez puis clonez le dépôt.
2. Utilisez Node.js 22.12 ou une version plus récente de la branche 22.
3. Installez exactement le lockfile et démarrez Vite :

```bash
npm ci --include=optional
npm run dev
```

L'application répond uniquement sur `http://127.0.0.1:2499`. Utilisez
`npm run dev:lan` seulement pour une vérification depuis un autre appareil du
réseau local.

## Avant une pull request

Exécutez la chaîne complète :

```bash
npm run check
```

Pour une modification d'interface, vérifiez au minimum 1440×900, 768×1024, 390×844 et 844×390, ainsi que le clavier et les interactions principales.

Pour une modification du catalogue :

- citez une source scientifique ou institutionnelle dans la pull request ;
- distinguez diamètre, rayon, masse et étendue ;
- signalez les estimations incertaines ;
- mettez à jour les tests d'intégrité si le nombre d'objets change.

## Pull requests

- limitez chaque pull request à un sujet cohérent ;
- utilisez des commits conventionnels (`feat:`, `fix:`, `docs:`, `test:`…) ;
- décrivez les validations réellement exécutées ;
- ajoutez des captures avant/après pour les changements visuels ;
- ne commettez jamais `.env`, clé API, build `dist/` ou dépendances installées.

Les échanges relèvent du [Code de conduite](CODE_OF_CONDUCT.md). Les vulnérabilités doivent être signalées selon [SECURITY.md](SECURITY.md), pas dans une issue publique.
