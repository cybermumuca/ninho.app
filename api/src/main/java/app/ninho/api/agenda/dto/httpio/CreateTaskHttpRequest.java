package app.ninho.api.agenda.dto.httpio;

import app.ninho.api.agenda.dto.httpio.validation.DueDateAfterStartDate;
import jakarta.validation.constraints.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@DueDateAfterStartDate
public record CreateTaskHttpRequest(
    @NotBlank(message = "Título é obrigatório")
    @Max(value = 255, message = "Título deve ter no máximo 100 caracteres")
    String title,

    @Size(max = 1000, message = "Notas devem ter no máximo 2000 caracteres")
    String notes,

    @NotNull(message = "Categoria é obrigatória")
    String categoryId,

    @NotNull(message = "Data de início é obrigatória")
    LocalDate startDate,

    LocalDate dueDate,

    LocalTime estimatedDuration,

    List<@NotBlank(message = "Tag deve ser válida") String> tagIds
) {}
