package app.ninho.api.agenda.repository;

import app.ninho.api.agenda.domain.Task;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, String> {
    @Query("""
        SELECT t FROM Task t
        JOIN FETCH t.category
        LEFT JOIN FETCH t.tags
        LEFT JOIN FETCH t.tracks
        WHERE t.id = :taskId
    """)
    Optional<Task> findByIdWithCategoryAndTagsAndFrequency(@Param("taskId") String taskId);
}
