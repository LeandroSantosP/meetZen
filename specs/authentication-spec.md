# Authentication & Authorization Spec

Summary
- Use Spring Security with OAuth2 client support for Google and GitHub, plus local username/password authentication.
- Tokens: short-lived JWT access tokens + persisted refresh tokens (rotated) delivered via secure HttpOnly cookies for the SPA.
- Account linking between social providers and local accounts supported.

High-level Plan
1. Requirements & constraints
   - Social login: Google, GitHub (Authorization Code flow).
   - Local login: email (recommended) or username + password.
   - Account linking (social <-> local).
   - Access tokens: JWT (short-lived). Refresh tokens persisted and rotated.
   - Secure defaults: BCrypt password hashing, HttpOnly/Secure cookies, CSRF protections.

2. Architecture & flow choices
   - Backend-handled Authorization Code flow (backend redirects to provider and handles callback).
   - Stateless APIs using JWTs and persisted refresh tokens.
   - Recommended token transport: refresh token in secure HttpOnly cookie; access token returned in JSON (frontend stores in memory).

3. Data model (DB)
   - users (id, email, username, display_name, email_verified, enabled, created_at, updated_at)
   - credentials (id, user_id, password_hash, last_password_change_at)
   - oauth_accounts (id, user_id, provider, provider_user_id, linked_at, optional encrypted tokens)
   - refresh_tokens (id, user_id, token_hash, issued_at, expires_at, revoked, client_id, last_used_at, last_used_ip, user_agent)
   - roles/authorities as needed

4. Spring components to implement
   - Security config: PasswordEncoder (BCrypt), AuthenticationManager, OAuth2 client registrations, success/failure handlers, JWT filter, refresh endpoint, logout endpoint.
   - Services: AuthService, OAuthService, EmailService (optional).
   - Controllers: /auth/login, /auth/register, /auth/refresh, /auth/logout, OAuth2 success endpoint and linking endpoints.
   - Filters: JwtAuthenticationFilter, CORS and CSRF config.
   - Migrations: DB scripts for tables above.

5. Security considerations
   - BCrypt for passwords.
   - Rate limiting / brute-force protection.
   - Refresh token rotation + hashed storage.
   - Short JWT TTL; revoke via refresh token revocation.
   - TLS required in production; Secure cookies.

6. Testing & QA
   - Unit tests for services, integration tests for flows, mock providers for CI, real provider tests in staging.

7. Deployment & env config
   - application.yml entries for OAuth client ids/secrets, jwt signing key, token lifetimes, cookie settings.
   - Store secrets in env or secret manager.

8. Milestones (example)
   - Design & DB migrations: 1 day
   - Local login + tests: 1–2 days
   - JWT + refresh tokens: 1 day
   - OAuth2 Google/GitHub + linking: 2 days
   - Email verification & password reset: 1–2 days
   - Security hardening & tests: 1 day
   - Integration & staging: 1 day

Questions (please answer these to finalize the spec and start implementation)
1. Frontend OAuth flow: backend-handled Authorization Code flow, or frontend PKCE? (Recommended: backend-handled.)
2. Token transport: refresh cookie + access token in JSON, or both in cookies/body? (Recommend: refresh cookie + access token in JSON.)
3. Stateless vs stateful: confirm stateless JWTs + persisted refresh tokens (recommended) or server sessions?
4. User identifier: email or username for local login? (Email recommended.)
5. Account linking: on first social login, should we auto-create users, auto-link by email, or require explicit completion? (Recommend: if email matches existing user, require confirmation or prompt to link; otherwise create user or require completion.)
6. Email verification: required for local signup? Optional?
7. Password reset: required? Provide SMTP/provider for emails or a placeholder?
8. Roles/Authorization: which base roles do you need (e.g., ROLE_USER, ROLE_ADMIN)?
9. Refresh tokens: single-use rotation (recommended) or allow reuse?
10. Token lifetimes: desired access token and refresh token durations? (Recommend access 5–15min, refresh 7–30 days.)
11. Revoke strategy: on password change/logout, revoke all refresh tokens or only current?
12. Multi-device: allow multiple concurrent refresh tokens per user? (Recommend yes.)
13. Persisted token metadata: store IP/user-agent for audit? (Recommend yes.)
14. Password policy: length, complexity, expiration?
15. Brute-force protection: thresholds for lockout or rate limiting?
16. Captcha: require on signup or after failed attempts?
17. MFA: required now or future? If now, which methods (TOTP, SMS)?
18. OAuth providers: confirm only Google + GitHub now or others later?
19. OAuth scopes: Google (openid, profile, email), GitHub (user:email). Any extra scopes?
20. OAuth client secrets: will you provide client ids/secrets per environment? Where store them?
21. Redirect URIs: which frontend URLs should we redirect to after OAuth (dev/staging/prod)?
22. Domains: will frontend and backend run on same top-level domain or different domains? (Affects cookies/CORS.)
23. TLS: will HTTPS be enabled in dev/staging? (Secure cookies require HTTPS.)
24. JWT signing: symmetric (HMAC) or asymmetric (RSA)? (Recommend asymmetric for JWKS.)
25. Key management: who manages JWT keys? Want JWKS endpoint?
26. Logout UX: should logout clear all devices or only current session?
27. Session timeouts: inactivity vs absolute expiry preferences?
28. Profile fields: which fields to store from providers (avatar, locale)?
29. GDPR/privacy: account deletion or consent storage? Retention policy?
30. Audit/logging: which events require logging and any SIEM integration?
31. Testing: prefer mock providers in CI and real providers in staging?
32. Admin: will there be an admin UI to manage users/roles or DB/CLI only?
33. Rate-limiting: should auth endpoints have gateway-level rate limits?
34. Authorization Server: rely on Spring Security OAuth client only, or use Spring Authorization Server for full OAuth2 features?
35. Migration: any existing users/credential formats to migrate?
36. Dev testing: want dev-only mocked flows or real provider apps?
37. Logging: confirm you want startup docs log kept; avoid logging secrets.
38. Terms: require acceptance of Terms on signup/social login?
39. First-login completion: require profile completion before issuing tokens?
40. Linking safety: require password verification to link social to existing account?
41. Implementation priority: which to build first (local login, tokens, social login)?
42. Monitoring: any metrics required for auth endpoints and failures?
43. Provider registration: do you already have OAuth apps registered for Google/GitHub?
44. Encryption at rest: encrypt provider tokens or sensitive fields in DB?
45. CSRF strategy: prefer double-submit cookie, CSRF token endpoint, or rely on SameSite Lax?

Next steps
- Your answers have been recorded. I'll start implementing the local username/password flow and JWT + refresh token endpoints as requested.

Recorded answers (from user):
- 1: backend-handled
- 2: refresh cookie + access token in JSON
- 3: serverless
- 4: use email as identifier
- 5: if email matches existing user, require confirmation or prompt to link; otherwise create user or require completion
- 6: email verification: not for now
- 7: password reset: placeholder for now
- 8: roles: ROLE_USER, ROLE_ADMIN
- 9: refresh token rotation: single-use rotation
- 10: token lifetimes: access 5–15min, refresh 7–30 days
- 11: revoke on password change/logout: yes
- 12: multi-device: yes
- 13: persist token metadata: yes
- 14: password policy: use market standard
- 15: brute-force protection: yes
- 16: captcha: not for now
- 17: mfa: not for now
- 18: providers: Google + GitHub
- 19: extra scopes: none
- 20: client secrets: stored in .env (gitignored)
- 21: redirect URI: /landing page
- 22: frontend/backend domain: same top-level domain
- 23: TLS: enabled in dev/staging/prod
- 24: JWT signing: asymmetric (RSA)
