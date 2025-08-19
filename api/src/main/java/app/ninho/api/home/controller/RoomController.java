package app.ninho.api.home.controller;

import app.ninho.api.home.dto.*;
import app.ninho.api.home.service.RoomService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @PostMapping("/v1/rooms")
    @PreAuthorize("hasAuthority('room:create')")
    public ResponseEntity<Void> addRoom(
        @Valid @RequestBody AddRoomRequest request,
        @AuthenticationPrincipal Jwt principal
    ) {
        roomService.addRoom(request, principal.getSubject());

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
        var response = roomService.updateRoom(request, principal.getSubject());

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping("/v1/rooms/{id}")
    @PreAuthorize("hasAuthority('room:delete')")
    public ResponseEntity<Void> deleteRoom(
        @PathVariable("id") String roomId,
        @AuthenticationPrincipal Jwt principal
    ) {
        var request = new DeleteRoomRequest(roomId);

        roomService.deleteRoom(request, principal.getSubject());

        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
