package app.ninho.api.agenda.dto;

public record CreateTagHttpRequest(
    String name,
    String color
) {}
