package app.ninho.api.agenda.dto.httpio;

public record CreateTagHttpRequest(
    String name,
    String color
) {}
