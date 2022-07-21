import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { crx } from '@crxjs/vite-plugin';
import { resolve } from 'path';
import manifest from './src/manifest.json';

const isDevelopment = true;

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'classic',
    }),
    crx({ manifest }),
  ],
  resolve: {
    alias: {
      app: resolve(__dirname, 'src', 'app'),
      components: resolve(__dirname, 'src', 'components'),
      hooks: resolve(__dirname, 'src', 'hooks'),
    },
  },
  css: {
    modules: {
      generateScopedName: isDevelopment ? '[name]__[local]__[hash:base64:5]' : '[hash:base64:5]',
    },
  },
});
``;
