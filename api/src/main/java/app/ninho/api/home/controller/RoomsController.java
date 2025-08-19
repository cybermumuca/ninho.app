package app.ninho.api.home.controller;

import app.ninho.api.home.dto.AddRoomRequest;
import app.ninho.api.home.service.RoomsService;
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
public class RoomsController {

    private final RoomsService roomsService;

    public RoomsController(RoomsService roomsService) {
        this.roomsService = roomsService;
    }

    @PostMapping("/v1/rooms")
    @PreAuthorize("hasAuthority('room:create')")
    public ResponseEntity<Void> addRoom(
        @Valid @RequestBody AddRoomRequest request,
        @AuthenticationPrincipal Jwt principal
    ) {
        roomsService.addRoom(request, principal.getSubject());

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
