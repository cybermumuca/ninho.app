package app.ninho.api.recurrence.domain;

import app.ninho.api.recurrence.domain.value.YearlyDateOccurrence;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

import java.time.Month;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@DiscriminatorValue("YEARLY_BY_DATE")
public final class YearlyDateFrequency extends Frequency {

    @Column(name = "dates", nullable = false)
    private String datesStr; // coluna simples no banco

    public Set<YearlyDateOccurrence> getDates() {
        Set<YearlyDateOccurrence> result = new HashSet<>();
        if (datesStr == null || datesStr.isBlank()) return result;

        // formato esperado: "1:JANUARY,15:FEBRUARY"
        String[] items = datesStr.split(",");
        for (String item : items) {
            String[] parts = item.split(":");
            if (parts.length == 2) {
                int day = Integer.parseInt(parts[0].trim());
                Month month = Month.valueOf(parts[1].trim());
                result.add(new YearlyDateOccurrence(day, month));
            }
        }
        return result;
    }

    public void setDates(Set<YearlyDateOccurrence> dates) {
        if (dates == null || dates.isEmpty()) {
            this.datesStr = null;
        } else {
            this.datesStr = dates.stream()
                .map(d -> d.day() + ":" + d.month())
                .collect(Collectors.joining(","));
        }
    }
}
