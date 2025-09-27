package app.ninho.api.agenda.dto.io;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public record GetTaskResponse(
    String id,
    String title,
    Category category,
    LocalDate date,
    LocalDate dueDate,
    LocalTime estimatedDuration,
    LocalTime actualDuration,
    Instant completedAt,
    List<Tag> tags,
    String notes
) {
    public record Category(
        String id,
        String name,
        String icon,
        String color
    ) {}

    public record Tag(
        String id,
        String name,
        String color
    ) {}
}
