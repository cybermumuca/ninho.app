package app.ninho.api.agenda.repository;

import app.ninho.api.agenda.domain.Task;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
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

    @Query("""
        SELECT t FROM Task t
        LEFT JOIN FETCH t.tracks
        WHERE t.id = :taskId
    """)
    Optional<Task> findByIdWithFrequency(@Param("taskId") String taskId);

    @Query("""
        SELECT DISTINCT t FROM Task t
        JOIN FETCH t.category
        LEFT JOIN FETCH t.tracks tracks
        WHERE t.owner.id = :ownerId
        AND tracks.type = 'SINGLE'
        AND (:startDate IS NULL OR tracks.startDate = :startDate)
        AND (:endDate IS NULL OR tracks.endDate = :endDate)
        AND (tracks.endDate IS NULL OR tracks.endDate >= :today)
    """)
    List<Task> findAllByOwnerAndStartDateAndEndDateAndTodayWithCategoryAndFrequency(
        @Param("ownerId") String ownerId,
        @Param("startDate") LocalDate startDate,
        @Param("endDate") LocalDate endDate,
        @Param("today") LocalDate today
    );
}
