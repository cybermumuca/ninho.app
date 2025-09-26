package app.ninho.api.recurrence.domain;

import app.ninho.api.recurrence.domain.type.Occurrence;
import app.ninho.api.recurrence.domain.value.MonthWeekdayOccurrence;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

import java.time.DayOfWeek;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;


@Entity
@DiscriminatorValue("MONTHLY_BY_WEEKDAY")
public final class MonthlyWeekdayFrequency extends Frequency {

    @Column(name = "occurrences")
    private String occurrencesStr; // coluna json-like

    public Set<MonthWeekdayOccurrence> getOccurrences() {
        Set<MonthWeekdayOccurrence> result = new HashSet<>();
        if (occurrencesStr == null || occurrencesStr.isBlank()) return result;

        // formato esperado: "FIRST:SUNDAY,SECOND:MONDAY"
        String[] items = occurrencesStr.split(",");
        for (String item : items) {
            String[] parts = item.split(":");
            if (parts.length == 2) {
                Occurrence occurrence = Occurrence.valueOf(parts[0].trim());
                DayOfWeek weekDay = DayOfWeek.valueOf(parts[1].trim());
                result.add(new MonthWeekdayOccurrence(occurrence, weekDay));
            }
        }
        return result;
    }

    public void setOccurrences(Set<MonthWeekdayOccurrence> occurrences) {
        if (occurrences == null || occurrences.isEmpty()) {
            this.occurrencesStr = null;
        } else {
            this.occurrencesStr = occurrences.stream()
                .map(o -> o.occurrence() + ":" + o.weekDay())
                .collect(Collectors.joining(","));
        }
    }
}
