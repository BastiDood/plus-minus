<script lang="ts">
  import { type VariantProps, cva } from 'class-variance-authority';
  import { twMerge } from 'tailwind-merge';

  import type { Snippet } from 'svelte';

  const card = cva(['card p-4'], {
    variants: {
      color: {
        neutral: 'bg-neutral',
        primary: 'bg-primary',
        secondary: 'bg-secondary',
        accent: 'bg-accent',
        info: 'bg-info',
        success: 'bg-success',
        warning: 'bg-warning',
        error: 'bg-error',
      },
      variant: {
        border: 'card-border',
        dash: 'card-dash',
      },
      image: {
        side: 'card-side',
        full: 'image-full',
      },
      size: {
        xs: 'card-xs',
        sm: 'card-sm',
        md: 'card-md',
        lg: 'card-lg',
        xl: 'card-xl',
      },
    },
  });

  type CardVariants = VariantProps<typeof card>;
  interface Props {
    open?: boolean;
    children?: Snippet;
    class?: string;
  }

  // eslint-disable-next-line prefer-const
  let {
    open = $bindable(false),
    color,
    variant,
    image,
    size,
    children,
    class: className,
  }: Props & CardVariants = $props();
  const classes = $derived(twMerge(card({ color, variant, image, size, className })));
</script>

<div class={classes}>
  {@render children?.()}
</div>
