package app.ninho.api.agenda.dto.io;

public record CreateTagRequest(
    String name,
    String color,
    String principalId
) {}
