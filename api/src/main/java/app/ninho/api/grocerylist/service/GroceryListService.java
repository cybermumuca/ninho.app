package app.ninho.api.grocerylist.service;

import app.ninho.api.auth.domain.Scope;
import app.ninho.api.auth.domain.User;
import app.ninho.api.auth.repository.UserRepository;
import app.ninho.api.grocerylist.domain.GroceryList;
import app.ninho.api.grocerylist.dto.io.*;
import app.ninho.api.grocerylist.repository.GroceryListRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class GroceryListService {

    private final GroceryListRepository groceryListRepository;
    private final UserRepository userRepository;

    public GroceryListService(GroceryListRepository groceryListRepository, UserRepository userRepository) {
        this.userRepository = userRepository;
        this.groceryListRepository = groceryListRepository;
    }

    public List<ListActiveGroceryListsResponse> listActiveGroceryLists(ListActiveGroceryListsRequest request) {
        return List.of(); // TODO: WIP
    }

    @Transactional
    public void createGroceryList(CreateGroceryListRequest request) {
        var principal = userRepository.findById(request.principalId())
            .orElseThrow(() -> new IllegalArgumentException("User not found: " + request.principalId()));

        var principalHasPermission = principal.checkScope(Scope.Values.GROCERY_LIST_CREATE.name);

        if (!principalHasPermission) {
            throw new IllegalArgumentException("User does not have permission to create grocery lists");
        }

        var groceryList = new GroceryList();

        groceryList.setTitle(request.title());
        groceryList.setOwner(new User(request.principalId()));

        groceryListRepository.save(groceryList);
    }

    @Transactional
    public GetGroceryListResponse getGroceryList(GetGroceryListRequest request) {
        var principal = userRepository.findById(request.principalId())
            .orElseThrow(() -> new IllegalArgumentException("User not found: " + request.principalId()));

        var principalHasPermission = principal.checkScope(Scope.Values.GROCERY_LIST_ITEM_LIST.name);

        if (!principalHasPermission) {
            throw new IllegalArgumentException("User does not have permission to list grocery list items");
        }

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
                    item.getAddedBy().getId().equals(request.principalId()),
                    item.getAddedAt(),
                    item.getCompletedBy() != null ? new GetGroceryListResponse.Colaborator(
                        item.getCompletedBy().getId(),
                        item.getCompletedBy().getFirstName(),
                        item.getCompletedBy().getLastName(),
                        item.getCompletedBy().getAvatar(),
                        item.getCompletedBy().getInitials()
                    ) : null,
                    item.getCompletedBy() != null && item.getCompletedBy().getId().equals(request.principalId()),
                    item.getCompletedAt()
                )).toList(),
            new GetGroceryListResponse.Colaborator(
                groceryList.getOwner().getId(),
                groceryList.getOwner().getFirstName(),
                groceryList.getOwner().getLastName(),
                groceryList.getOwner().getAvatar(),
                groceryList.getOwner().getInitials()
            ),
            groceryList.getOwner().getId().equals(request.principalId()),
            groceryList.getClosedBy() != null ? new GetGroceryListResponse.Colaborator(
                groceryList.getClosedBy().getId(),
                groceryList.getClosedBy().getFirstName(),
                groceryList.getClosedBy().getLastName(),
                groceryList.getClosedBy().getAvatar(),
                groceryList.getClosedBy().getInitials()
            ) : null,
            groceryList.getClosedBy() != null && groceryList.getClosedBy().getId().equals(request.principalId()),
            groceryList.getClosedAt()
        );
    }
}
