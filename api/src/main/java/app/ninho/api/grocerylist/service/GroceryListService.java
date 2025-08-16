package app.ninho.api.grocerylist.service;

import app.ninho.api.grocerylist.dto.ListActiveGroceryListsRequest;
import app.ninho.api.grocerylist.dto.ListActiveGroceryListsResponse;
import app.ninho.api.grocerylist.repository.GroceryListRepository;
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
}
