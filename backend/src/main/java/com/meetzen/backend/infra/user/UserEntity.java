package com.meetzen.backend.infra.user;

import java.time.Instant;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("users")
public record UserEntity(
        @Id Long id,
        @Column("name") String name,
        @Column("email") String email,
        @Column("created_at") Instant createdAt) {
}
