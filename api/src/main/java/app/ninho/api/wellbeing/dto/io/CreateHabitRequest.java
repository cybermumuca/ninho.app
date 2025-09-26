package app.ninho.api.wellbeing.dto.io;

import app.ninho.api.recurrence.domain.*;
import app.ninho.api.recurrence.domain.type.FrequencyType;
import app.ninho.api.recurrence.domain.type.PeriodUnit;
import app.ninho.api.recurrence.domain.value.MonthWeekdayOccurrence;
import app.ninho.api.recurrence.domain.value.YearlyDateOccurrence;
import app.ninho.api.wellbeing.domain.Modality;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;

public record CreateHabitRequest(
    String title,
    String description,
    Modality modality,
    String categoryId,
    FrequencyType frequencyType,
    List<DayOfWeek> weekDays,
    List<Integer> monthDays,
    List<MonthWeekdayOccurrence> monthlyWeekdayOccurrences,
    List<YearlyDateOccurrence> yearlyDateOccurrences,
    Integer periodCount,
    PeriodUnit periodType,
    Integer intervalDays,
    LocalDate startDate,
    LocalDate endDate,
    String principalId
) {
    public Frequency toFrequency() {
        if (frequencyType == null) {
            throw new IllegalStateException("frequencyType is required to build Frequency");
        }

        Frequency frequency;

        switch (frequencyType) {
            case DAILY -> frequency = new DailyFrequency();
            case WEEKLY -> {
                var weeklyFrequency = new WeeklyFrequency();
                weeklyFrequency.setDaysOfWeek(new HashSet<>(weekDays));
                frequency = weeklyFrequency;
            }
            case MONTHLY_BY_DAY -> {
                var monthlyDayFrequency = new MonthlyDayFrequency();
                monthlyDayFrequency.setMonthDays(new HashSet<>(monthDays));
                frequency = monthlyDayFrequency;
            }
            case MONTHLY_BY_WEEKDAY -> {
                var monthlyWeekdayFrequency = new MonthlyWeekdayFrequency();
                monthlyWeekdayFrequency.setOccurrences(new HashSet<>(monthlyWeekdayOccurrences));
                frequency = monthlyWeekdayFrequency;
            }
            case YEARLY_BY_DATE -> {
                var yearlyDateFrequency = new YearlyDateFrequency();
                yearlyDateFrequency.setDates(new HashSet<>(yearlyDateOccurrences));
                frequency = yearlyDateFrequency;
            }
            case PERIOD_COUNT -> {
                var periodCountFrequency = new PeriodCountFrequency();
                periodCountFrequency.setCount(periodCount);
                periodCountFrequency.setPeriod(periodType);
                frequency = periodCountFrequency;
            }
            case EVERY_X_DAYS -> {
                var everyXDaysFrequency = new EveryXDaysFrequency();
                everyXDaysFrequency.setIntervalDays(intervalDays);
                frequency = everyXDaysFrequency;
            }
            default -> throw new IllegalStateException("Unsupported frequency type: " + frequencyType);
        }

        frequency.setType(frequencyType);
        frequency.setStartDate(startDate);
        frequency.setEndDate(endDate);

        return frequency;
    }
}
