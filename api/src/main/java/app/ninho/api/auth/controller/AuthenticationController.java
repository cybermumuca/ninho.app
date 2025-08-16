package app.ninho.api.auth.controller;

import app.ninho.api.auth.service.AuthenticationService;
import app.ninho.api.auth.dto.SignInRequest;
import app.ninho.api.auth.dto.SignInResponse;
import app.ninho.api.auth.dto.SignUpRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/v1/auth/sign-up")
    public ResponseEntity<Void> signUp(@Valid @RequestBody SignUpRequest request) {
        authenticationService.signUp(request);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/v1/auth/sign-in")
    public ResponseEntity<SignInResponse> signIn(@RequestBody SignInRequest request) {
        return ResponseEntity.ok(authenticationService.signIn(request));
    }
}
