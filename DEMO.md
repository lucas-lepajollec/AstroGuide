# Démonstration publique AstroGuide

La démonstration est un mode de construction du produit AstroGuide, pas une copie de la landing page ni une application parallèle.

## Périmètre

- les trois vues du produit sont disponibles ;
- les 39 objets du catalogue intégré sont consultables ;
- aucun compte, cookie, stockage navigateur, backend ou service externe n'est utilisé ;
- les choix de navigation sont temporaires ;
- le bouton de remise à zéro recharge une session vierge ;
- l'accueil indique les limites scientifiques avant l'exploration ;
- le build demande aux moteurs de recherche de ne pas indexer la démo.

Les positions, distances visuelles, orbites et tailles rendues restent illustratives. La démo ne doit pas être présentée comme une simulation astrophysique exacte.

## Utilisation locale

```bash
npm ci --include=optional
npm run dev:demo
```

Pour tester l'artefact destiné à l'hébergement :

```bash
npm run build:demo
npm run preview:demo
```

## Validation obligatoire avant publication

```bash
npm run check
npm audit --audit-level=high
```

La revue doit couvrir au minimum :

- 1440 × 900 ;
- 768 × 1024 ;
- 390 × 844 ;
- 844 × 390 ;
- ouverture et fermeture de l'accueil ;
- passage entre les trois vues ;
- recherche et sélection d'un astre ;
- remise à zéro de la session ;
- navigation clavier et préférence de réduction des animations ;
- présence des métadonnées `noindex` et des en-têtes de sécurité.

## Hébergement

`vercel.json` construit uniquement le mode démo avec `npm run build:demo`. La landing AstroGuide reste un projet séparé et n'est pas nécessaire au fonctionnement de la démonstration.

Avant d'annoncer une URL publique, il faut vérifier le déploiement réel en HTTPS, ses en-têtes, ses ressources statiques et les quatre formats d'écran ci-dessus. Le sous-domaine prévu par l'écosystème est `demo.astroguide.lucas-homelab.fr`, mais sa configuration DNS reste un chantier distinct.
