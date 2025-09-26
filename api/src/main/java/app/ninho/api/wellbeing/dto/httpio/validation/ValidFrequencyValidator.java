package app.ninho.api.wellbeing.dto.httpio.validation;

import app.ninho.api.recurrence.domain.type.FrequencyType;
import app.ninho.api.recurrence.domain.type.PeriodUnit;
import app.ninho.api.recurrence.domain.value.MonthWeekdayOccurrence;
import app.ninho.api.recurrence.domain.value.YearlyDateOccurrence;
import app.ninho.api.wellbeing.dto.httpio.CreateHabitHttpRequest;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.time.DayOfWeek;
import java.util.List;

public class ValidFrequencyValidator implements ConstraintValidator<ValidFrequency, CreateHabitHttpRequest> {

    @Override
    public boolean isValid(CreateHabitHttpRequest httpRequest, ConstraintValidatorContext context) {
        boolean isValid = true;

        FrequencyType type = httpRequest.frequencyType();

        if (type == null) {
            context.buildConstraintViolationWithTemplate("Tipo da frequência é obrigatório")
                    .addPropertyNode("frequencyType")
                    .addConstraintViolation();
            isValid = false;
            return isValid;
        }

        switch (type) {
            case WEEKLY -> {
                List<DayOfWeek> dow = httpRequest.weekDays();

                if (dow == null || dow.isEmpty()) {
                    context.buildConstraintViolationWithTemplate("Dias da semana são obrigatórios")
                            .addPropertyNode("weekDays")
                            .addConstraintViolation();
                    isValid = false;

                }
            }
            case MONTHLY_BY_DAY -> {
                List<Integer> monthDays = httpRequest.monthDays();

                if (monthDays == null || monthDays.isEmpty()) {
                    context.buildConstraintViolationWithTemplate("Dias do mês são obrigatórios")
                            .addPropertyNode("monthDays")
                            .addConstraintViolation();
                    isValid = false;
                }
            }
            case MONTHLY_BY_WEEKDAY -> {
                List<MonthWeekdayOccurrence> occurrences = httpRequest.monthlyWeekdayOccurrences();

                if (occurrences == null || occurrences.isEmpty()) {
                    context.buildConstraintViolationWithTemplate("Ocorrências semanais do mês são obrigatórias")
                            .addPropertyNode("monthlyWeekdayOccurrences")
                            .addConstraintViolation();
                    isValid = false;
                } else {
                    for (MonthWeekdayOccurrence monthWeekdayOccurrence : occurrences) {
                        if (monthWeekdayOccurrence == null || monthWeekdayOccurrence.occurrence() == null || monthWeekdayOccurrence.weekDay() == null) {
                            context.buildConstraintViolationWithTemplate("Cada ocorrência deve ter dia da semana e número da ocorrência válidos")
                                    .addPropertyNode("monthlyWeekdayOccurrences")
                                    .addConstraintViolation();
                            isValid = false;
                            break;
                        }
                    }

                    boolean hasDuplicate = occurrences.stream()
                        .filter(o -> o != null && o.occurrence() != null && o.weekDay() != null)
                        .distinct()
                        .count() < occurrences.size();

                    if (hasDuplicate) {
                        context.buildConstraintViolationWithTemplate("Ocorrências semanais do mês duplicadas")
                            .addPropertyNode("monthlyWeekdayOccurrences")
                            .addConstraintViolation();
                        isValid = false;
                    }
                }
            }
            case YEARLY_BY_DATE -> {
                List<YearlyDateOccurrence> occurrences = httpRequest.yearlyDateOccurrences();

                if (occurrences == null || occurrences.isEmpty()) {
                    context.buildConstraintViolationWithTemplate("Datas anuais são obrigatórias")
                        .addPropertyNode("yearlyDateOccurrences")
                        .addConstraintViolation();
                    isValid = false;
                } else {
                    for (YearlyDateOccurrence yearlyDateOccurrence : occurrences) {
                        if (yearlyDateOccurrence == null || yearlyDateOccurrence.day() < 1 || yearlyDateOccurrence.day() > 31 || yearlyDateOccurrence.month() == null) {
                            context.buildConstraintViolationWithTemplate("Cada data deve ter dia e mês válidos")
                                .addPropertyNode("yearlyDateOccurrences")
                                .addConstraintViolation();
                            isValid = false;
                            break;
                        }
                    }

                    boolean hasDuplicate = occurrences.stream()
                        .filter(o -> o != null && o.day() >= 1 && o.day() <= 31 && o.month() != null)
                        .distinct()
                        .count() < occurrences.size();

                    if (hasDuplicate) {
                        context.buildConstraintViolationWithTemplate("Datas anuais duplicadas")
                            .addPropertyNode("yearlyDateOccurrences")
                            .addConstraintViolation();
                        isValid = false;
                    }
                }
            }
            case PERIOD_COUNT -> {
                Integer periodCount = httpRequest.periodCount();

                if (periodCount == null || periodCount < 1) {
                    context.buildConstraintViolationWithTemplate("O número de vezes não pode ser menor que 1")
                        .addPropertyNode("periodCount")
                        .addConstraintViolation();
                    isValid = false;
                }

                PeriodUnit periodUnit = httpRequest.periodType();

                if (periodUnit == null) {
                    context.buildConstraintViolationWithTemplate("O período é obrigatório")
                        .addPropertyNode("periodType")
                        .addConstraintViolation();
                    isValid = false;
                }

                if (periodUnit == PeriodUnit.WEEK && periodCount != null && periodCount > 7) {
                    context.buildConstraintViolationWithTemplate("O número de vezes não pode ser maior que 7 para períodos semanais")
                        .addPropertyNode("periodCount")
                        .addConstraintViolation();
                    isValid = false;
                }

                if (periodUnit == PeriodUnit.MONTH && periodCount != null && periodCount > 28) {
                    context.buildConstraintViolationWithTemplate("O número de vezes não pode ser maior que 28 para períodos mensais")
                        .addPropertyNode("periodCount")
                        .addConstraintViolation();
                    isValid = false;
                }

                if (periodUnit == PeriodUnit.YEAR && periodCount != null && periodCount > 365) {
                    context.buildConstraintViolationWithTemplate("O número de vezes não pode ser maior que 365 para períodos anuais")
                        .addPropertyNode("periodCount")
                        .addConstraintViolation();
                    isValid = false;
                }
            }
            case EVERY_X_DAYS -> {
                Integer intervalDays = httpRequest.intervalDays();

                if (intervalDays == null || intervalDays < 1) {
                    context.buildConstraintViolationWithTemplate("O intervalo de dias não pode ser menor que 1")
                        .addPropertyNode("intervalDays")
                        .addConstraintViolation();
                    isValid = false;
                }

                if (intervalDays != null && intervalDays > 365) {
                    context.buildConstraintViolationWithTemplate("O intervalo de dias não pode ser maior que 365")
                        .addPropertyNode("intervalDays")
                        .addConstraintViolation();
                    isValid = false;
                }
            }
            case DAILY -> {}
            default -> {
                context.buildConstraintViolationWithTemplate("Frequência inválida")
                    .addPropertyNode("frequencyType")
                    .addConstraintViolation();
                isValid = false;
            }
        }

        boolean datesProvidedAreNotNull = httpRequest.startDate() != null && httpRequest.endDate() != null;

        if (datesProvidedAreNotNull && httpRequest.endDate().isBefore(httpRequest.startDate())) {
            context.buildConstraintViolationWithTemplate("Data de término não pode ser anterior à data de início")
                .addPropertyNode("endDate")
                .addConstraintViolation();
            isValid = false;
        }

        return isValid;
    }
}
