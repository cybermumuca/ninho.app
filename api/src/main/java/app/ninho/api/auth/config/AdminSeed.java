package app.ninho.api.auth.config;

import app.ninho.api.auth.domain.Role;
import app.ninho.api.auth.domain.User;
import app.ninho.api.auth.repository.RoleRepository;
import app.ninho.api.auth.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;

@Configuration
public class AdminSeed implements CommandLineRunner {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminSeed(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) {
        roleRepository.saveAll(List.of(new Role("ADMIN"), new Role("USER")));

        var userAdmin = userRepository.findByEmail("admin@email.com");

        userAdmin.ifPresentOrElse(
                user -> {
                    System.out.println("Admin user already exists");
                },
                () -> {
                    var user = new User();

                    user.setFirstName("admin");
                    user.setLastName("lastname");
                    user.setEmail("admin@email.com");
                    user.setPassword(passwordEncoder.encode("12345678Aa!"));
                    user.setRoles(new HashSet<>(roleRepository.findAll()));
                    userRepository.save(user);
                }
        );
    }
}
