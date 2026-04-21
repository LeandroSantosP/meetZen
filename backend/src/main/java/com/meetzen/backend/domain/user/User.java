package com.meetzen.backend.domain.user;

import java.time.Instant;

public record User(Long id, String name, String email, Instant createdAt) {}
