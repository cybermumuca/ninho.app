package app.ninho.api.agenda.dto;

public record UpdateTagRequest(
    String tagId,
    String name,
    String color,
    String principalId
) {}
