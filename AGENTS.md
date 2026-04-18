# AGENTS Guide

## Monorepo Overview

This repository is a monorepo with two top-level folders:

- `backend/`: reserved for backend work, intentionally empty for now.
- `frontend/`: active workspace using React + Vite.

## Scope Rules

- Do not implement backend code yet.
- Focus current implementation work on `frontend/`.
- Keep root scripts as workspace orchestrators.

## Frontend Technical Stack

- React + Vite
- Tailwind CSS v4 + PostCSS
- TanStack Router (file-based routes)
- Zod for schema validation
- TypeScript
- ESLint + Prettier

## Folder Conventions (frontend)

- `src/routes/`: file-based route definitions for TanStack Router.
- `src/schemas/`: reusable Zod schemas.
- `src/components/`: shared UI components.
- `src/routeTree.gen.ts`: generated file, do not manually edit.

## Development Commands

From repository root:

- `npm run dev`: run frontend dev server.
- `npm run build`: build frontend.
- `npm run lint`: run ESLint in frontend workspace.
- `npm run typecheck`: run TypeScript checks in frontend workspace.

From `frontend/`:

- `npm run routegen`: regenerate TanStack Router route tree after route changes.
- `npm run format`: format files with Prettier.

## Workflow Expectations

- Regenerate routes after adding, renaming, or removing route files.
- Keep generated files out of lint/format concerns where applicable.
- Prefer small, focused changes and clear naming.

## PR Checklist

- Run `npm run lint` and fix warnings/errors.
- Run `npm run typecheck` and resolve type issues.
- Run `npm run build` and ensure successful output.
- Confirm routing still works for `/` and `/about`.
