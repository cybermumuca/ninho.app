package app.ninho.api.auth.controller;

import app.ninho.api.auth.dto.AcceptUserRequest;
import app.ninho.api.auth.service.ProfileService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    public record AcceptUserHttpRequest(
        List<String> scopeIds
    ) {}

    @PatchMapping("/v1/profiles/{id}/accept")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> acceptUser(
        @PathVariable("id") String userToAcceptId,
        @Valid @RequestBody AcceptUserHttpRequest httpRequest,
        @AuthenticationPrincipal Jwt principal
    ) {
        var request = new AcceptUserRequest(userToAcceptId, httpRequest.scopeIds());

        profileService.acceptUser(request, principal.getSubject());

        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
