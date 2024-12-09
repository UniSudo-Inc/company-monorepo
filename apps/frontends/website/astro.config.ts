import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import type { AstroIntegration } from 'astro';
import compress from 'astro-compress';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';
import lit from '@astrojs/lit';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import astrowind from './vendor/integration';
import { lazyImagesRehypePlugin, readingTimeRemarkPlugin, responsiveTablesRehypePlugin } from './src/utils/frontmatter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const hasExternalScripts = false;
const whenExternalScripts = (items: (() => AstroIntegration) | (() => AstroIntegration)[] = []) =>
  hasExternalScripts ? (Array.isArray(items) ? items.map((item) => item()) : [items()]) : [];

export default defineConfig({
  output: 'static',

  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    mdx(),
    icon({
      include: {
        tabler: ['*'],
        'flat-color-icons': [
          'template',
          'gallery',
          'approval',
          'document',
          'advertising',
          'currency-exchange',
          'voice-presentation',
          'business-contact',
          'database',
        ],
      },
    }),
    ...whenExternalScripts(() =>
      partytown({
        config: { forward: ['dataLayer.push'] },
      }),
    ),
    compress({
      CSS: true,
      HTML: {
        'html-minifier-terser': {
          removeAttributeQuotes: false,
        },
      },
      Image: false,
      JavaScript: true,
      SVG: false,
      Logger: 1,
    }),
    astrowind({
      config: './src/config.yaml',
    }),
    lit(),
  ],

  image: {
    domains: ['cdn.pixabay.com'],
  },

  i18n: {
    defaultLocale: 'zh-cn',
    locales: ['zh-cn', 'en'],
  },

  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin],
    rehypePlugins: [responsiveTablesRehypePlugin, lazyImagesRehypePlugin],
  },

  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    optimizeDeps: {
      exclude: ['onnxruntime-web'],
    },
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: path.resolve(__dirname, '../../../node_modules/@ricky0123/vad-web/dist/vad.worklet.bundle.min.js'),
            dest: './_astro/',
          },
          {
            src: path.resolve(__dirname, '../../../node_modules/@ricky0123/vad-web/dist/silero_vad.onnx'),
            dest: './_astro/',
          },
          {
            src: path.resolve(__dirname, '../../../node_modules/onnxruntime-web/dist/ort-wasm-simd-threaded.wasm'),
            dest: './_astro/',
          },
          {
            src: path.resolve(__dirname, '../../../node_modules/onnxruntime-web/dist/ort-wasm-simd-threaded.mjs'),
            dest: './_astro/',
          },
        ],
      }),
    ],
  },
});
