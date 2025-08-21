package app.ninho.api.agenda.dto.io;

public record RestoreCategoryRequest(
    String categoryId,
    String principalId
) {}
