package app.ninho.api.recurrence.domain;

import jakarta.persistence.*;

import java.time.DayOfWeek;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@DiscriminatorValue("WEEKLY")
public final class WeeklyFrequency extends Frequency {

    @Column(name = "days_of_week")
    private String daysOfWeekStr;

    public Set<DayOfWeek> getDaysOfWeek() {
        if (daysOfWeekStr == null || daysOfWeekStr.isBlank()) return new HashSet<>();
        return Arrays.stream(daysOfWeekStr.split(","))
            .map(String::trim)
            .map(DayOfWeek::valueOf)
            .collect(Collectors.toSet());
    }

    public void setDaysOfWeek(Set<DayOfWeek> daysOfWeek) {
        if (daysOfWeek == null || daysOfWeek.isEmpty()) {
            this.daysOfWeekStr = null;
        } else {
            this.daysOfWeekStr = daysOfWeek.stream()
                .map(DayOfWeek::name)
                .collect(Collectors.joining(","));
        }
    }
}