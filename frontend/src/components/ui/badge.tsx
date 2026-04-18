import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const badge = tv({
  base: 'inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs uppercase tracking-[0.16em]',
  variants: {
    variant: {
      info: 'border-border-subtle bg-bg-surface/60 text-accent-primary',
      success: 'border-border-subtle bg-accent-success/10 text-accent-success',
      neutral: 'border-border-subtle bg-bg-surface/60 text-text-secondary',
      danger: 'border-border-subtle bg-accent-danger/10 text-accent-danger',
    },
  },
  defaultVariants: {
    variant: 'neutral',
  },
})

type BadgeVariants = VariantProps<typeof badge>
type BadgeProps = ComponentProps<'span'> & BadgeVariants

function Badge({ variant, className, ...props }: BadgeProps) {
  return <span className={badge({ variant, className })} {...props} />
}

export { Badge, badge, type BadgeProps, type BadgeVariants }
