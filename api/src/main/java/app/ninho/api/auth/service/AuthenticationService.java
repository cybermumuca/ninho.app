package app.ninho.api.auth.service;

import app.ninho.api.auth.domain.Role;
import app.ninho.api.auth.domain.Scope;
import app.ninho.api.auth.domain.User;
import app.ninho.api.auth.dto.io.SignInRequest;
import app.ninho.api.auth.dto.io.SignInResponse;
import app.ninho.api.auth.dto.io.SignUpRequest;
import app.ninho.api.auth.exception.InvalidCredentialsException;
import app.ninho.api.auth.exception.UserAlreadyExistsException;
import app.ninho.api.auth.exception.UserIsNotAcceptedException;
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
            throw new UserAlreadyExistsException();
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

    @Transactional
    public SignInResponse signIn(SignInRequest request) {
        var user = userRepository.findByEmail(request.email())
            .orElseThrow(InvalidCredentialsException::new);

        boolean passwordsMatch = passwordEncoder.matches(request.password(), user.getPassword());

        if (!passwordsMatch) {
            throw new InvalidCredentialsException();
        }

        if (!user.isAccepted()) {
            throw new UserIsNotAcceptedException();
        }

        var now = Instant.now();
        var roles = user.getRoles().stream().map(Role::getName).toList();
        var scopes = user.getScopes().stream().map(Scope::getName).toList();
        var expiresAt = now.plus(30, ChronoUnit.DAYS);

        var claims = JwtClaimsSet.builder()
            .subject(user.getId())
            .issuedAt(now)
            .expiresAt(expiresAt)
            .claim("roles", roles)
            .claim("scopes", scopes)
            .build();

        var accessToken = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

        return new SignInResponse(accessToken, now, expiresAt);
    }
}
