package com.meetzen.backend.infra.user;

import com.meetzen.backend.application.user.UserApplicationService;
import com.meetzen.backend.infra.exception.ApiErrorResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
@Tag(name = "Users", description = "User management endpoints")
public class UserController {

    private final UserApplicationService userApplicationService;
    private final UserControllerMapper mapper;

    public UserController(UserApplicationService userApplicationService, UserControllerMapper mapper) {
        this.userApplicationService = userApplicationService;
        this.mapper = mapper;
    }

    @GetMapping
    @Operation(summary = "List all users")
    @ApiResponse(responseCode = "200", description = "Users returned")
    public ResponseEntity<List<UserResponse>> listUsers() {
        List<UserResponse> response = userApplicationService.listUsers().stream().map(mapper::toResponse).toList();
        return ResponseEntity.ok(response);
    }

    // Create user endpoint removed. Use registration/auth endpoints instead.

    @GetMapping("/first")
    @Operation(summary = "Get first user (example not-found flow)")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "User returned"),
            @ApiResponse(responseCode = "404", description = "No users found", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    })
    public ResponseEntity<UserResponse> firstUser() {
        return ResponseEntity.ok(mapper.toResponse(userApplicationService.firstUserOrFail()));
    }
}
