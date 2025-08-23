package app.ninho.api.auth.exception.advice;

import app.ninho.api.auth.exception.InvalidCredentialsException;
import app.ninho.api.auth.exception.UserIsNotAcceptedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class AuthenticationControllerAdvice {

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<Map<String, String>> handleInvalidCredentials(InvalidCredentialsException ex) {
        Map<String, String> body = new HashMap<>();
        body.put("message", ex.getMessage());
        body.put("errorCode", ex.getErrorCode());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(body);
    }

    @ExceptionHandler(UserIsNotAcceptedException.class)
    public ResponseEntity<Map<String, String>> handleUserIsNotAccepted(UserIsNotAcceptedException ex) {
        Map<String, String> body = new HashMap<>();
        body.put("message", ex.getMessage());
        body.put("errorCode", ex.getErrorCode());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(body);
    }
}
