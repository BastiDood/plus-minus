<script>
  import './app.css';
  import favicon from '$lib/brand/favicon.ico?url';

  const { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
