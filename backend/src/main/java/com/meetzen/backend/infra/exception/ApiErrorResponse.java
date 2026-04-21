package com.meetzen.backend.infra.exception;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.Instant;

@Schema(name = "ApiErrorResponse")
public record ApiErrorResponse(
    @Schema(example = "2026-04-20T18:30:00Z") Instant timestamp,
    @Schema(example = "400") int status,
    @Schema(example = "Bad Request") String error,
    @Schema(example = "Validation failed") String message,
    @Schema(example = "/api/v1/users") String path) {}
