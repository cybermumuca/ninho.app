package app.ninho.api.auth.service;

import app.ninho.api.auth.domain.Scope;
import app.ninho.api.auth.dto.ScopeResponse;
import app.ninho.api.auth.repository.ScopeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScopeService {

    private final ScopeRepository scopeRepository;

    public ScopeService(ScopeRepository scopeRepository) {
        this.scopeRepository = scopeRepository;
    }

    public List<ScopeResponse> findAll() {
        return scopeRepository.findAll().stream()
                .map(this::toScopeResponse)
                .toList();
    }

    private ScopeResponse toScopeResponse(Scope scope) {
        return new ScopeResponse(
                scope.getId(),
                scope.getName(),
                scope.getDescription(),
                scope.getCreatedAt(),
                scope.getUpdatedAt()
        );
    }
}
