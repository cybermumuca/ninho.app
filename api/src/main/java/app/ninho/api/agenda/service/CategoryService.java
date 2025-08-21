package app.ninho.api.agenda.service;

import app.ninho.api.agenda.domain.Category;
import app.ninho.api.agenda.dto.io.*;
import app.ninho.api.agenda.repository.CategoryRepository;
import app.ninho.api.auth.domain.Scope;
import app.ninho.api.auth.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
public class CategoryService {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    public CategoryService(UserRepository userRepository, CategoryRepository categoryRepository) {
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }

    @Transactional
    public List<ListActiveCategoriesResponse> listActiveCategories(ListActiveCategoriesRequest request) {
        var principal = userRepository.findById(request.principalId())
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        var principalHasPermission = principal.checkScope(Scope.Values.CATEGORY_LIST.name);

        if (!principalHasPermission) {
            throw new IllegalArgumentException("User does not have permission to list categories");
        }

        return categoryRepository.findAllByOwnerIdAndArchivedAtIsNull(request.principalId())
            .stream()
            .map(category -> new ListActiveCategoriesResponse(
                category.getId(),
                category.getName(),
                category.getColor(),
                category.getIcon(),
                0 // TODO: WIP Implement count of events in category
            ))
            .toList();
    }

    @Transactional
    public List<ListArchivedCategoriesResponse> listArchivedCategories(ListArchivedCategoriesRequest request) {
        var principal = userRepository.findById(request.principalId())
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        var principalHasPermission = principal.checkScope(Scope.Values.CATEGORY_LIST.name);

        if (!principalHasPermission) {
            throw new IllegalArgumentException("User does not have permission to list categories");
        }

        return categoryRepository.findAllByOwnerIdAndArchivedAtIsNotNull(request.principalId())
            .stream()
            .map(category -> new ListArchivedCategoriesResponse(
                category.getId(),
                category.getName(),
                category.getColor(),
                category.getIcon(),
                0, // TODO: WIP Implement count of events in category
                category.getCreatedAt(),
                category.getArchivedAt()
            ))
            .toList();
    }

    @Transactional
    public void createCategory(CreateCategoryRequest request) {
        var principal = userRepository.findById(request.principalId())
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        var principalHasPermission = principal.checkScope(Scope.Values.CATEGORY_CREATE.name);

        if (!principalHasPermission) {
            throw new IllegalArgumentException("User does not have permission to create categories");
        }

        var category = new Category();

        category.setName(request.name());
        category.setColor(request.color());
        category.setIcon(request.icon());
        category.setOwner(principal);

        categoryRepository.save(category);
    }

    @Transactional
    public void updateCategory(UpdateCategoryRequest request) {
        var principal = userRepository.findById(request.principalId())
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        var principalHasPermission = principal.checkScope(Scope.Values.CATEGORY_UPDATE.name);

        if (!principalHasPermission) {
            throw new IllegalArgumentException("User does not have permission to update categories");
        }

        var category = categoryRepository.findById(request.categoryId())
            .orElseThrow(() -> new IllegalArgumentException("Category not found"));

        if (!category.getOwner().getId().equals(principal.getId())) {
            throw new IllegalArgumentException("User does not own this category");
        }

        if (category.getArchivedAt() != null) {
            throw new IllegalArgumentException("Cannot update an archived category");
        }

        if (request.name() != null) {
            category.setName(request.name());
        }

        if (request.color() != null) {
            category.setColor(request.color());
        }

        if (request.icon() != null) {
            category.setIcon(request.icon());
        }

        categoryRepository.save(category);
    }

    @Transactional
    public void archiveCategory(ArchiveCategoryRequest request) {
        var principal = userRepository.findById(request.principalId())
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        var principalHasPermission = principal.checkScope(Scope.Values.CATEGORY_UPDATE.name);

        if (!principalHasPermission) {
            throw new IllegalArgumentException("User does not have permission to update categories");
        }

        var category = categoryRepository.findById(request.categoryId())
            .orElseThrow(() -> new IllegalArgumentException("Category not found"));

        if (!category.getOwner().getId().equals(principal.getId())) {
            throw new IllegalArgumentException("User does not own this category");
        }

        if (category.getArchivedAt() != null) {
            throw new IllegalArgumentException("Category is already archived");
        }

        category.setArchivedAt(Instant.now());

        categoryRepository.save(category);
    }

    @Transactional
    public void restoreCategory(RestoreCategoryRequest request) {
        var principal = userRepository.findById(request.principalId())
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        var principalHasPermission = principal.checkScope(Scope.Values.CATEGORY_UPDATE.name);

        if (!principalHasPermission) {
            throw new IllegalArgumentException("User does not have permission to update categories");
        }

        var category = categoryRepository.findById(request.categoryId())
            .orElseThrow(() -> new IllegalArgumentException("Category not found"));

        if (!category.getOwner().getId().equals(principal.getId())) {
            throw new IllegalArgumentException("User does not own this category");
        }

        if (category.getArchivedAt() == null) {
            throw new IllegalArgumentException("Category is not archived");
        }

        category.setArchivedAt(null);

        categoryRepository.save(category);
    }

    @Transactional
    public void deleteCategory(DeleteCategoryRequest request) {
        var principal = userRepository.findById(request.principalId())
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        var principalHasPermission = principal.checkScope(Scope.Values.CATEGORY_DELETE.name);

        if (!principalHasPermission) {
            throw new IllegalArgumentException("User does not have permission to delete categories");
        }

        var category = categoryRepository.findById(request.categoryId())
            .orElseThrow(() -> new IllegalArgumentException("Category not found"));

        if (!category.getOwner().getId().equals(principal.getId())) {
            throw new IllegalArgumentException("User does not own this category");
        }

        if (category.getArchivedAt() == null) {
            throw new IllegalArgumentException("Category is not archived");
        }

        categoryRepository.deleteById(request.categoryId());
    }
}
