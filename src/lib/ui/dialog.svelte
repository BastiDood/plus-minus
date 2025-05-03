<script lang="ts">
  import { Dialog } from 'bits-ui';
  import { fade, fly } from 'svelte/transition';

  import type { Snippet } from 'svelte';

  interface Props {
    open?: boolean;
    trigger: Snippet<[Record<string, unknown>]>;
    content?: Snippet;
  }

  // eslint-disable-next-line prefer-const
  let { open = $bindable(false), trigger, content }: Props = $props();
</script>

<Dialog.Root bind:open>
  <Dialog.Trigger>
    {#snippet child({ props })}
      {@render trigger(props)}
    {/snippet}
  </Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay forceMount>
      {#snippet child({ open, props })}
        {#if open}
          <div
            class="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs"
            {...props}
            transition:fade={{ duration: 150 }}
          ></div>
        {/if}
      {/snippet}
    </Dialog.Overlay>
    <Dialog.Content forceMount>
      {#snippet child({ open, props })}
        {#if open}
          <aside
            class="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2"
            {...props}
            transition:fly={{ y: 10, duration: 150 }}
          >
            {@render content?.()}
          </aside>
        {/if}
      {/snippet}
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
