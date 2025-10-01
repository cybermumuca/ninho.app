package app.ninho.api.agenda.dto.io;

import java.time.LocalDate;
import java.time.LocalTime;

public record ListOverdueTasksResponse(
    String id,
    String title,
    Category category,
    LocalDate date,
    LocalDate dueDate,
    LocalTime estimatedDuration,
    Status status
) {
    public record Category(
        String id,
        String name,
        String icon,
        String color
    ) {}

    public enum Status {
        PENDING,
    }
}
