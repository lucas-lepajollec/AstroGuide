import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig, type Plugin} from 'vite';

function demoBuildPlugin(isDemoMode: boolean): Plugin {
  return {
    name: 'astroguide-demo-build',
    transformIndexHtml(html) {
      if (!isDemoMode) return html;

      return {
        html: html
          .replace(
            '<title>AstroGuide — Exploration spatiale interactive</title>',
            '<title>AstroGuide — Démonstration publique</title>',
          )
          .replace(
            'content="Explorez des objets célestes dans trois visualisations interactives et pédagogiques."',
            'content="Essayez la démonstration publique d’AstroGuide et explorez 39 objets célestes en 3D, sur une carte et par comparaison."',
          )
          .replace(
            'content="AstroGuide — Exploration spatiale interactive"',
            'content="AstroGuide — Démonstration publique"',
          ),
        tags: [
          {
            tag: 'meta',
            attrs: {name: 'robots', content: 'noindex, nofollow, noarchive'},
            injectTo: 'head',
          },
          {
            tag: 'meta',
            attrs: {name: 'astroguide-mode', content: 'demo'},
            injectTo: 'head',
          },
        ],
      };
    },
    generateBundle() {
      if (!isDemoMode) return;

      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: 'User-agent: *\nDisallow: /\n',
      });
    },
  };
}

export default defineConfig(({mode}) => ({
  plugins: [react(), tailwindcss(), demoBuildPlugin(mode === 'demo')],
  build: {
    sourcemap: false,
    target: 'es2022',
  },
  preview: {
    host: '127.0.0.1',
  },
}));
