package app.ninho.api.auth.dto.io;

public record SignUpRequest(
        String firstName,
        String lastName,
        String email,
        String password
) {}
