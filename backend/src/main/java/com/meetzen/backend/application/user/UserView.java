package com.meetzen.backend.application.user;

import java.time.Instant;

public record UserView(Long id, String name, String email, Instant createdAt) {}
