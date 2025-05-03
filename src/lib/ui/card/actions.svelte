<script lang="ts">
  import { type ClassNameValue, twMerge } from 'tailwind-merge';

  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends Omit<HTMLAttributes<HTMLElement>, 'class'> {
    class?: ClassNameValue;
  }

  const { class: className, children, ...props }: Props = $props();
  const classes = $derived(twMerge('card-body', className));
</script>

<footer class={classes} {...props}>{@render children?.()}</footer>
