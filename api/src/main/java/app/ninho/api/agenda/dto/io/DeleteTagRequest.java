package app.ninho.api.agenda.dto.io;

public record DeleteTagRequest(
    String tagId,
    String principalId
) {}
