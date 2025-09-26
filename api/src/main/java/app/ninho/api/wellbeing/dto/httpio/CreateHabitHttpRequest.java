package app.ninho.api.wellbeing.dto.httpio;

import app.ninho.api.recurrence.domain.type.FrequencyType;
import app.ninho.api.recurrence.domain.type.PeriodUnit;
import app.ninho.api.recurrence.domain.value.MonthWeekdayOccurrence;
import app.ninho.api.recurrence.domain.value.YearlyDateOccurrence;
import app.ninho.api.wellbeing.domain.Modality;
import app.ninho.api.wellbeing.dto.httpio.validation.ValidFrequency;
import jakarta.validation.constraints.*;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;

@ValidFrequency
public record CreateHabitHttpRequest(
    @NotBlank(message = "Titulo é obrigatório")
    @Size(max = 120, message = "Titulo deve ter no máximo 120 caracteres")
    String title,
    @Size(max = 10000, message = "Descrição deve ter no máximo 10000 caracteres")
    String description,
    @NotNull(message = "Modalidade é obrigatória")
    Modality modality,
    @NotBlank(message = "Categoria é obrigatória")
    String categoryId,
    FrequencyType frequencyType,
    List<DayOfWeek> weekDays,
    List<Integer> monthDays,
    List<MonthWeekdayOccurrence> monthlyWeekdayOccurrences,
    List<YearlyDateOccurrence> yearlyDateOccurrences,
    Integer periodCount,
    PeriodUnit periodType,
    Integer intervalDays,
    @NotNull(message = "Data de início é obrigatória")
    LocalDate startDate,
    LocalDate endDate
) {}
