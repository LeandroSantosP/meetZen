package com.meetzen.backend.application.user;

import com.meetzen.backend.domain.user.User;
import org.springframework.stereotype.Component;

@Component
public class UserApplicationMapper {

  public UserView toView(User user) {
    return new UserView(user.id(), user.name(), user.email(), user.createdAt());
  }
}
