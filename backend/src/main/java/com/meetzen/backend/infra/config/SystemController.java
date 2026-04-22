package com.meetzen.backend.infra.config;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.Map;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@Tag(name = "System", description = "System and diagnostics endpoints")
public class SystemController {

    private final String serverPort;

    public SystemController(Environment environment) {
        this.serverPort = environment.getProperty("server.port", "8080");
    }

    @GetMapping("/whoami")
    @Operation(summary = "Return backend instance info")
    @ApiResponse(responseCode = "200", description = "Instance info returned")
    public ResponseEntity<Map<String, String>> whoAmI() {
        return ResponseEntity.ok(Map.of("instance", "backend-" + serverPort, "port", serverPort));
    }
}
