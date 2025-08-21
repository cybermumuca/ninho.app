package app.ninho.api.agenda.dto.io;

public record DeleteCategoryRequest(
    String categoryId,
    String principalId
) {}
