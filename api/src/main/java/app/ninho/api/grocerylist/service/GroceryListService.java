package app.ninho.api.grocerylist.service;

import app.ninho.api.auth.domain.User;
import app.ninho.api.grocerylist.domain.GroceryList;
import app.ninho.api.grocerylist.dto.*;
import app.ninho.api.grocerylist.repository.GroceryListRepository;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroceryListService {

    private final GroceryListRepository groceryListRepository;

    public GroceryListService(GroceryListRepository groceryListRepository) {
        this.groceryListRepository = groceryListRepository;
    }

    public List<ListActiveGroceryListsResponse> listActiveGroceryLists(ListActiveGroceryListsRequest request, String principalId) {
        return List.of();
    }

    public void createGroceryList(CreateGroceryListRequest request, String principalId) {
        var groceryList = new GroceryList();
        groceryList.setTitle(request.title());
        groceryList.setOwner(new User(principalId));
        groceryListRepository.save(groceryList);
    }

    public GetGroceryListResponse getGroceryList(GetGroceryListRequest request, String principalId) {
        var groceryList = groceryListRepository.findById(request.groceryListId())
                .orElseThrow(() -> new IllegalArgumentException("Grocery list not found"));

        return new GetGroceryListResponse(
            groceryList.getId(),
            groceryList.getTitle(),
            groceryList.getItems().stream()
                .map(item -> new GetGroceryListResponse.Item(
                    item.getId(),
                    item.getName(),
                    item.getDescription(),
                    item.getQuantity(),
                    item.getUnit(),
                    item.getPrice(),
                    new GetGroceryListResponse.Item.Category(
                        item.getCategory().getId(),
                        item.getCategory().getName(),
                        item.getCategory().getIcon()
                    ),
                    new GetGroceryListResponse.Colaborator(
                        item.getAddedBy().getId(),
                        item.getAddedBy().getFirstName(),
                        item.getAddedBy().getLastName(),
                        item.getAddedBy().getAvatar(),
                        item.getAddedBy().getInitials()
                    ),
                    item.getAddedBy().getId().equals(principalId),
                    item.getAddedAt(),
                    item.getCompletedBy() != null ? new GetGroceryListResponse.Colaborator(
                        item.getCompletedBy().getId(),
                        item.getCompletedBy().getFirstName(),
                        item.getCompletedBy().getLastName(),
                        item.getCompletedBy().getAvatar(),
                        item.getCompletedBy().getInitials()
                    ) : null,
                    item.getCompletedBy() != null && item.getCompletedBy().getId().equals(principalId),
                    item.getCompletedAt()
                )).toList(),
            new GetGroceryListResponse.Colaborator(
                groceryList.getOwner().getId(),
                groceryList.getOwner().getFirstName(),
                groceryList.getOwner().getLastName(),
                groceryList.getOwner().getAvatar(),
                groceryList.getOwner().getInitials()
            ),
            groceryList.getOwner().getId().equals(principalId),
            groceryList.getClosedBy() != null ? new GetGroceryListResponse.Colaborator(
                groceryList.getClosedBy().getId(),
                groceryList.getClosedBy().getFirstName(),
                groceryList.getClosedBy().getLastName(),
                groceryList.getClosedBy().getAvatar(),
                groceryList.getClosedBy().getInitials()
            ) : null,
            groceryList.getClosedBy() != null && groceryList.getClosedBy().getId().equals(principalId),
            groceryList.getClosedAt()
        );
    }
}
