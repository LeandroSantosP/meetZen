package com.meetzen.backend.application.user;

import com.meetzen.backend.domain.user.User;
import com.meetzen.backend.domain.user.UserRepository;
import com.meetzen.backend.infra.exception.ResourceNotFoundException;
import java.time.Clock;
import java.time.Instant;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class UserApplicationService {

    private final UserRepository userRepository;
    private final UserApplicationMapper userApplicationMapper;
    private final Clock clock;

    public UserApplicationService(
            UserRepository userRepository, UserApplicationMapper userApplicationMapper, Clock clock) {
        this.userRepository = userRepository;
        this.userApplicationMapper = userApplicationMapper;
        this.clock = clock;
    }

    public List<UserView> listUsers() {
        return userRepository.findAll().stream().map(userApplicationMapper::toView).toList();
    }

    public UserView createUser(CreateUserCommand command) {
        if (userRepository.existsByEmail(command.email())) {
            throw new IllegalArgumentException("User with this email already exists");
        }

        User created = userRepository.save(
                new User(null, command.name().trim(), command.email().trim().toLowerCase(), Instant.now(clock)));
        return userApplicationMapper.toView(created);
    }

    public UserView firstUserOrFail() {
        return userRepository.findAll().stream()
                .findFirst()
                .map(userApplicationMapper::toView)
                .orElseThrow(() -> new ResourceNotFoundException("No users found"));
    }
}
