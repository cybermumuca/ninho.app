package app.ninho.api.auth.exception;

import app.ninho.api.shared.exception.DomainException;

public class UserAlreadyExistsException extends DomainException {
    public UserAlreadyExistsException() {
        super("Usuário já existe", "USER_ALREADY_EXISTS");
    }
}
