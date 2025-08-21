package app.ninho.api.agenda.dto.io;

public record CreateCategoryRequest(
    String name,
    String color,
    String icon,
    String principalId
) {}
