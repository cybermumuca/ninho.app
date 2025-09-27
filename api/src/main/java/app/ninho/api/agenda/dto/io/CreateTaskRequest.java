package app.ninho.api.agenda.dto.io;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public record CreateTaskRequest(
    String title,
    String notes,
    String categoryId,
    LocalDate startDate,
    LocalDate dueDate,
    LocalTime estimatedDuration,
    List<String> tagIds,
    String principalId
) {}
