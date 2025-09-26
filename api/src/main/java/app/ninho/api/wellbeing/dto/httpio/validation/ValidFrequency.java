package app.ninho.api.wellbeing.dto.httpio.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Target({ ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ValidFrequencyValidator.class)
@Documented
public @interface ValidFrequency {
    String message() default "Frequência inválida";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
