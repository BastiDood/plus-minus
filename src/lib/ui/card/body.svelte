<script lang="ts">
  import { type ClassNameValue, twMerge } from 'tailwind-merge';

  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'class'> {
    class?: ClassNameValue;
  }

  const { class: className, children, ...props }: Props = $props();
  const classes = $derived(twMerge('card-body', className));
</script>

<div class={classes} {...props}>{@render children?.()}</div>
