package app.ninho.api.grocerylist.dto.io;

import java.time.Instant;

public record ListActiveGroceryListsResponse(
    String id,
    String title,
    int markedCount,
    int totalCount,
    CreatedBy createdBy,
    Instant createdAt
) {
    public record CreatedBy(
        String id,
        String name,
        String lastname,
        String avatar
    ) {}
}
