package app.ninho.api.agenda.dto.io;

public record UpdateTagRequest(
    String tagId,
    String name,
    String color,
    String principalId
) {}
