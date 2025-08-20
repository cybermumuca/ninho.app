package app.ninho.api.agenda.dto;

public record DeleteTagRequest(
    String tagId,
    String principalId
) {}
