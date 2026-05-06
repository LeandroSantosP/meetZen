# Spring Boot Best Practices

**Version 1.0.0**

Guidelines for maintaining Java 21 + Spring Boot services with clear layering, predictable APIs, and operational readiness.

## 1. Architecture and Layering

### 1.1 Keep business rules in `domain`

Place pure business logic in `domain` models/services and keep framework concerns out.

### 1.2 Keep orchestration in `application`

Use application services/use cases to coordinate repositories, domain operations, and policies.

### 1.3 Keep adapters in `infra`

Controllers, persistence adapters, and framework configuration stay in `infra`.

### 1.4 Use dedicated mappers at boundaries

Map request DTO -> input DTO, domain model -> output DTO, output DTO -> response DTO.

## 2. API Contracts and Validation

### 2.1 Validate requests at the boundary

Use annotations such as `@NotBlank`, `@Email`, `@Size`, and `@Valid`.

### 2.2 Do not expose persistence entities

Never return JPA/JDBC entities directly from controllers.

### 2.3 Standardize error responses

Use `@ControllerAdvice` with a common error payload shape (`timestamp`, `code`, `message`, `details`).

### 2.4 Version endpoints

Use explicit API versioning (`/api/v1/...`) and plan compatibility for changes.

## 3. Security

### 3.1 Enforce authorization per operation

Verify user capabilities on each sensitive use case, not only at global filter level.

### 3.2 Keep secrets out of source code

Use environment variables and profile-specific config files without hardcoded credentials.

### 3.3 Avoid sensitive logs

Never log passwords, tokens, document numbers, or full personal data.

### 3.4 Harden defaults

Disable unnecessary endpoints, keep dependencies updated, and enforce secure headers.

## 4. Persistence and Transactions

### 4.1 Version schema with Flyway

Create migrations for every schema change, with clear names and ordering.

### 4.2 Define explicit transaction boundaries

Use transactions for multi-step writes that must succeed or fail together.

### 4.3 Prevent slow query patterns

Design indexes for critical filters/sorts and inspect query plans for hot paths.

### 4.4 Keep repository contracts focused

Repository interfaces should express domain needs, not controller-driven concerns.

## 5. Observability and Reliability

### 5.1 Expose health and metrics

Use Spring Actuator (`/actuator/health`, `/actuator/metrics`) for diagnostics.

### 5.2 Correlate requests in logs

Add correlation/request IDs to logs for traceability across services.

### 5.3 Measure latency and failures

Track endpoint duration, error rates, and DB timings for critical flows.

### 5.4 Fail explicitly

Handle expected business failures with clear exception types and mapped HTTP responses.

## 6. Testing Strategy

### 6.1 Unit tests for domain/application

Test business rules and use-case orchestration without framework boot when possible.

### 6.2 Integration tests for web and data layers

Validate controller contracts, validation, and repository behavior with realistic wiring.

### 6.3 Cover critical unhappy paths

Include invalid payloads, unauthorized access, not found, and conflict scenarios.

### 6.4 Keep tests deterministic

Avoid time/network randomness by controlling clocks, test data, and external dependencies.

## 7. Practical Done Checklist

- Controller is thin and delegates to application layer.
- Input and output DTOs are explicit and mapped.
- Validation rules exist and are tested.
- Authorization rules are enforced and tested.
- Migrations are created for schema changes.
- Error payloads are consistent across endpoints.
- Health/metrics/logging considerations are addressed.
