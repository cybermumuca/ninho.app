package app.ninho.api.auth.repository;

import app.ninho.api.auth.domain.Scope;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ScopeRepository extends JpaRepository<Scope, String> {
    Optional<Scope> findByName(String name);
}
