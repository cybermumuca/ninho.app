package app.ninho.api.agenda.repository;

import app.ninho.api.agenda.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, String> {
    List<Category> findAllByOwnerIdAndArchivedAtIsNull(String ownerId);
    List<Category> findAllByOwnerIdAndArchivedAtIsNotNull(String ownerId);
}
