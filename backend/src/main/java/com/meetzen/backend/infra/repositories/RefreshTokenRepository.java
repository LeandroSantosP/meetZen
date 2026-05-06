package com.meetzen.backend.infra.repositories;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.repository.CrudRepository;

public interface RefreshTokenRepository extends CrudRepository<RefreshTokenEntity, UUID> {
    Optional<RefreshTokenEntity> findByIdAndRevokedFalse(UUID id);
}
