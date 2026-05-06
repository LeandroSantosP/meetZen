package com.meetzen.backend.infra.user;

import com.meetzen.backend.application.user.UserOutput;
import org.springframework.stereotype.Component;

@Component
public class UserControllerMapper {

    // creation via controller removed; no request->input mapping needed

    public UserResponse toResponse(UserOutput output) {
        return new UserResponse(output.id(), output.name(), output.email(), output.createdAt());
    }
}
