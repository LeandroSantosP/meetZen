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
      CreateUserCommand.java
      UserApplicationMapper.java
      UserApplicationService.java
      UserView.java
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

Default local API URL: `http://localhost:8080`

## Tests

```bash
cd backend
mvn test
```

## OpenAPI / Swagger

- OpenAPI JSON: `http://localhost:8080/v3/api-docs`
- Swagger UI: `http://localhost:8080/swagger-ui/index.html`

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

## Good Practices

- Apply SOLID principles
- Keep business rules in `domain` and orchestration in `application`
- Validate request payloads at the boundary layer (`infra/...` request DTOs)
- Use global exception handling for consistent API errors
- Avoid sensitive data in logs
