package app.ninho.api.recurrence.repository;

import app.ninho.api.recurrence.domain.Frequency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FrequencyRepository extends JpaRepository<Frequency, String> {}
