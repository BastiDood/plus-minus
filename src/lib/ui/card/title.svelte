<script lang="ts">
  import { type ClassNameValue, twMerge } from 'tailwind-merge';

  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends Omit<HTMLAttributes<HTMLElement>, 'class'> {
    class?: ClassNameValue;
  }

  const { class: className, children, ...props }: Props = $props();
  const classes = $derived(twMerge('card-title', className));
</script>

<header class={classes} {...props}>{@render children?.()}</header>
