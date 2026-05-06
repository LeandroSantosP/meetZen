package com.meetzen.backend.infra.repositories;

import java.time.Instant;
import java.util.UUID;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("refresh_tokens")
public record RefreshTokenEntity(
        @Id UUID id,
        @Column("user_id") Long userId,
        @Column("token_hash") String tokenHash,
        @Column("issued_at") Instant issuedAt,
        @Column("expires_at") Instant expiresAt,
        @Column("revoked") boolean revoked,
        @Column("last_used_at") Instant lastUsedAt,
        @Column("last_used_ip") String lastUsedIp,
        @Column("user_agent") String userAgent) {}
