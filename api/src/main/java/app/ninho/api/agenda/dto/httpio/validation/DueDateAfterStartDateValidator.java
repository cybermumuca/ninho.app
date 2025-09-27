package app.ninho.api.agenda.dto.httpio.validation;

import app.ninho.api.agenda.dto.httpio.CreateTaskHttpRequest;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class DueDateAfterStartDateValidator implements ConstraintValidator<DueDateAfterStartDate, CreateTaskHttpRequest> {
    @Override
    public boolean isValid(CreateTaskHttpRequest value, ConstraintValidatorContext context) {
        if (value == null || value.dueDate() == null || value.startDate() == null) {
            return true;
        }
        if (value.dueDate().isBefore(value.startDate())) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("A data de vencimento deve ser igual ou posterior à data de início")
                .addPropertyNode("dueDate")
                .addConstraintViolation();
            return false;
        }
        return true;
    }
}
