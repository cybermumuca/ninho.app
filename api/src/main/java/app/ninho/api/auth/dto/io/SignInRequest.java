package app.ninho.api.auth.dto.io;

public record SignInRequest(
    String email,
    String password
) {}
