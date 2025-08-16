package app.ninho.api.auth.service;

import app.ninho.api.auth.domain.Role;
import app.ninho.api.auth.domain.User;
import app.ninho.api.auth.dto.SignInRequest;
import app.ninho.api.auth.dto.SignInResponse;
import app.ninho.api.auth.dto.SignUpRequest;
import app.ninho.api.auth.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;


    public AuthenticationService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            AuthenticationManager authenticationManager
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public void signUp(SignUpRequest signUpRequest) {
        User user = new User();
        user.setFirstName(signUpRequest.firstName());
        user.setLastName(signUpRequest.lastName());
        user.setEmail(signUpRequest.email());
        user.setPassword(passwordEncoder.encode(signUpRequest.password()));
        user.setRole(Role.USER);

        userRepository.save(user);
    }

    public SignInResponse signIn(SignInRequest signInRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signInRequest.email(), signInRequest.password())
        );
        var user = userRepository.findByEmail(signInRequest.email())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
        var accessToken = jwtService.generateToken(user);

        return new SignInResponse(accessToken);
    }
}
