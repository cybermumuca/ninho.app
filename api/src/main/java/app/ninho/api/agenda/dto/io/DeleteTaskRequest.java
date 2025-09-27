package app.ninho.api.agenda.dto.io;

public record DeleteTaskRequest(
    String taskId,
    String principalId
) {}