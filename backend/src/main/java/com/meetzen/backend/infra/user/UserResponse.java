package com.meetzen.backend.infra.user;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.Instant;

@Schema(name = "UserResponse")
public record UserResponse(
    @Schema(example = "1") Long id,
    @Schema(example = "Leandro Silva") String name,
    @Schema(example = "leandro@meetzen.com") String email,
    @Schema(example = "2026-04-20T18:30:00Z") Instant createdAt) {}
