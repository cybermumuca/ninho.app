package app.ninho.api.grocerylist.controller;

import app.ninho.api.grocerylist.dto.CreateGroceryListRequest;
import app.ninho.api.grocerylist.dto.ListActiveGroceryListsRequest;
import app.ninho.api.grocerylist.dto.ListActiveGroceryListsResponse;
import app.ninho.api.grocerylist.service.GroceryListService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class GroceryListController {

    private final GroceryListService groceryListService;

    public GroceryListController(GroceryListService groceryListService) {
        this.groceryListService = groceryListService;
    }

    @GetMapping("/v1/grocery-lists/active")
    public ResponseEntity<List<ListActiveGroceryListsResponse>> listActiveGroceryLists(
        @RequestParam(required = false, defaultValue = "asc") String sort,
        @RequestParam(required = false) Boolean completed,
        @AuthenticationPrincipal Jwt principal
    ) {
        var request = new ListActiveGroceryListsRequest(sort, completed);
        var result = groceryListService.listActiveGroceryLists(request, principal.getSubject());

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @PostMapping("/v1/grocery-lists")
    public ResponseEntity<Void> createGroceryList(
        @Valid @RequestBody CreateGroceryListRequest request,
        @AuthenticationPrincipal Jwt principal
    ) {
        groceryListService.createGroceryList(request, principal.getSubject());

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
