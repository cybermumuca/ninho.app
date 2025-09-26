package app.ninho.api.recurrence.domain.value;

import app.ninho.api.recurrence.domain.type.Occurrence;

import java.time.DayOfWeek;

public record MonthWeekdayOccurrence(Occurrence occurrence, DayOfWeek weekDay) {}
