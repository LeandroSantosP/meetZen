import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const card = tv({
  base: 'rounded-2xl border p-5',
  variants: {
    tone: {
      dark: 'border-border-subtle bg-bg-surface',
      darker: 'border-border-subtle bg-bg-surface-low',
      light: 'border-slate-200 bg-white',
    },
    padding: {
      sm: 'p-4',
      md: 'p-5',
      lg: 'p-6',
    },
  },
  defaultVariants: {
    tone: 'dark',
    padding: 'md',
  },
})

const cardTitle = tv({
  base: 'font-sans text-xl tracking-tight text-text-primary',
})

const cardDescription = tv({
  base: 'text-sm leading-relaxed text-text-secondary',
})

type CardVariants = VariantProps<typeof card>
type CardRootProps = ComponentProps<'div'> & CardVariants
type CardTitleProps = ComponentProps<'h3'>
type CardDescriptionProps = ComponentProps<'p'>

function CardRoot({ tone, padding, className, ...props }: CardRootProps) {
  return <div className={card({ tone, padding, className })} {...props} />
}

function CardTitle({ className, ...props }: CardTitleProps) {
  return <h3 className={cardTitle({ className })} {...props} />
}

function CardDescription({ className, ...props }: CardDescriptionProps) {
  return <p className={cardDescription({ className })} {...props} />
}

export {
  CardDescription,
  CardRoot,
  CardTitle,
  card,
  cardDescription,
  cardTitle,
  type CardDescriptionProps,
  type CardRootProps,
  type CardTitleProps,
  type CardVariants,
}
