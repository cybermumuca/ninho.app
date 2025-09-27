package app.ninho.api.agenda.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.time.Instant;
import java.time.LocalTime;

@Entity
@Table(name = "tasks")
public class Task extends Activity {

    @Column(name = "notes")
    private String notes;

    @Column(name = "estimated_duration")
    private LocalTime estimatedDuration;

    @Column(name = "actual_duration")
    private LocalTime actualDuration;

    @Column(name = "completed_at")
    private Instant completedAt;

    public Instant getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(Instant completedAt) {
        this.completedAt = completedAt;
    }

    public LocalTime getActualDuration() {
        return actualDuration;
    }

    public void setActualDuration(LocalTime actualDuration) {
        this.actualDuration = actualDuration;
    }

    public LocalTime getEstimatedDuration() {
        return estimatedDuration;
    }

    public void setEstimatedDuration(LocalTime estimatedDuration) {
        this.estimatedDuration = estimatedDuration;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
