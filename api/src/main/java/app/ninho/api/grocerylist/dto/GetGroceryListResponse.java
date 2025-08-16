package app.ninho.api.grocerylist.dto;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public record GetGroceryListResponse(
    String id,
    String title,
    List<Item> items,
    Colaborator owner,
    boolean isOwnedByPrincipal,
    Colaborator closedBy,
    boolean isClosedByPrincipal,
    Instant closedAt
) {
    public record Item(
        String id,
        String name,
        String description,
        int quantity,
        String unit,
        BigDecimal price,
        Category category,
        Colaborator addedBy,
        boolean isAddedByPrincipal,
        Instant addedAt,
        Colaborator completedBy,
        boolean isCompletedByPrincipal,
        Instant completedAt
    ) {
        public record Category(
            String id,
            String name,
            String icon
        ) {}
    }

    public record Colaborator(
        String id,
        String firstName,
        String lastName,
        String avatar,
        String initials
    ) {}
}
