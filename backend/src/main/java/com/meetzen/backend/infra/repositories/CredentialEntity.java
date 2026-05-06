package com.meetzen.backend.infra.repositories;

import java.time.Instant;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("credentials")
public record CredentialEntity(
        @Id Long id,
        @Column("user_id") Long userId,
        @Column("password_hash") String passwordHash,
        @Column("created_at") Instant createdAt) {
}
