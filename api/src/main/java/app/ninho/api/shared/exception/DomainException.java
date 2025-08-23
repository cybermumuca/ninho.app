package app.ninho.api.shared.exception;

import java.util.Map;

public abstract class DomainException extends RuntimeException {
    private final String errorCode;
    private final Map<String, Object> details;

    public DomainException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
        this.details = null;
    }

    public DomainException(String message, String errorCode, Map<String, Object> details) {
        super(message);
        this.errorCode = errorCode;
        this.details = details;
    }
    
    public String getErrorCode() {
        return errorCode;
    }

    public Map<String, Object> getDetails() {
        return details;
    }
}