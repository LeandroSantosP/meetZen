package com.meetzen.backend.infra.user;

import com.meetzen.backend.domain.user.User;
import com.meetzen.backend.domain.user.UserRepository;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class JdbcUserRepositoryAdapter implements UserRepository {

    private final SpringDataJdbcUserRepository repository;

    public JdbcUserRepositoryAdapter(SpringDataJdbcUserRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<User> findAll() {
        return repository.findAll().stream().map(this::toDomain).toList();
    }

    @Override
    public User save(User user) {
        UserEntity saved = repository.save(toEntity(user));
        return toDomain(saved);
    }

    @Override
    public boolean existsByEmail(String email) {
        return repository.existsByEmail(email);
    }

    private UserEntity toEntity(User user) {
        return new UserEntity(user.id(), user.name(), user.email(), user.createdAt());
    }

    private User toDomain(UserEntity entity) {
        return new User(entity.id(), entity.name(), entity.email(), entity.createdAt());
    }
}
