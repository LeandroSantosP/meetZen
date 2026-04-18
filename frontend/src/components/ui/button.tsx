import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const button = tv({
  base: 'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/40 disabled:cursor-not-allowed disabled:opacity-60',
  variants: {
    variant: {
      primary: 'bg-accent-primary text-text-on-primary hover:brightness-110',
      secondary:
        'border border-border-subtle bg-bg-surface/70 text-text-primary hover:bg-bg-surface-strong',
      ghost: 'text-text-secondary hover:bg-bg-surface/60 hover:text-text-primary',
      danger: 'bg-accent-danger text-text-on-danger hover:brightness-110',
    },
    size: {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2.5 text-sm',
      lg: 'px-5 py-3 text-base',
      icon: 'h-9 w-9 p-0',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

type ButtonVariants = VariantProps<typeof button>

type ButtonProps = ComponentProps<'button'> & ButtonVariants

function Button({ variant, size, className, ...props }: ButtonProps) {
  return <button className={button({ variant, size, className })} {...props} />
}

export { Button, button, type ButtonProps, type ButtonVariants }
