package app.ninho.api.home.dto.io;

import jakarta.validation.constraints.NotBlank;

public record AddRoomRequest(
    @NotBlank(message = "O nome é obrigatório")
    String name,
    @NotBlank(message = "O ícone é obrigatório")
    String icon,
    @NotBlank(message = "A cor é obrigatória")
    String color
) {}
