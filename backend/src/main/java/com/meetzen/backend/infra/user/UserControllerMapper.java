package com.meetzen.backend.infra.user;

import com.meetzen.backend.application.user.UserInput;
import com.meetzen.backend.application.user.UserOutput;
import org.springframework.stereotype.Component;

@Component
public class UserControllerMapper {

    public UserInput toInput(CreateUserRequest request) {
        return new UserInput(request.name(), request.email());
    }

    public UserResponse toResponse(UserOutput output) {
        return new UserResponse(output.id(), output.name(), output.email(), output.createdAt());
    }
}
