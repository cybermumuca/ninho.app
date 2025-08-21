package app.ninho.api.agenda.service;

import app.ninho.api.agenda.dto.ListActiveCategoriesRequest;
import app.ninho.api.agenda.dto.ListActiveCategoriesResponse;
import app.ninho.api.agenda.repository.CategoryRepository;
import app.ninho.api.auth.domain.Scope;
import app.ninho.api.auth.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}
