# Plano de Refatoracao - Frontend UI

## Objetivo

Refatorar o frontend para padronizar a arquitetura de componentes com foco em reuso, consistencia visual e manutencao, usando `tailwind-variants` e `tailwind-merge`.

---

## Escopo do plano

1. Criar a pasta `frontend/src/components/ui/`.
2. Mover para `ui/` todos os componentes reutilizaveis.
3. Manter na raiz `frontend/src/components/` apenas componentes de layout/estrutura nao reutilizaveis (ex.: `header`, `footer`, shells de pagina).
4. Instalar e padronizar uso de:
   - `tailwind-variants`
   - `tailwind-merge`
5. Documentar padroes em um `AGENTS.md` focado em UI.

---

## Estrutura alvo

```text
frontend/src/components/
  page-shell.tsx
  header.tsx                (quando existir)
  footer.tsx                (quando existir)
  not-found-page.tsx        (avaliar se vira UI reutilizavel)
  ui/
    button.tsx
    badge.tsx
    text-field.tsx
    card.tsx
    ...
    AGENTS.md
```

Regra:
- `ui/`: primitivos e componentes reutilizaveis.
- raiz de `components/`: componentes de pagina/layout que orquestram UI.

---

## Fonte de verdade para padroes

Usar como base o guia informado por voce (named exports, `ComponentProps`, `tv`, `twMerge`, composicao, classes canonicas de cor, etc.).

Local recomendado para documentacao desses padroes:
- `frontend/src/components/ui/AGENTS.md`

Motivo:
- Fica proximo de onde os componentes UI sao criados.
- Facilita onboarding e aplicacao consistente no dia a dia.

---

## Fase 1 - Preparacao

### 1.1 Instalar dependencias

No workspace `frontend`:

```bash
npm install --workspace frontend tailwind-variants tailwind-merge
```

### 1.2 Criar pasta de UI

- Criar `frontend/src/components/ui/`.

### 1.3 Criar utilitario de merge (opcional, recomendado)

- Criar helper reutilizavel (ex.: `frontend/src/lib/cn.ts`) para centralizar `twMerge` quando necessario em componentes sem `tv`.

---

## Fase 2 - Arquitetura e classificacao de componentes

### 2.1 Inventario de componentes atuais

Classificar cada componente existente em:
- `reutilizavel` -> mover para `ui/`
- `nao reutilizavel` -> manter em `components/`

Estado atual identificado:
- `frontend/src/components/page-shell.tsx` -> nao reutilizavel (layout)
- `frontend/src/components/not-found-page.tsx` -> avaliar:
  - se for pagina completa: manter na raiz
  - se virar bloco reutilizavel (erro generico): dividir em partes e mover primitivos para `ui/`

### 2.2 Definir convencoes de nomes

- Arquivos em kebab-case (`button.tsx`, `text-field.tsx`).
- Sem `export default`.
- Sempre exportar componente + `tv` + tipos.

---

## Fase 3 - Padronizacao de implementacao UI

Para cada componente em `ui/`:

1. Tipagem com `ComponentProps<'...'>`.
2. Variantes com `tv()` + `VariantProps`.
3. Merge de classes:
   - com `tv`: `component({ ..., className })`
   - sem `tv`: `twMerge(base, className)`
4. Sem interpolacao de string para `className`.
5. Named exports de tudo.

Regras de estilo:
- Cores via classes canonicas do Tailwind (`bg-accent-*`, `text-text-*`, etc.).
- Evitar hex hardcoded (exceto atributos SVG com `var(--color-*)`).
- Fontes apenas `font-sans` e `font-mono`.

---

## Fase 4 - Composicao e API dos componentes

Aplicar criterio:
- Componente atomico -> props simples (`Button`, `Badge`, `Toggle`).
- Componente com varias areas semanticas -> composicao por subcomponentes com prefixo.

Exemplo esperado:
- `CardRoot`, `CardTitle`, `CardDescription` (sem dot notation).

---

## Fase 5 - Documentacao AGENTS

Criar arquivo:
- `frontend/src/components/ui/AGENTS.md`

Conteudo minimo:
1. Regras gerais (named exports, tipagem, estrutura por arquivo).
2. Regras de `tv` e `twMerge`.
3. Regras de cores e fontes.
4. Composicao vs props.
5. Checklist obrigatorio para novos componentes.

Observacao:
- Corrigir nome para `AGENTS.md` (nao `AGENDS.md`).

---

## Fase 6 - Integracao na aplicacao

1. Substituir usos diretos por componentes de `ui/` gradualmente.
2. Garantir que telas principais (`/`, `/login`, `/signup`, `/landing`, not-found) continuam visuais e funcionais.
3. Adicionar/atualizar pagina de exemplos `/components` para demonstrar variantes (quando existir no projeto).

---

## Criterios de aceite

- [ ] `frontend/src/components/ui/` existe.
- [ ] Componentes reutilizaveis movidos para `ui/`.
- [ ] Componentes nao reutilizaveis permanecem na raiz de `components/`.
- [ ] `tailwind-variants` e `tailwind-merge` instalados no frontend.
- [ ] Padrao de implementacao aplicado (sem `export default`, com tipos e variantes).
- [ ] `frontend/src/components/ui/AGENTS.md` criado com o guia.
- [ ] Build, lint e typecheck sem erros.

---

## Validacao tecnica

Executar ao final:

```bash
npm run lint
npm run typecheck
npm run build
```

---

## Resultado esperado

Uma base de componentes previsivel e escalavel, com fronteira clara entre UI reutilizavel e componentes de layout de pagina, reduzindo inconsistencias e acelerando evolucao do frontend.
