package com.meetzen.backend.infra.user;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.meetzen.backend.application.user.UserInput;
import com.meetzen.backend.application.user.UserApplicationService;
import com.meetzen.backend.application.user.UserOutput;
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
    UserOutput created = new UserOutput(1L, "Leandro", "leandro@mail.com", Instant.parse("2026-04-20T18:30:00Z"));
    when(userApplicationService.listUsers()).thenReturn(List.of(created));
    mockMvc
        .perform(get("/api/v1/users"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].name").value("Leandro"));
  }
}
