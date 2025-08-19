package app.ninho.api.home.controller;

import app.ninho.api.home.dto.AddRoomRequest;
import app.ninho.api.home.dto.UpdateRoomHttpRequest;
import app.ninho.api.home.dto.UpdateRoomRequest;
import app.ninho.api.home.dto.UpdateRoomResponse;
import app.ninho.api.home.service.RoomsService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

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

    @PutMapping("/v1/rooms/{id}")
    @PreAuthorize("hasAuthority('room:update')")
    public ResponseEntity<UpdateRoomResponse> updateRoom(
        @PathVariable("id") String roomId,
        @Valid @RequestBody UpdateRoomHttpRequest httpRequest,
        @AuthenticationPrincipal Jwt principal
    ) {
        var request = new UpdateRoomRequest(roomId, httpRequest.name(), httpRequest.icon(), httpRequest.color());
        var response = roomsService.updateRoom(request, principal.getSubject());

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
