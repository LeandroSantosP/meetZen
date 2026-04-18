# Plano de Implementacao - Monorepo (frontend + backend placeholder)

## 1) Estrutura do monorepo

Criar estrutura inicial:

- /backend
- /frontend
- /package.json (root com workspaces)
- /AGENTS.md (instrucoes de colaboracao para agentes)

Estrutura esperada:

/
|- backend/
|- frontend/
|- package.json
`- AGENTS.md

## 2) Inicializacao do root (npm workspaces)

### Acoes
1. Inicializar package do root (`npm init -y`).
2. Ajustar `package.json` do root para workspaces:
   - `"private": true`
   - `"workspaces": ["frontend"]`
3. (Opcional) scripts de conveniencia no root:
   - `"dev": "npm run dev --workspace frontend"`
   - `"build": "npm run build --workspace frontend"`
   - `"preview": "npm run preview --workspace frontend"`

### Criterio de aceite
- `npm run dev` no root sobe o frontend corretamente.

## 3) Criacao do frontend com React + Vite

### Acoes
1. Criar app em `/frontend` com Vite React:
   - `npm create vite@latest frontend -- --template react`
2. Instalar dependencias do frontend:
   - Runtime: `zod`, `@tanstack/react-router`
   - Dev/UI: `tailwindcss`, `postcss`, `autoprefixer`
3. Instalar dependencias base do frontend:
   - `npm install` em `/frontend`

### Criterio de aceite
- Projeto React inicial criado e rodando com `npm run dev` em `/frontend`.

## 4) Configuracao Tailwind + PostCSS (latest)

### Acoes
1. Gerar/ajustar config do Tailwind e PostCSS (versao mais recente).
2. Configurar o caminho de conteudo no Tailwind para arquivos React (ex.: `index.html`, `src/**/*.{js,jsx,ts,tsx}`).
3. Incluir diretivas do Tailwind no CSS global.
4. Garantir import do CSS global no entrypoint React.

### Criterio de aceite
- Classes Tailwind aplicando corretamente em componentes React.
- Build sem erros de PostCSS/Tailwind.

## 5) Integracao do TanStack Router

### Acoes
1. Criar configuracao basica do roteador.
2. Definir rota raiz e ao menos 1-2 rotas iniciais (`/`, `/about` por exemplo).
3. Substituir renderizacao direta por provider do router.

### Criterio de aceite
- Navegacao entre rotas funcionando sem refresh completo.
- App inicia com router ativo.

## 6) Integracao do Zod

### Acoes
1. Criar pasta de schemas (ex.: `src/schemas/`).
2. Criar schema inicial de exemplo (ex.: usuario/formulario).
3. Demonstrar uso simples (parse/safeParse) em utilitario ou componente.

### Criterio de aceite
- Schema Zod validando dados e exibindo resultado de sucesso/erro em fluxo de exemplo.

## 7) Criacao do AGENTS.md

### Objetivo
Padronizar como agentes e colaboradores devem atuar no repo.

### Conteudo minimo sugerido
1. Visao geral do monorepo.
2. Regras de escopo:
   - `backend/` ainda sem implementacao.
   - trabalho ativo no `frontend/`.
3. Padroes tecnicos:
   - React + Vite
   - Tailwind + PostCSS
   - TanStack Router
   - Zod
4. Convencoes:
   - estrutura de pastas
   - naming
   - scripts de execucao
5. Checklist antes de PR:
   - rodar build
   - validar lint/testes (quando existirem)
   - garantir nao quebrar rotas

### Criterio de aceite
- `AGENTS.md` presente no root, claro e acionavel.

## 8) Validacao final

### Comandos de validacao
- No root: `npm install`
- No frontend: `npm run dev`
- No frontend: `npm run build`

### Checklist final
- [ ] `backend/` existe (vazia)
- [ ] `frontend/` criado com React + Vite
- [ ] Tailwind latest + PostCSS integrados
- [ ] `zod` instalado e com exemplo de uso
- [ ] TanStack Router funcionando
- [ ] `AGENTS.md` criado no root
- [ ] Monorepo configurado com workspaces
