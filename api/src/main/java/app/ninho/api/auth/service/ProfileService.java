package app.ninho.api.auth.service;

import app.ninho.api.auth.domain.Scope;
import app.ninho.api.auth.dto.AcceptUserRequest;
import app.ninho.api.auth.repository.ScopeRepository;
import app.ninho.api.auth.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.HashSet;
import java.util.stream.Collectors;

@Service
public class ProfileService {

    private final UserRepository userRepository;
    private final ScopeRepository scopeRepository;

    public ProfileService(UserRepository userRepository, ScopeRepository scopeRepository) {
        this.userRepository = userRepository;
        this.scopeRepository = scopeRepository;
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

        if (request.scopeIds() != null && !request.scopeIds().isEmpty()) {
            var scopes = scopeRepository.findAllById(request.scopeIds());
            
            if (scopes.size() != request.scopeIds().size()) {
                var foundScopeIds = scopes.stream().map(Scope::getId).collect(Collectors.toSet());
                var missingScopeIds = request.scopeIds().stream()
                        .filter(id -> !foundScopeIds.contains(id))
                        .toList();
                throw new IllegalArgumentException("Escopos não encontrados: " + missingScopeIds);
            }
            
            userToAccept.setScopes(new HashSet<>(scopes));
        }

        userToAccept.setAcceptedBy(principal);
        userToAccept.setAcceptedAt(Instant.now());
        userRepository.save(userToAccept);
    }
}
