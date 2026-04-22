package com.meetzen.backend.application.user;

import com.meetzen.backend.domain.user.User;
import org.springframework.stereotype.Component;

@Component
public class UserApplicationMapper {

    public UserOutput toOutput(User user) {
        return new UserOutput(user.id(), user.name(), user.email(), user.createdAt());
    }
}
