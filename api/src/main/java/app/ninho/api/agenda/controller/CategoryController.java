package app.ninho.api.agenda.controller;

import app.ninho.api.agenda.dto.httpio.CreateCategoryHttpRequest;
import app.ninho.api.agenda.dto.httpio.UpdateCategoryHttpRequest;
import app.ninho.api.agenda.dto.io.*;
import app.ninho.api.agenda.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/v1/categories")
    @PreAuthorize("hasAuthority('category:create')")
    public ResponseEntity<Void> createCategory(
        @Valid @RequestBody CreateCategoryHttpRequest httpRequest,
        @AuthenticationPrincipal Jwt jwt
    ) {
        var request = new CreateCategoryRequest(
            httpRequest.name(),
            httpRequest.color(),
            httpRequest.icon(),
            jwt.getSubject()
        );

        categoryService.createCategory(request);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/v1/categories/{id}")
    @PreAuthorize("hasAuthority('category:update')")
    public ResponseEntity<Void> updateCategory(
        @PathVariable("id") String categoryId,
        @Valid @RequestBody UpdateCategoryHttpRequest httpRequest,
        @AuthenticationPrincipal Jwt jwt
    ) {
        var request = new UpdateCategoryRequest(
            categoryId,
            httpRequest.name(),
            httpRequest.color(),
            httpRequest.icon(),
            jwt.getSubject()
        );

        categoryService.updateCategory(request);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PatchMapping("/v1/categories/{id}/archive")
    @PreAuthorize("hasAuthority('category:update')")
    public ResponseEntity<Void> archiveCategory(
        @PathVariable("id") String categoryId,
        @AuthenticationPrincipal Jwt jwt
    ) {
        var request = new ArchiveCategoryRequest(
            categoryId,
            jwt.getSubject()
        );

        categoryService.archiveCategory(request);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PatchMapping("/v1/categories/{id}/restore")
    @PreAuthorize("hasAuthority('category:update')")
    public ResponseEntity<Void> restoreCategory(
        @PathVariable("id") String categoryId,
        @AuthenticationPrincipal Jwt jwt
    ) {
        var request = new RestoreCategoryRequest(
            categoryId,
            jwt.getSubject()
        );

        categoryService.restoreCategory(request);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/v1/categories/{id}")
    @PreAuthorize("hasAuthority('category:delete')")
    public ResponseEntity<Void> deleteCategory(
        @PathVariable("id") String categoryId,
        @AuthenticationPrincipal Jwt jwt
    ) {
        var request = new DeleteCategoryRequest(
            categoryId,
            jwt.getSubject()
        );

        categoryService.deleteCategory(request);

        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
