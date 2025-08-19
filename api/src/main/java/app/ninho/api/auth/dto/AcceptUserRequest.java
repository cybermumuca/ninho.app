package app.ninho.api.auth.dto;

import java.util.List;

public record AcceptUserRequest(
    String userToAcceptId,
    List<String> scopeIds
) {}
