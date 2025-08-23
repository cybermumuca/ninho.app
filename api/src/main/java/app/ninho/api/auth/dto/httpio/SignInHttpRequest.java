package app.ninho.api.auth.dto.httpio;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record SignInHttpRequest(
    @NotBlank(message = "Email é obrigatório")
    String email,

    @NotBlank(message = "Senha é obrigatória")
    String password
) {}
