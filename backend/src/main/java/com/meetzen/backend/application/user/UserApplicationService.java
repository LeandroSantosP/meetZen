package com.meetzen.backend.application.user;

import com.meetzen.backend.domain.user.UserRepository;
import com.meetzen.backend.infra.exception.ResourceNotFoundException;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class UserApplicationService {

    private final UserRepository userRepository;
    private final UserApplicationMapper userApplicationMapper;

    public UserApplicationService(
            UserRepository userRepository, UserApplicationMapper userApplicationMapper) {
        this.userRepository = userRepository;
        this.userApplicationMapper = userApplicationMapper;
    }

    public List<UserOutput> listUsers() {
        return userRepository.findAll().stream().map(userApplicationMapper::toOutput).toList();
    }

    public UserOutput firstUserOrFail() {
        return userRepository.findAll().stream()
                .findFirst()
                .map(userApplicationMapper::toOutput)
                .orElseThrow(() -> new ResourceNotFoundException("No users found"));
    }
}
