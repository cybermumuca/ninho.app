package app.ninho.api.agenda.dto.io;

import java.time.Instant;

public record ListArchivedCategoriesResponse(
    String id,
    String name,
    String color,
    String icon,
    int associations,
    Instant createdAt,
    Instant archivedAt
) {}
