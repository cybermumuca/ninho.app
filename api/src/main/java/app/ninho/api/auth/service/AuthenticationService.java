package app.ninho.api.auth.service;

import app.ninho.api.auth.domain.Role;
import app.ninho.api.auth.domain.Scope;
import app.ninho.api.auth.domain.User;
import app.ninho.api.auth.dto.SignInRequest;
import app.ninho.api.auth.dto.SignInResponse;
import app.ninho.api.auth.dto.SignUpRequest;
import app.ninho.api.auth.repository.RoleRepository;
import app.ninho.api.auth.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Set;

@Service
public class AuthenticationService {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final JwtEncoder jwtEncoder;
    private final PasswordEncoder passwordEncoder;

    public AuthenticationService(
            RoleRepository roleRepository,
            UserRepository userRepository,
            JwtEncoder jwtEncoder,
            PasswordEncoder passwordEncoder
    ) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.jwtEncoder = jwtEncoder;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public void signUp(SignUpRequest signUpRequest) {
        var existingUser = userRepository.findByEmail(signUpRequest.email());

        if (existingUser.isPresent()) {
            throw new RuntimeException("User with this email already exists");
        }

        var userRole = roleRepository.findByName(Role.Values.USER.name());

        User user = new User();
        user.setFirstName(signUpRequest.firstName());
        user.setLastName(signUpRequest.lastName());
        user.setEmail(signUpRequest.email());
        user.setPassword(passwordEncoder.encode(signUpRequest.password()));
        user.setRoles(Set.of(userRole));

        userRepository.save(user);
    }

    public SignInResponse signIn(SignInRequest signInRequest) {
        var user = userRepository.findByEmail(signInRequest.email())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.isAccepted()) {
            throw new RuntimeException("User is not accepted");
        }

        var now = Instant.now();

        var roles = user.getRoles()
                .stream()
                .map(Role::getName)
                .toList();

        var scopes = user.getScopes()
                .stream()
                .map(Scope::getName)
                .toList();

        var claims = JwtClaimsSet.builder()
                .subject(user.getId())
                .issuedAt(now)
                .expiresAt(now.plus(30, ChronoUnit.DAYS))
                .claim("roles", roles)
                .claim("scopes", scopes)
                .build();

        var accessToken = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

        return new SignInResponse(accessToken);
    }
}
