import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

import tailwind from '@tailwindcss/vite';

export default defineConfig({
  build: { assetsInlineLimit: 0 },
  plugins: [tailwind(), sveltekit()],
});
