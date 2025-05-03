<script lang="ts">
  import { type VariantProps, cva } from 'class-variance-authority';
  import { twMerge } from 'tailwind-merge';

  import type { HTMLTableAttributes } from 'svelte/elements';

  const table = cva(['table'], {
    variants: {
      modifier: {
        zebra: 'table-zebra',
      },
      pin: {
        rows: 'table-pin-rows',
        cols: 'table-pin-cols',
      },
      size: {
        xs: 'table-xs',
        sm: 'table-sm',
        md: 'table-md',
        lg: 'table-lg',
        xl: 'table-xl',
      },
    },
  });

  type Props = VariantProps<typeof table> & HTMLTableAttributes;
  const { modifier, pin, size, class: className, children, ...props }: Props = $props();
  const classes = $derived(twMerge(table({ modifier, pin, size, className })));
</script>

<table class={classes} {...props}>{@render children?.()}</table>
