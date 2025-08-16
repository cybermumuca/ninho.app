package app.ninho.api.auth.service;

import app.ninho.api.auth.dto.AcceptUserRequest;
import app.ninho.api.auth.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
public class ProfileService {

    private final UserRepository userRepository;

    public ProfileService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public void acceptUser(AcceptUserRequest request, String principalId) {
        var principal = userRepository.findById(principalId)
                .orElseThrow(() -> new IllegalArgumentException("Admin não encontrado"));

        boolean principalIsNotAdmin = principal.getRoles() == null || principal.getRoles().stream().noneMatch(role -> "ADMIN".equals(role.getName()));

        if (principalIsNotAdmin) {
            throw new SecurityException("Usuário não possui permissão de ADMIN");
        }

        var userToAccept = userRepository.findById(request.userToAcceptId())
                .orElseThrow(() -> new IllegalArgumentException("Usuário a ser aceito não encontrado"));

        if (userToAccept.isAccepted()) {
            throw new RuntimeException("Usuário já foi aceito");
        }

        userToAccept.setAcceptedBy(principal);
        userToAccept.setAcceptedAt(Instant.now());
        userRepository.save(userToAccept);
    }
}
