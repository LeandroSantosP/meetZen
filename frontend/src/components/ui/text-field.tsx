import type { ComponentProps, ReactNode } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '@/lib/cn'

const textField = tv({
  base: 'w-full rounded-xl border bg-bg-surface px-3 py-3 text-sm text-text-primary outline-none transition placeholder:text-text-muted focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20',
  variants: {
    tone: {
      dark: 'border-border-subtle bg-bg-surface text-text-primary',
      light: 'border-slate-300 bg-white text-slate-900',
    },
    size: {
      md: 'py-2.5',
      lg: 'py-3',
    },
  },
  defaultVariants: {
    tone: 'dark',
    size: 'lg',
  },
})

const textFieldContainer = tv({
  base: 'group flex w-full items-center gap-2 rounded-xl border bg-bg-surface p-1 transition focus-within:border-accent-primary/60',
  variants: {
    tone: {
      dark: 'border-border-subtle bg-bg-surface',
      light: 'border-slate-300 bg-white',
    },
  },
  defaultVariants: {
    tone: 'dark',
  },
})

type TextFieldVariants = VariantProps<typeof textField>
type TextFieldProps = ComponentProps<'input'> & TextFieldVariants

function TextField({ tone, size, className, ...props }: TextFieldProps) {
  return <input className={textField({ tone, size, className })} {...props} />
}

type TextFieldGroupVariants = VariantProps<typeof textFieldContainer>
type TextFieldGroupProps = ComponentProps<'div'> & TextFieldGroupVariants

function TextFieldGroup({ tone, className, ...props }: TextFieldGroupProps) {
  return <div className={textFieldContainer({ tone, className })} {...props} />
}

type TextFieldAddonProps = ComponentProps<'div'> & {
  icon?: ReactNode
}

function TextFieldAddon({ icon, className, children, ...props }: TextFieldAddonProps) {
  return (
    <div className={cn('flex items-center text-text-secondary', className)} {...props}>
      {icon}
      {children}
    </div>
  )
}

export {
  TextField,
  TextFieldAddon,
  TextFieldGroup,
  textField,
  textFieldContainer,
  type TextFieldGroupProps,
  type TextFieldGroupVariants,
  type TextFieldProps,
  type TextFieldVariants,
}
