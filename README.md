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
npm run dev:frontend
npm run dev:backend
npm run dev:backend:1
npm run dev:backend:2
npm run build
npm run lint
npm run typecheck
```

## Infrastructure (Docker)

Infra files now live in `infra/` and include:

- PostgreSQL (`postgres:16-alpine`)
- Nginx (`nginx:1.27-alpine`)

### Environment Variables

Use the root `.env` file:

```env
DB_NAME=meetzen
DB_USER=postgres
DB_PASSWORD=postgres
```

### Start infra stack

```bash
docker compose -f infra/docker-compose.yml up -d
```

### Stop infra stack

```bash
docker compose -f infra/docker-compose.yml down
```

### What Nginx does

- `http://localhost/api/*` -> load balances between backend instances on `host.docker.internal:8080` and `host.docker.internal:8081`
- `http://localhost/*` -> frontend on `host.docker.internal:5173`

Note: run backend (`npm run dev:backend`) and frontend (`npm run dev:frontend`) on host machine for Nginx proxying to work.

### Local load balancing (backend)

To test Nginx balancing locally, start two backend instances in separate terminals:

```bash
npm run dev:backend:1
npm run dev:backend:2
```

Then call API through Nginx:

```bash
curl -i http://localhost/api/v1/users
```

Nginx will distribute requests across both backend upstreams.

To verify distribution by instance, call the diagnostic endpoint multiple times:

```bash
curl -s http://localhost/api/v1/whoami
curl -s http://localhost/api/v1/whoami
curl -s http://localhost/api/v1/whoami
```

Expected result: responses alternate between `backend-8080` and `backend-8081` over repeated calls.

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

## API Collection Rule (Postman)

To keep API consumers synced with backend changes, this repository uses a root Postman collection as the latest API reference:

- Collection file: `meetZen.postman_collection.json`
- Location: project root
- Base URL variable: `{{baseUrl}}` (default `http://localhost:8080`)

Rule:

1. Every time a backend endpoint is added, removed, or changed, update `meetZen.postman_collection.json` in the same PR.
2. Include request method, path, headers, and example body (when applicable).
3. Keep request names aligned with the endpoint behavior (for example, `Create User`, `List Users`).

This file is the source of truth for quickly importing and testing the latest API in Postman.
