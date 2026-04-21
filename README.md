# meetZen Monorepo

This monorepo currently contains:

- `backend/`: Spring Boot API (Java 21 + Maven + Spring Data JDBC)
- `frontend/`: React + Vite application

## Stack

Backend:

- Spring Boot 4.0.5
- Maven
- Java 21
- Spring Data JDBC
- PostgreSQL
- OpenAPI/Swagger

Frontend:

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

From backend:

```bash
cd backend
mvn test
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```
