# meetZen Backend

Backend API built with Spring Boot, Maven, and Java 21.

## Architecture (simplified)

Only 3 top-level layers are used:

- `application`: orchestration and application logic by domain
- `domain`: business models and contracts, framework-agnostic
- `infra`: controllers, persistence adapters, config, and exception handlers

Current package layout:

```text
src/main/java/com/meetzen/backend/
  application/
    user/
      UserInput.java
      UserApplicationMapper.java
      UserApplicationService.java
      UserOutput.java
  domain/
    user/
      User.java
      UserRepository.java
  infra/
    config/
      ClockConfig.java
      OpenApiConfig.java
    exception/
      ApiErrorResponse.java
      GlobalExceptionHandler.java
      ResourceNotFoundException.java
    user/
      CreateUserRequest.java
      JdbcUserRepositoryAdapter.java
      SpringDataJdbcUserRepository.java
      UserController.java
      UserControllerMapper.java
      UserEntity.java
      UserResponse.java
```

## Tech Stack

- Java 21
- Spring Boot 4.0.5
- Maven
- Spring Data JDBC
- PostgreSQL
- Flyway
- OpenAPI/Swagger (springdoc)

## Run Locally

```bash
cd backend
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

Database note:

- In `dev` profile, backend expects PostgreSQL at `localhost:5432`.
- You can start PostgreSQL from root with `docker compose -f infra/docker-compose.yml up -d postgres`.
- Credentials come from root `.env` (`DB_NAME`, `DB_USER`, `DB_PASSWORD`).

Default local API URL: `http://localhost:8080`

## Tests

```bash
cd backend
mvn test
```

## OpenAPI / Swagger

- OpenAPI JSON: `http://localhost:8080/v3/api-docs`
- Swagger UI: `http://localhost:8080/swagger-ui/index.html`

## Load Balancer Diagnostic Endpoint

For local Nginx load-balancer checks, backend exposes:

- `GET /api/v1/whoami`

Response example:

```json
{
  "instance": "backend-8080",
  "port": "8080"
}
```

When running multiple backend instances behind Nginx, repeated calls to `http://localhost/api/v1/whoami` should show different instances.

## Postman Sync Rule

To keep a practical API client artifact always up to date, maintain the root Postman collection:

- File: `meetZen.postman_collection.json` (in repository root)

Mandatory rule:

1. If any endpoint is created, removed, or changed, update the Postman collection in the same PR.
2. Reflect method, route, required headers, and example payloads.
3. Keep endpoint examples consistent with request/response contracts in this backend.

## Database Migrations (Flyway)

Migrations are loaded from `backend/src/main/resources/db/migration`.

If you use PostgreSQL 16+, keep this dependency in `pom.xml`:

- `org.flywaydb:flyway-database-postgresql`

Quick checks:

1. Start app with `dev` profile:
   - `mvn spring-boot:run -Dspring-boot.run.profiles=dev`
2. Look for logs like:
   - `Migrating schema "public" to version "1 - create users table"`
3. Confirm table exists:
   - `flyway_schema_history`
   - `users`

## Domain Pattern (How to add a new domain)

For a new domain (example: `auth`):

1. Create contracts and models in `domain/auth`
2. Create application logic in `application/auth`
3. Create adapters in `infra/auth` (controller + persistence + mapping)
4. Keep controllers thin and delegate orchestration to application layer
5. Do not leak persistence entities into API responses

## Use Case Pattern (Input/Output)

In the `application` layer, each use case should communicate through explicit DTOs:

- `*Input`: data that enters the use case (from controller mapper to application service)
- `*Output`: data that leaves the use case (from application service back to controller mapper)

Example in `user` domain:

- `UserInput` is used by `UserApplicationService#createUser(UserInput input)`
- `UserOutput` is returned by `createUser`, `listUsers`, and `firstUserOrFail`

Naming guidance:

1. Prefer domain-focused names (`UserInput`, `UserOutput`) over transport/technical names.
2. Keep `infra` request/response DTOs (`CreateUserRequest`, `UserResponse`) separate from `application` input/output DTOs.
3. Keep mapping responsibilities explicit:
   - `UserControllerMapper` maps `CreateUserRequest -> UserInput` and `UserOutput -> UserResponse`
   - `UserApplicationMapper` maps `User (domain) -> UserOutput`

## Good Practices

- Apply SOLID principles
- Keep business rules in `domain` and orchestration in `application`
- Validate request payloads at the boundary layer (`infra/...` request DTOs)
- Use global exception handling for consistent API errors
- Avoid sensitive data in logs
