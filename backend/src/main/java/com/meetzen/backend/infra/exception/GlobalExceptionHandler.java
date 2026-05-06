package com.meetzen.backend.infra.exception;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import io.jsonwebtoken.JwtException;
import java.time.Instant;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestControllerAdvice
public class GlobalExceptionHandler {

  private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<ApiErrorResponse> handleNotFound(
      ResourceNotFoundException ex, HttpServletRequest request) {
    return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage(), request.getRequestURI());
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ApiErrorResponse> handleMethodArgumentNotValid(
      MethodArgumentNotValidException ex, HttpServletRequest request) {
    String message =
        ex.getBindingResult().getFieldErrors().stream()
            .map(this::formatFieldError)
            .findFirst()
            .orElse("Validation failed");
    return buildResponse(HttpStatus.BAD_REQUEST, message, request.getRequestURI());
  }

  @ExceptionHandler(ConstraintViolationException.class)
  public ResponseEntity<ApiErrorResponse> handleConstraintViolation(
      ConstraintViolationException ex, HttpServletRequest request) {
    String message =
        ex.getConstraintViolations().stream()
            .findFirst()
            .map(v -> v.getMessage())
            .orElse("Validation failed");
    return buildResponse(HttpStatus.BAD_REQUEST, message, request.getRequestURI());
  }

  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<ApiErrorResponse> handleIllegalArgument(
      IllegalArgumentException ex, HttpServletRequest request) {
    // Log stacktrace to help locate unexpected IllegalArgumentExceptions (temporary)
    log.error("IllegalArgumentException handling request {}: {}", request.getRequestURI(), ex.getMessage(), ex);
    return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage(), request.getRequestURI());
  }

  @ExceptionHandler(RuntimeException.class)
  public ResponseEntity<ApiErrorResponse> handleRuntime(RuntimeException ex, HttpServletRequest request) {
    String msg = ex.getMessage() == null ? "" : ex.getMessage().toLowerCase();
    if (msg.contains("invalid credentials") || msg.contains("invalid refresh token")) {
      return buildResponse(HttpStatus.UNAUTHORIZED, "Authentication failed", request.getRequestURI());
    }
    if (msg.contains("email exists") || msg.contains("already exists")) {
      return buildResponse(HttpStatus.CONFLICT, ex.getMessage(), request.getRequestURI());
    }
    // Fallback to bad request for other runtime issues that are client related
    return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage(), request.getRequestURI());
  }

  @ExceptionHandler(AuthenticationException.class)
  public ResponseEntity<ApiErrorResponse> handleSpringAuth(AuthenticationException ex, HttpServletRequest request) {
    return buildResponse(HttpStatus.UNAUTHORIZED, ex.getMessage(), request.getRequestURI());
  }

  @ExceptionHandler(JwtException.class)
  public ResponseEntity<ApiErrorResponse> handleJwt(JwtException ex, HttpServletRequest request) {
    return buildResponse(HttpStatus.UNAUTHORIZED, "Invalid or expired token", request.getRequestURI());
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ApiErrorResponse> handleGeneric(
      Exception ex, HttpServletRequest request) {
    return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected internal error", request.getRequestURI());
  }

  private ResponseEntity<ApiErrorResponse> buildResponse(
      HttpStatus status, String message, String path) {
    ApiErrorResponse body =
        new ApiErrorResponse(Instant.now(), status.value(), status.getReasonPhrase(), message, path);
    return ResponseEntity.status(status).body(body);
  }

  private String formatFieldError(FieldError fieldError) {
    return fieldError.getField() + ": " + fieldError.getDefaultMessage();
  }
}
