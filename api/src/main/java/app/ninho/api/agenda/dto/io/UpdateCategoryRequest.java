package app.ninho.api.agenda.dto.io;

public record UpdateCategoryRequest(
    String categoryId,
    String name,
    String color,
    String icon,
    String principalId
) {}
