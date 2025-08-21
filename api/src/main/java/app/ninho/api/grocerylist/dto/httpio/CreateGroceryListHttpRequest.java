package app.ninho.api.grocerylist.dto.httpio;

import jakarta.validation.constraints.NotEmpty;

public record CreateGroceryListHttpRequest(
    @NotEmpty(message = "O título da lista de compras não pode ser vazio.")
    String title
) {}
