package app.ninho.api.agenda.dto;

public record CreateCategoryRequest(
    String name,
    String color,
    String icon,
    String principalId
) {}
