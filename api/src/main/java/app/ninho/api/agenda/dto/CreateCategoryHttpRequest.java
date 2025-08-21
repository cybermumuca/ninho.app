package app.ninho.api.agenda.dto;

public record CreateCategoryHttpRequest(
    String name,
    String color,
    String icon
) {}
