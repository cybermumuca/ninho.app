package app.ninho.api.grocerylist.dto;

public record ListActiveGroceryListsRequest(
    String sort,
    Boolean completed
) {}
