package app.ninho.api.agenda.dto.httpio;

public record UpdateCategoryHttpRequest(
    String name,
    String color,
    String icon
) {}
