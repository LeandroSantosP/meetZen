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

    public List<UserOutput> listUsers() {
        return userRepository.findAll().stream().map(userApplicationMapper::toOutput).toList();
    }

    public UserOutput createUser(UserInput input) {
        if (userRepository.existsByEmail(input.email())) {
            throw new IllegalArgumentException("User with this email already exists");
        }

        User created = userRepository.save(
                new User(null, input.name().trim(), input.email().trim().toLowerCase(), Instant.now(clock)));
        return userApplicationMapper.toOutput(created);
    }

    public UserOutput firstUserOrFail() {
        return userRepository.findAll().stream()
                .findFirst()
                .map(userApplicationMapper::toOutput)
                .orElseThrow(() -> new ResourceNotFoundException("No users found"));
    }
}
