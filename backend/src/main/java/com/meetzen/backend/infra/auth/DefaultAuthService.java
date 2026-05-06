package com.meetzen.backend.infra.auth;

import com.meetzen.backend.application.auth.AuthService;
import com.meetzen.backend.domain.user.User;
import com.meetzen.backend.infra.repositories.CredentialEntity;
import com.meetzen.backend.infra.repositories.CredentialRepository;
import com.meetzen.backend.infra.repositories.JdbcUserRepositoryAdapter;
import com.meetzen.backend.infra.repositories.RefreshTokenEntity;
import com.meetzen.backend.infra.repositories.RefreshTokenRepository;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.UUID;
import java.security.SecureRandom;
import java.nio.charset.StandardCharsets;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class DefaultAuthService implements AuthService {

    private final JdbcUserRepositoryAdapter userRepository;
    private final CredentialRepository credentialRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtProvider jwtProvider;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private static final SecureRandom secureRandom = new SecureRandom();

    public DefaultAuthService(
            JdbcUserRepositoryAdapter userRepository,
            CredentialRepository credentialRepository,
            RefreshTokenRepository refreshTokenRepository,
            JwtProvider jwtProvider) {
        this.userRepository = userRepository;
        this.credentialRepository = credentialRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.jwtProvider = jwtProvider;
    }

    @Override
    public LoginResult login(String email, String password, String ip, String userAgent) {
        if (password == null || password.isBlank())
            throw new IllegalArgumentException("password is required");

        var userOpt = userRepository.findAll().stream().filter(u -> u.email().equals(email)).findFirst();
        if (userOpt.isEmpty()) {
            throw new RuntimeException("invalid credentials");
        }
        var user = userOpt.get();
        var credential = credentialRepository.findByUserId(user.id())
                .orElseThrow(() -> new RuntimeException("invalid credentials"));
        try {
            if (!passwordEncoder.matches(password, credential.passwordHash())) {
                throw new RuntimeException("invalid credentials");
            }
        } catch (IllegalArgumentException e) {
            // BCrypt may throw IllegalArgumentException for unsupported inputs (eg too long).
            // Treat this as authentication failure instead of a bad request so clients
            // receive 401 Unauthorized rather than 400 Bad Request.
            throw new RuntimeException("invalid credentials");
        }

        String accessToken = jwtProvider.createToken(user.id(), user.email());

        UUID refreshId = UUID.randomUUID();
        String refreshTokenPlain = generateRefreshPlain(refreshId);
        String refreshHash = passwordEncoder.encode(refreshTokenPlain);
        Instant now = Instant.now();
        Instant expiresAt = now.plus(30, ChronoUnit.DAYS);

        refreshTokenRepository.save(
                new RefreshTokenEntity(refreshId, user.id(), refreshHash, now, expiresAt, false, null, ip, userAgent));

        return new LoginResult(accessToken, refreshTokenPlain, expiresAt);
    }

    @Override
    public LoginResult refresh(String refreshToken, String ip, String userAgent) {
        // refresh token format: <uuid>.<random>
        String[] parts = refreshToken.split("\\.", 2);
        if (parts.length != 2)
            throw new RuntimeException("invalid refresh token");
        UUID id = UUID.fromString(parts[0]);
        var stored = refreshTokenRepository.findByIdAndRevokedFalse(id)
                .orElseThrow(() -> new RuntimeException("invalid refresh token"));
        // verify hashed token
        if (!passwordEncoder.matches(refreshToken, stored.tokenHash())) {
            throw new RuntimeException("invalid refresh token");
        }
        // rotate: revoke old and issue new (create a new revoked entity instance)
        var revokedToken = new RefreshTokenEntity(stored.id(), stored.userId(), stored.tokenHash(), stored.issuedAt(),
                stored.expiresAt(), true, stored.lastUsedAt(), stored.lastUsedIp(), stored.userAgent());
        refreshTokenRepository.save(revokedToken);

        var user = userRepository.findAll().stream().filter(u -> u.id().equals(stored.userId())).findFirst()
                .orElseThrow();
        String accessToken = jwtProvider.createToken(user.id(), user.email());

        UUID newId = UUID.randomUUID();
        String newPlain = generateRefreshPlain(newId);
        String newHash = passwordEncoder.encode(newPlain);
        Instant now = Instant.now();
        Instant expiresAt = now.plus(30, ChronoUnit.DAYS);

        refreshTokenRepository
                .save(new RefreshTokenEntity(newId, user.id(), newHash, now, expiresAt, false, now, ip, userAgent));

        return new LoginResult(accessToken, newPlain, expiresAt);
    }

    private String generateRefreshPlain(UUID id) {
        // generate 16 random bytes -> base64 url safe without padding => ~22 chars
        byte[] rand = new byte[16];
        secureRandom.nextBytes(rand);
        String token = Base64.getUrlEncoder().withoutPadding().encodeToString(rand);
        return id.toString() + "." + token;
    }

    @Override
    public void logout(String refreshToken) {
        try {
            String[] parts = refreshToken.split("\\.", 2);
            UUID id = UUID.fromString(parts[0]);
            var storedOpt = refreshTokenRepository.findByIdAndRevokedFalse(id);
            if (storedOpt.isPresent()) {
                var stored = storedOpt.get();
                var revoked = new RefreshTokenEntity(stored.id(), stored.userId(), stored.tokenHash(),
                        stored.issuedAt(), stored.expiresAt(), true, stored.lastUsedAt(), stored.lastUsedIp(),
                        stored.userAgent());
                refreshTokenRepository.save(revoked);
            }
        } catch (Exception e) {
            // ignore
        }
    }

    @Override
    public User register(String email, String password) {
        if (password == null || password.isBlank())
            throw new IllegalArgumentException("password is required");
        if (password.getBytes(StandardCharsets.UTF_8).length > 72) {
            throw new IllegalArgumentException("password must be at most 72 bytes");
        }

        if (userRepository.existsByEmail(email))
            throw new RuntimeException("email exists");
        var user = new User(null, email.split("@")[0], email, Instant.now());
        var saved = userRepository.save(user);
        String hashed;
        try {
            hashed = passwordEncoder.encode(password);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("password must be at most 72 bytes");
        }
        credentialRepository.save(new CredentialEntity(null, saved.id(), hashed, Instant.now()));
        return saved;
    }
}
