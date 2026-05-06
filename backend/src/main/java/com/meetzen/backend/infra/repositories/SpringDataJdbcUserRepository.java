package com.meetzen.backend.infra.repositories;

import org.springframework.data.repository.ListCrudRepository;

public interface SpringDataJdbcUserRepository extends ListCrudRepository<UserEntity, Long> {

    boolean existsByEmail(String email);
}
