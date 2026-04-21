package com.meetzen.backend.domain.user;

import java.util.List;

public interface UserRepository {

    List<User> findAll();

    User save(User user);

    boolean existsByEmail(String email);
}
