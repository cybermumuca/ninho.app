package app.ninho.api.agenda.controller;

import app.ninho.api.agenda.dto.ListActiveCategoriesRequest;
import app.ninho.api.agenda.dto.ListActiveCategoriesResponse;
import app.ninho.api.agenda.dto.ListArchivedCategoriesRequest;
import app.ninho.api.agenda.dto.ListArchivedCategoriesResponse;
import app.ninho.api.agenda.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/v1/categories/active")
    @PreAuthorize("hasAuthority('category:list')")
    public ResponseEntity<List<ListActiveCategoriesResponse>> listActiveCategories(
        @AuthenticationPrincipal Jwt jwt
    ) {
        var request = new ListActiveCategoriesRequest(jwt.getSubject());

        var response = categoryService.listActiveCategories(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/v1/categories/archived")
    @PreAuthorize("hasAuthority('category:list')")
    public ResponseEntity<List<ListArchivedCategoriesResponse>> listArchivedCategories(
        @AuthenticationPrincipal Jwt jwt
    ) {
        var request = new ListArchivedCategoriesRequest(jwt.getSubject());

        var response = categoryService.listArchivedCategories(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
