package app.ninho.api.agenda.controller;

import app.ninho.api.agenda.dto.*;
import app.ninho.api.agenda.service.TagService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

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

    @PutMapping("/v1/tags/{id}")
    @PreAuthorize("hasAuthority('tag:update')")
    public ResponseEntity<Void> updateTag(
        @PathVariable("id") String tagId,
        @Valid @RequestBody UpdateTagHttpRequest httpRequest,
        @AuthenticationPrincipal Jwt jwt
    ) {
        var request = new UpdateTagRequest(
            tagId,
            httpRequest.name(),
            httpRequest.color(),
            jwt.getSubject()
        );


        tagService.updateTag(request);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/v1/tags/{id}")
    @PreAuthorize("hasAuthority('tag:delete')")
    public ResponseEntity<Void> deleteTag(
        @PathVariable("id") String tagId,
        @AuthenticationPrincipal Jwt jwt
    ) {
        var request = new DeleteTagRequest(tagId, jwt.getSubject());

        tagService.deleteTag(request);

        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
