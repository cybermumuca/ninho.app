package app.ninho.api.recurrence.domain;

import jakarta.persistence.*;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@DiscriminatorValue("MONTHLY_BY_DAY")
public final class MonthlyDayFrequency extends Frequency {

    @Column(name = "month_days")
    private String monthDaysStr;

    public Set<Integer> getMonthDays() {
        if (monthDaysStr == null || monthDaysStr.isBlank()) return new HashSet<>();

        return Arrays.stream(monthDaysStr.split(","))
            .map(String::trim)
            .map(Integer::valueOf)
            .collect(Collectors.toSet());
    }

    public void setMonthDays(Set<Integer> monthDays) {
        if (monthDays == null || monthDays.isEmpty()) {
            this.monthDaysStr = null;
        } else {
            this.monthDaysStr = monthDays.stream()
                .sorted()
                .map(String::valueOf)
                .collect(Collectors.joining(","));
        }
    }
}