package app.ninho.api.auth.controller;

import app.ninho.api.auth.dto.AcceptUserRequest;
import app.ninho.api.auth.service.ProfileService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @PatchMapping("/v1/profiles/{id}/accept")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> acceptUser(@PathVariable("id") String userToAcceptId,
                                        @AuthenticationPrincipal Jwt principal) {
        profileService.acceptUser(new AcceptUserRequest(userToAcceptId), principal.getSubject());

        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
