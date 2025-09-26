package app.ninho.api.wellbeing.dto.io;

import app.ninho.api.wellbeing.domain.Modality;

import java.util.List;

public record ListArchivedHabitsResponse(
    String id,
    String title,
    Frequency frequency,
    Modality modality,
    Category category,
    int streak,
    Double successRate
) {
    public record Category(
        String id,
        String name,
        String icon,
        String color
    ) {}

    public record Frequency(
        String type,
        List<String> weekDays,
        Integer count,
        String period
    ) {}
}
