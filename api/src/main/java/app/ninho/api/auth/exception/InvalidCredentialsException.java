package app.ninho.api.auth.exception;

import app.ninho.api.shared.exception.DomainException;

public class InvalidCredentialsException extends DomainException {
    public InvalidCredentialsException() {
        super("Credenciais inválidas", "INVALID_CREDENTIALS");
    }
}
