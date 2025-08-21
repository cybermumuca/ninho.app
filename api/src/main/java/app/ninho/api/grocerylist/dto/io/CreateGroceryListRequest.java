package app.ninho.api.grocerylist.dto.io;

public record CreateGroceryListRequest(
    String title,
    String principalId
) {}
