package app.ninho.api.grocerylist.service;

import app.ninho.api.auth.domain.User;
import app.ninho.api.grocerylist.domain.GroceryList;
import app.ninho.api.grocerylist.dto.CreateGroceryListRequest;
import app.ninho.api.grocerylist.dto.ListActiveGroceryListsRequest;
import app.ninho.api.grocerylist.dto.ListActiveGroceryListsResponse;
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

    public void createGroceryList(@Valid CreateGroceryListRequest request, String principalId) {
        var groceryList = new GroceryList();
        groceryList.setTitle(request.title());
        groceryList.setOwner(new User(principalId));
        groceryListRepository.save(groceryList);
    }
}
