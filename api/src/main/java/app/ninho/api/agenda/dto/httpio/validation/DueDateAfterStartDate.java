package app.ninho.api.agenda.dto.httpio.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = DueDateAfterStartDateValidator.class)
@Target({ ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
public @interface DueDateAfterStartDate {
    String message() default "A data de vencimento deve ser igual ou posterior à data de início";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}