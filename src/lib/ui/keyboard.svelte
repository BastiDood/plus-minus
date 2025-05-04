<script lang="ts">
  import { type VariantProps, cva } from 'class-variance-authority';
  import { twMerge } from 'tailwind-merge';

  import type { HTMLAttributes } from 'svelte/elements';

  const kbd = cva(['kbd'], {
    variants: {
      size: {
        xs: 'kbd-xs',
        sm: 'kbd-sm',
        md: 'kbd-md',
        lg: 'kbd-lg',
        xl: 'kbd-xl',
      },
    },
  });

  type Props = VariantProps<typeof kbd> & HTMLAttributes<HTMLElement>;
  const { size, class: className, children, ...props }: Props = $props();
  const classes = $derived(twMerge(kbd({ size, className })));
</script>

<kbd class={classes} {...props}>{@render children?.()}</kbd>
