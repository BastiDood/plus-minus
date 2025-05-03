<script lang="ts">
  import { type VariantProps, cva } from 'class-variance-authority';
  import { twMerge } from 'tailwind-merge';

  import type { HTMLButtonAttributes } from 'svelte/elements';

  const button = cva(['btn'], {
    variants: {
      color: {
        neutral: 'btn-neutral',
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        accent: 'btn-accent',
        info: 'btn-info',
        success: 'btn-success',
        warning: 'btn-warning',
        error: 'btn-error',
      },
      variant: {
        outline: 'btn-outline',
        dash: 'btn-dash',
        soft: 'btn-soft',
        ghost: 'btn-ghost',
        link: 'btn-link',
      },
      behavior: {
        active: 'btn-active',
        disabled: 'btn-disabled',
      },
      size: {
        xs: 'btn-xs',
        sm: 'btn-sm',
        md: 'btn-md',
        lg: 'btn-lg',
        xl: 'btn-xl',
      },
      modifier: {
        wide: 'btn-wide',
        block: 'btn-block',
        square: 'btn-square',
        circle: 'btn-circle',
      },
    },
  });

  type Props = VariantProps<typeof button> & HTMLButtonAttributes;
  const {
    color,
    variant,
    behavior,
    size,
    modifier,
    class: className,
    children,
    ...props
  }: Props = $props();
  const classes = $derived(
    twMerge(button({ color, variant, behavior, size, modifier, className })),
  );
</script>

<button class={classes} {...props}>{@render children?.()}</button>
