package com.meetzen.backend.application.auth;

import com.meetzen.backend.domain.user.User;
import java.time.Instant;

public interface AuthService {
    record LoginResult(String accessToken, String refreshToken, Instant refreshExpiresAt) {}

    LoginResult login(String email, String password, String ip, String userAgent);

    LoginResult refresh(String refreshToken, String ip, String userAgent);

    void logout(String refreshToken);

    User register(String email, String password);
}
