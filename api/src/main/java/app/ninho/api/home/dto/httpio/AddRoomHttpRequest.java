package app.ninho.api.home.dto.httpio;

import jakarta.validation.constraints.NotBlank;

public record AddRoomHttpRequest(
    @NotBlank(message = "O nome é obrigatório")
    String name,
    @NotBlank(message = "O ícone é obrigatório")
    String icon,
    @NotBlank(message = "A cor é obrigatória")
    String color
) {}
