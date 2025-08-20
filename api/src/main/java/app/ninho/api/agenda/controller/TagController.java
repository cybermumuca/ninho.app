package app.ninho.api.agenda.controller;

import app.ninho.api.agenda.service.TagService;
import app.ninho.api.agenda.dto.CreateTagHttpRequest;
import app.ninho.api.agenda.dto.CreateTagRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TagController {

    private final TagService tagService;

    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    @PostMapping("/v1/tags")
    @PreAuthorize("hasAuthority('tag:create')")
    public ResponseEntity<Void> createTag(
        @Valid @RequestBody CreateTagHttpRequest httpRequest,
        @AuthenticationPrincipal Jwt jwt
    ) {
        var request = new CreateTagRequest(
            httpRequest.name(),
            httpRequest.color(),
            jwt.getSubject()
        );

        tagService.createTag(request);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
