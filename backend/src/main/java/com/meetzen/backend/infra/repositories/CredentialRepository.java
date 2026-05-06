package com.meetzen.backend.infra.repositories;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;

public interface CredentialRepository extends CrudRepository<CredentialEntity, Long> {
    Optional<CredentialEntity> findByUserId(Long userId);
}
