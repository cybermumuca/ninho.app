package app.ninho.api.wellbeing.repository;

import app.ninho.api.wellbeing.domain.Habit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HabitRepository extends JpaRepository<Habit, String> {
    List<Habit> findAllByOwnerIdAndArchivedAtIsNotNull(String ownerId);
}
