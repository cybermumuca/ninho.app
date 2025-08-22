package app.ninho.api.auth.controller;

import app.ninho.api.auth.service.AuthenticationService;
import app.ninho.api.auth.dto.io.SignInRequest;
import app.ninho.api.auth.dto.SignUpRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;

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
    public ResponseEntity<Void> signIn(@RequestBody SignInRequest request) {
        var response = authenticationService.signIn(request);

        long maxAgeSeconds = Duration.between(response.issuedAt(), response.expiresAt()).getSeconds();

        ResponseCookie jwtCookie = ResponseCookie.from("ninho_access_token", response.accessToken())
            .httpOnly(true)
            .secure(true)
            .sameSite("Lax")
            .path("/")
            .maxAge(maxAgeSeconds)
            .build();

        return ResponseEntity
            .status(HttpStatus.OK)
            .header("Set-Cookie", jwtCookie.toString())
            .build();
    }
}
