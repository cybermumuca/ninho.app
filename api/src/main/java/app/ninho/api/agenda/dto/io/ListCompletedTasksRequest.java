package app.ninho.api.agenda.dto.io;

import app.ninho.api.agenda.dto.httpio.PeriodLimit;

public record ListCompletedTasksRequest(
    PeriodLimit periodLimit,
    String principalId
) {}
