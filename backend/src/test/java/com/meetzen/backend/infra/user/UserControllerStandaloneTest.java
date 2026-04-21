package com.meetzen.backend.infra.user;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.meetzen.backend.application.user.CreateUserCommand;
import com.meetzen.backend.application.user.UserApplicationService;
import com.meetzen.backend.application.user.UserView;
import com.meetzen.backend.infra.exception.GlobalExceptionHandler;
import java.time.Instant;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

class UserControllerStandaloneTest {

  private final UserApplicationService userApplicationService =
      org.mockito.Mockito.mock(UserApplicationService.class);
  private final ObjectMapper objectMapper = new ObjectMapper();
  private MockMvc mockMvc;

  @BeforeEach
  void setUp() {
    mockMvc =
        MockMvcBuilders.standaloneSetup(
                new UserController(userApplicationService, new UserControllerMapper()))
            .setControllerAdvice(new GlobalExceptionHandler())
            .build();
  }

  @Test
  void shouldCreateAndListUsers() throws Exception {
    UserView created = new UserView(1L, "Leandro", "leandro@mail.com", Instant.parse("2026-04-20T18:30:00Z"));

    when(userApplicationService.createUser(any(CreateUserCommand.class))).thenReturn(created);
    when(userApplicationService.listUsers()).thenReturn(List.of(created));

    String payload = objectMapper.writeValueAsString(new CreateUserRequest("Leandro", "leandro@mail.com"));

    mockMvc
        .perform(
            post("/api/v1/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(payload))
        .andExpect(status().isCreated())
        .andExpect(header().exists("Location"))
        .andExpect(jsonPath("$.id").value(1))
        .andExpect(jsonPath("$.email").value("leandro@mail.com"));

    mockMvc
        .perform(get("/api/v1/users"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].name").value("Leandro"));
  }
}
