package app.ninho.api.agenda.dto.io;

public record GetTaskRequest(
    String taskId,
    String principalId
) {}
