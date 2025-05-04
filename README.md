# Plus/Minus

**Plus/Minus** is a demo app written for the _CS Week 2025: HackEngg_ hackathon workshops held at the [University of the Philippines][up] - [Diliman][upd], [Department of Computer Science][upd-dcs] from May 7-8, 2025.

[up]: http://up.edu.ph/
[upd]: http://upd.edu.ph/
[upd-dcs]: http://dcs.upd.edu.ph/

In line with the theme of the hackathon, this app demonstrates a proof-of-concept for a local-first [progressive web app][pwa] powered by [SvelteKit][svelte-kit] (user interface) and [Dexie.js][dexie] (local data persistence).

[pwa]: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps
[svelte-kit]: https://svelte.dev/docs/kit/introduction
[dexie]: https://dexie.org/

# Development

## Running the Web Server

```bash
# Install the dependencies.
pnpm install

# Synchronize auto-generated files from SvelteKit. Already run by `pnpm install` by default.
pnpm prepare

# Start the development server with live reloading + hot module replacement.
pnpm dev

# Compile the production build (i.e., with optimizations).
pnpm build

# Start the production preview server.
pnpm preview
```

## Linting the Codebase

```bash
# Check Formatting
pnpm fmt # prettier

# Apply Formatting Auto-fix
pnpm fmt:fix # prettier --write

# Check Linting Rules
pnpm lint:eslint # eslint
pnpm lint:svelte # svelte-check

# Check All Lints in Parallel
pnpm lint
```
