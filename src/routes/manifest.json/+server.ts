import { json } from '@sveltejs/kit';

import type { WebAppManifest } from 'web-app-manifest';

import logo192 from '$lib/brand/logo-192.png?url';
import logo512 from '$lib/brand/logo-512.png?url';

export const prerender = true;

export function GET() {
  return json({
    name: 'Plus/Minus',
    short_name: 'Plus/Minus',
    description:
      'A simple budget tracker app written as a local-first progressive web app powered by SvelteKit and Dexie.js.',
    start_url: '/',
    display: 'standalone',
    theme_color: '#ffb163',
    prefer_related_applications: false,
    icons: [
      { src: logo192, type: 'image/png', sizes: '192x192' },
      { src: logo512, type: 'image/png', sizes: '512x512' },
    ],
  } satisfies WebAppManifest);
}
