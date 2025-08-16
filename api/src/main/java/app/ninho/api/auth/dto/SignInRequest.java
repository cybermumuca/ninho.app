package app.ninho.api.auth.dto;

public record SignInRequest(
    String email,
    String password
) {}
