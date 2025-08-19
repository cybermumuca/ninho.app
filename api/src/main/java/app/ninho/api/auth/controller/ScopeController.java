package app.ninho.api.auth.controller;

import app.ninho.api.auth.dto.ScopeResponse;
import app.ninho.api.auth.service.ScopeService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ScopeController {

    private final ScopeService scopeService;

    public ScopeController(ScopeService scopeService) {
        this.scopeService = scopeService;
    }

    @GetMapping("/v1/scopes")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ScopeResponse>> listScopes() {
        List<ScopeResponse> scopes = scopeService.findAll();
        return ResponseEntity.ok(scopes);
    }
}
