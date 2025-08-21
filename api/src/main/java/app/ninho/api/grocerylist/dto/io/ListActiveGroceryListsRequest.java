package app.ninho.api.grocerylist.dto.io;

public record ListActiveGroceryListsRequest(
    String sort,
    Boolean completed,
    String principalId
) {}
