package com.meetzen.backend.infra.user;

import com.meetzen.backend.application.user.CreateUserCommand;
import com.meetzen.backend.application.user.UserView;
import org.springframework.stereotype.Component;

@Component
public class UserControllerMapper {

    public CreateUserCommand toCommand(CreateUserRequest request) {
        return new CreateUserCommand(request.name(), request.email());
    }

    public UserResponse toResponse(UserView view) {
        return new UserResponse(view.id(), view.name(), view.email(), view.createdAt());
    }
}
