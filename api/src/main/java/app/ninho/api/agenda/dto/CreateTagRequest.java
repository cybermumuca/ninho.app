package app.ninho.api.agenda.dto;

public record CreateTagRequest(
    String name,
    String color,
    String principalId
) {}
