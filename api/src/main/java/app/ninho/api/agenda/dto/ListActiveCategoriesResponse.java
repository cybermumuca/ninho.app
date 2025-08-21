package app.ninho.api.agenda.dto;

public record ListActiveCategoriesResponse(
    String id,
    String name,
    String color,
    String icon,
    int associations
) {}
