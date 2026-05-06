---
name: spring-boot-best-practices
description: Practical Spring Boot best practices for Java 21 services. Use when creating, reviewing, or refactoring controllers, services, repositories, security, database migrations, and tests.
license: MIT
metadata:
  author: meetZen
  version: "1.0.0"
---

# Spring Boot Best Practices

Concise, production-oriented guidance for Spring Boot APIs with layered architecture (`domain`, `application`, `infra`) and PostgreSQL.

## When to Apply

Use this skill when:

- Adding or refactoring backend endpoints
- Changing business logic in services/use cases
- Updating repository/persistence code
- Defining request/response contracts
- Improving security, logging, and observability
- Adding or reviewing automated tests

## Priority Areas

### 1) Architecture and boundaries

- Keep business rules in `domain`.
- Keep orchestration in `application`.
- Keep controllers/adapters thin in `infra`.
- Avoid leaking persistence entities to API contracts.

### 2) API contracts and validation

- Validate inbound payloads with Jakarta Validation and `@Valid`.
- Use dedicated request/response DTOs.
- Return consistent error payloads via global exception handling.
- Prefer explicit, stable response shapes.

### 3) Security and secrets

- Enforce authentication/authorization at boundaries.
- Use least privilege for sensitive operations.
- Never log secrets or sensitive fields.
- Externalize credentials and secrets to environment variables.

### 4) Persistence and migrations

- Manage schema changes with Flyway, one migration per change.
- Keep SQL and indexes aligned with query patterns.
- Prevent N+1 patterns and monitor slow queries.
- Treat transactions explicitly for multi-step writes.

### 5) Observability and resilience

- Expose health/metrics through Actuator.
- Use structured logs with request correlation IDs.
- Capture timing and error metrics for critical paths.
- Fail fast on invalid input and missing dependencies.

### 6) Testing strategy

- Unit-test domain rules and application services.
- Use integration tests for controllers and repositories.
- Cover success, validation errors, authorization, and not-found cases.
- Keep tests deterministic and isolated.

## Quick Checklist

- Does controller only map transport <-> application DTOs?
- Is payload validated with constraints and clear messages?
- Are domain and application layers free of web framework leakage?
- Is there migration coverage for schema changes?
- Are errors standardized and tested?
- Are auth rules enforced and tested?

## Full Guide

Detailed rules and examples: `AGENTS.md`
