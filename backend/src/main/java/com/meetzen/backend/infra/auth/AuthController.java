package com.meetzen.backend.infra.auth;

import com.meetzen.backend.application.auth.AuthService;
import com.meetzen.backend.domain.user.User;
import java.time.Instant;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

record LoginRequest(String email, String password) {
}

record RegisterRequest(String email, String password) {
}

@RestController
@RequestMapping("/api/v1/auth")
@Tag(name = "Auth", description = "Authentication endpoints")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    @Operation(summary = "Register a local user")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "User registered"),
            @ApiResponse(responseCode = "400", description = "Validation error")
    })
    public ResponseEntity<Map<String, Object>> register(@RequestBody RegisterRequest request) {
        if (request.password() == null || request.password().isBlank())
            throw new IllegalArgumentException("password is required");
        User user = authService.register(request.email(), request.password());
        return ResponseEntity.ok(Map.of("userId", user.id()));
    }

    @PostMapping("/login")
    @Operation(summary = "Login with email and password")
    @ApiResponses({ @ApiResponse(responseCode = "200", description = "Logged in"),
            @ApiResponse(responseCode = "401", description = "Invalid credentials") })
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest request, HttpServletRequest httpRequest,
            HttpServletResponse httpResponse) {
        if (request.password() == null || request.password().isBlank())
            throw new IllegalArgumentException("password is required");
        // debug: print password byte length to help diagnose unexpected validation
        try {
            System.out.println("DEBUG: login password byte length=" + request.password().getBytes(StandardCharsets.UTF_8).length);
        } catch (Exception e) {
            System.out.println("DEBUG: login password length check failed: " + e.getMessage());
        }
        var result = authService.login(request.email(), request.password(), httpRequest.getRemoteAddr(),
                httpRequest.getHeader("User-Agent"));
        // set refresh token as secure httpOnly cookie
        var cookie = new jakarta.servlet.http.Cookie("refresh_token", result.refreshToken());
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge((int) (result.refreshExpiresAt().getEpochSecond() - Instant.now().getEpochSecond()));
        httpResponse.addCookie(cookie);
        return ResponseEntity.ok(Map.of("accessToken", result.accessToken()));
    }

    @PostMapping("/refresh")
    @Operation(summary = "Refresh access token using refresh token cookie")
    @ApiResponses({ @ApiResponse(responseCode = "200", description = "Token refreshed"),
            @ApiResponse(responseCode = "401", description = "Invalid or missing refresh token") })
    public ResponseEntity<Map<String, Object>> refresh(HttpServletRequest httpRequest,
            HttpServletResponse httpResponse) {
        jakarta.servlet.http.Cookie[] cookies = httpRequest.getCookies();
        String refresh = null;
        if (cookies != null)
            for (jakarta.servlet.http.Cookie c : cookies)
                if ("refresh_token".equals(c.getName()))
                    refresh = c.getValue();
        if (refresh == null)
            return ResponseEntity.status(401).build();
        var result = authService.refresh(refresh, httpRequest.getRemoteAddr(), httpRequest.getHeader("User-Agent"));
        var cookie = new jakarta.servlet.http.Cookie("refresh_token", result.refreshToken());
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge((int) (result.refreshExpiresAt().getEpochSecond() - Instant.now().getEpochSecond()));
        httpResponse.addCookie(cookie);
        return ResponseEntity.ok(Map.of("accessToken", result.accessToken()));
    }

    @PostMapping("/logout")
    @Operation(summary = "Logout and revoke refresh token")
    @ApiResponse(responseCode = "204", description = "Logged out")
    public ResponseEntity<Void> logout(HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
        jakarta.servlet.http.Cookie[] cookies = httpRequest.getCookies();
        String refresh = null;
        if (cookies != null)
            for (jakarta.servlet.http.Cookie c : cookies)
                if ("refresh_token".equals(c.getName()))
                    refresh = c.getValue();
        if (refresh != null)
            authService.logout(refresh);
        var cookie = new jakarta.servlet.http.Cookie("refresh_token", "");
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        httpResponse.addCookie(cookie);
        return ResponseEntity.noContent().build();
    }
}
