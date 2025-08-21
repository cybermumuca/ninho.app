package app.ninho.api.agenda.dto.httpio;

public record CreateCategoryHttpRequest(
    String name,
    String color,
    String icon
) {}
