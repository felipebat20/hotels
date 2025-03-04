import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import tsconfigPaths from 'vite-tsconfig-paths';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'happy-dom',
    setupFiles: 'test/unit/setup.ts',
    include: [
      // Matches vitest tests in any subfolder of 'src' or into 'test/vitest/__tests__'
      // Matches all files with extension 'js', 'jsx', 'ts' and 'tsx'
      'src/**/*.vitest.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      'test/unit/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],
  },
  resolve: {
    alias: {
      'src': fileURLToPath(new URL('./src', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  plugins: [
    vue({ template: { transformAssetUrls } }),
    quasar({
      sassVariables: 'src/quasar-variables.scss',
    }),
    tsconfigPaths(),
  ],
});
