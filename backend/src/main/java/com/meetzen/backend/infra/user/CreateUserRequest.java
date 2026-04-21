package com.meetzen.backend.infra.user;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Schema(name = "CreateUserRequest")
public record CreateUserRequest(
        @NotBlank(message = "name is required") @Schema(example = "Leandro Silva", requiredMode = Schema.RequiredMode.REQUIRED) String name,
        @NotBlank(message = "email is required") @Email(message = "email must be valid") @Schema(example = "leandro@meetzen.com", requiredMode = Schema.RequiredMode.REQUIRED) String email) {
}
