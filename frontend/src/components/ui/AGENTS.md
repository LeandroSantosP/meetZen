# UI Components - Padroes de Criacao

Guia de referencia para manter consistencia ao criar novos componentes em `src/components/ui`.

## Regras gerais

1. Use apenas named exports (nunca `export default`).
2. Exporte componente, funcao de variantes (`tv`) e tipos.
3. Estenda props nativas com `ComponentProps<'elemento'>`.
4. Nao declare `className` manualmente no tipo.
5. Um arquivo por componente, nome em kebab-case.

## Estilizacao

### Tailwind Variants

Use `tailwind-variants` para base e variantes:

```tsx
import { tv, type VariantProps } from 'tailwind-variants'
```

### Merge de classes

- Com `tv`: passe `className` em `tv({ ..., className })`.
- Sem `tv`: use `twMerge` (via `cn` em `src/lib/cn.ts`).
- Nunca una classes com interpolacao de string.

## Cores e fontes

- Use classes canonicas geradas pelo `@theme` (`bg-bg-*`, `text-text-*`, `border-border-*`, `bg-accent-*`).
- Evite hex hardcoded em componentes UI.
- Para SVG (`fill`, `stroke`, `stopColor`), pode usar `var(--color-*)`.
- Fontes: `font-sans` e `font-mono`.

## Composicao vs props

- Use composicao para componentes com 2+ areas visuais distintas.
- Use props simples para primitivos atomicos (`Button`, `Badge`, etc.).
- Em composicao, prefira exports com prefixo (`CardRoot`, `CardTitle`, ...), sem dot notation.

## Checklist

- [ ] Arquivo em kebab-case em `src/components/ui/`
- [ ] Named exports
- [ ] Props com `ComponentProps<'...'>`
- [ ] Variantes com `tv` quando aplicavel
- [ ] `className` via `tv` ou `cn`/`twMerge`
- [ ] Cores por classes canonicas
- [ ] Fontes por `font-sans` / `font-mono`
- [ ] Sem `export default`
- [ ] Variantes documentadas na rota `/components`
