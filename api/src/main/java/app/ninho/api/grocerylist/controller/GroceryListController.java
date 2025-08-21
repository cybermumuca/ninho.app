package app.ninho.api.grocerylist.controller;

import app.ninho.api.grocerylist.dto.httpio.CreateGroceryListHttpRequest;
import app.ninho.api.grocerylist.dto.io.*;
import app.ninho.api.grocerylist.service.GroceryListService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @PreAuthorize("hasAuthority('grocery_list:list')")
    public ResponseEntity<List<ListActiveGroceryListsResponse>> listActiveGroceryLists(
        @RequestParam(required = false, defaultValue = "asc") String sort,
        @RequestParam(required = false) Boolean completed,
        @AuthenticationPrincipal Jwt principal
    ) {
        var request = new ListActiveGroceryListsRequest(
            sort,
            completed,
            principal.getSubject()
        );

        var result = groceryListService.listActiveGroceryLists(request);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @PostMapping("/v1/grocery-lists")
    @PreAuthorize("hasAuthority('grocery_list:create')")
    public ResponseEntity<Void> createGroceryList(
        @Valid @RequestBody CreateGroceryListHttpRequest httpRequest,
        @AuthenticationPrincipal Jwt principal
    ) {
        var request = new CreateGroceryListRequest(
            httpRequest.title(),
            principal.getSubject()
        );

        groceryListService.createGroceryList(request);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/v1/grocery-lists/{id}")
    @PreAuthorize("hasAuthority('grocery_list:item:list')")
    public ResponseEntity<GetGroceryListResponse> getGroceryList(
        @PathVariable("id") String groceryListId,
        @AuthenticationPrincipal Jwt principal
    ) {
        var request = new GetGroceryListRequest(groceryListId, principal.getSubject());

        var response = groceryListService.getGroceryList(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
