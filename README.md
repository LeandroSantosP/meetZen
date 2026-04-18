# meetZen Monorepo

This monorepo currently contains:

- `backend/`: placeholder directory (not implemented yet)
- `frontend/`: React + Vite application

## Stack (frontend)

- React + Vite (TypeScript)
- Tailwind CSS v4 + PostCSS
- TanStack Router (file-based routes)
- Zod
- ESLint + Prettier

## Quick Start

```bash
npm install
npm run dev
```

The root scripts delegate to the `frontend` workspace.

## Useful Commands

From root:

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
```

From frontend:

```bash
npm run routegen
npm run format
```
