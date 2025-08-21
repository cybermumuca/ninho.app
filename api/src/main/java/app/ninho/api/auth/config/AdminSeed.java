package app.ninho.api.auth.config;

import app.ninho.api.auth.domain.Role;
import app.ninho.api.auth.domain.Scope;
import app.ninho.api.auth.domain.User;
import app.ninho.api.auth.repository.RoleRepository;
import app.ninho.api.auth.repository.ScopeRepository;
import app.ninho.api.auth.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.HashSet;

@Configuration
public class AdminSeed implements CommandLineRunner {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final ScopeRepository scopeRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminSeed(
        RoleRepository roleRepository,
        UserRepository userRepository,
        ScopeRepository scopeRepository,
        PasswordEncoder passwordEncoder
    ) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.scopeRepository = scopeRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) {
        // Seed roles
        Arrays.stream(Role.Values.values())
            .forEach(role -> {
                var roleInDB = roleRepository.findByName(role.name());
                if (roleInDB == null) {
                    roleRepository.save(new Role(role.name()));
                }
            });

        System.out.println("Seeding scopes...");

        Arrays.stream(Scope.Values.values())
            .forEach(scope ->
                scopeRepository.findByName(scope.name)
                    .orElseGet(() -> scopeRepository.save(new Scope(scope.name, scope.description)))
            );

        System.out.println("Seeding admin user...");
        var allRoles = new HashSet<>(roleRepository.findAll());
        var allScopes = new HashSet<>(scopeRepository.findAll());
        var adminOpt = userRepository.findByEmail("admin@email.com");

        if (adminOpt.isPresent()) {
            var admin = adminOpt.get();
            admin.setRoles(allRoles);
            admin.setScopes(allScopes);
            userRepository.save(admin);
        } else {
            var user = new User();
            user.setFirstName("admin");
            user.setLastName("lastname");
            user.setEmail("admin@email.com");
            user.setPassword(passwordEncoder.encode("12345678Aa!"));
            user.setRoles(allRoles);
            user.setScopes(allScopes);
            userRepository.save(user);
        }
    }
}
