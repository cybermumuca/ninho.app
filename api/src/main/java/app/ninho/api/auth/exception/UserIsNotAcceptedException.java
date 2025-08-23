package app.ninho.api.auth.exception;

import app.ninho.api.shared.exception.DomainException;

public class UserIsNotAcceptedException extends DomainException {
    public UserIsNotAcceptedException() {
        super("Usuário não aceito", "USER_NOT_ACCEPTED");
    }
}
