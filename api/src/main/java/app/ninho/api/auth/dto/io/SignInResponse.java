package app.ninho.api.auth.dto.io;

import java.time.Instant;

public record SignInResponse(
    String accessToken,
    Instant issuedAt,
    Instant expiresAt
) {}
