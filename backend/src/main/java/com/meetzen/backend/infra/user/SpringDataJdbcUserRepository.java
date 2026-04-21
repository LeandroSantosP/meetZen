package com.meetzen.backend.infra.user;

import org.springframework.data.repository.ListCrudRepository;

public interface SpringDataJdbcUserRepository extends ListCrudRepository<UserEntity, Long> {

    boolean existsByEmail(String email);
}
