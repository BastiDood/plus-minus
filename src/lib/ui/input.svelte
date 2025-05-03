<script lang="ts">
  import { type VariantProps, cva } from 'class-variance-authority';
  import { twMerge } from 'tailwind-merge';

  import type { HTMLInputAttributes } from 'svelte/elements';

  const input = cva(['input'], {
    variants: {
      variant: {
        ghost: 'input-ghost',
      },
      color: {
        neutral: 'input-neutral',
        primary: 'input-primary',
        secondary: 'input-secondary',
        accent: 'input-accent',
        info: 'input-info',
        success: 'input-success',
        warning: 'input-warning',
        error: 'input-error',
      },
      size: {
        xs: 'input-xs',
        sm: 'input-sm',
        md: 'input-md',
        lg: 'input-lg',
        xl: 'input-xl',
      },
    },
  });

  type Props = VariantProps<typeof input> & HTMLInputAttributes;
  const { variant, color, size, class: className, ...props }: Props = $props();
  const classes = $derived(twMerge(input({ color, variant, size, className })));
</script>

<input class={classes} {...props} />
