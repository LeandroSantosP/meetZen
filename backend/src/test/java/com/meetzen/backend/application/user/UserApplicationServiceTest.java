package com.meetzen.backend.application.user;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.meetzen.backend.domain.user.User;
import com.meetzen.backend.domain.user.UserRepository;
import java.time.Clock;
import java.time.Instant;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;

class UserApplicationServiceTest {

  @Test
  void shouldCreateUserWithNormalizedEmail() {
    InMemoryUserRepository repository = new InMemoryUserRepository();
    UserApplicationService service =
        new UserApplicationService(
            repository,
            new UserApplicationMapper(),
            Clock.fixed(Instant.parse("2026-04-20T18:30:00Z"), ZoneOffset.UTC));

    var created = service.createUser(new UserInput("Leandro", "LEANDRO@MAIL.COM "));

    assertEquals("leandro@mail.com", created.email());
    assertEquals("Leandro", created.name());
    assertEquals(1, repository.findAll().size());
  }

  @Test
  void shouldFailWhenEmailAlreadyExists() {
    InMemoryUserRepository repository = new InMemoryUserRepository();
    repository.save(new User(null, "Ana", "ana@mail.com", Instant.now()));
    UserApplicationService service =
        new UserApplicationService(repository, new UserApplicationMapper(), Clock.systemUTC());

    IllegalArgumentException error =
        assertThrows(
            IllegalArgumentException.class,
            () -> service.createUser(new UserInput("Outra", "ana@mail.com")));

    assertTrue(error.getMessage().contains("already exists"));
  }

  private static final class InMemoryUserRepository implements UserRepository {

    private final List<User> users = new ArrayList<>();
    private long sequence = 1;

    @Override
    public List<User> findAll() {
      return List.copyOf(users);
    }

    @Override
    public User save(User user) {
      User persisted = new User(sequence++, user.name(), user.email(), user.createdAt());
      users.add(persisted);
      return persisted;
    }

    @Override
    public boolean existsByEmail(String email) {
      return users.stream().anyMatch(u -> u.email().equals(email));
    }
  }
}
