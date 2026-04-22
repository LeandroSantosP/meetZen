package com.meetzen.backend.infra.config;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.mock.env.MockEnvironment;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

class SystemControllerStandaloneTest {

  private MockMvc mockMvc;

  @BeforeEach
  void setUp() {
    MockEnvironment environment = new MockEnvironment();
    environment.setProperty("server.port", "8081");
    mockMvc = MockMvcBuilders.standaloneSetup(new SystemController(environment)).build();
  }

  @Test
  void shouldReturnBackendInstanceAndPort() throws Exception {
    mockMvc
        .perform(get("/api/v1/whoami"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.instance").value("backend-8081"))
        .andExpect(jsonPath("$.port").value("8081"));
  }
}
