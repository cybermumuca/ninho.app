package app.ninho.api.auth.dto;

import java.time.Instant;

public record ScopeResponse(
        String id,
        String name,
        String description,
        Instant createdAt,
        Instant updatedAt
) {}
