package app.ninho.api.grocerylist.dto;

import jakarta.validation.constraints.NotBlank;

public record CreateGroceryListRequest(
    @NotBlank(message = "O título da lista de compras não pode ser vazio.")
    String title
) {}
