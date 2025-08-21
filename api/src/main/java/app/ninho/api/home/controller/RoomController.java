package app.ninho.api.home.controller;

import app.ninho.api.home.dto.httpio.AddRoomHttpRequest;
import app.ninho.api.home.dto.httpio.UpdateRoomHttpRequest;
import app.ninho.api.home.dto.io.AddRoomRequest;
import app.ninho.api.home.dto.io.DeleteRoomRequest;
import app.ninho.api.home.dto.io.UpdateRoomRequest;
import app.ninho.api.home.dto.io.UpdateRoomResponse;
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
        @Valid @RequestBody AddRoomHttpRequest httpRequest,
        @AuthenticationPrincipal Jwt principal
    ) {
        var request = new AddRoomRequest(
            httpRequest.name(),
            httpRequest.icon(),
            httpRequest.color(),
            principal.getSubject()
        );

        roomService.addRoom(request);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/v1/rooms/{id}")
    @PreAuthorize("hasAuthority('room:update')")
    public ResponseEntity<UpdateRoomResponse> updateRoom(
        @PathVariable("id") String roomId,
        @Valid @RequestBody UpdateRoomHttpRequest httpRequest,
        @AuthenticationPrincipal Jwt principal
    ) {
        var request = new UpdateRoomRequest(roomId, httpRequest.name(), httpRequest.icon(), httpRequest.color(), principal.getSubject());

        var response = roomService.updateRoom(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping("/v1/rooms/{id}")
    @PreAuthorize("hasAuthority('room:delete')")
    public ResponseEntity<Void> deleteRoom(
        @PathVariable("id") String roomId,
        @AuthenticationPrincipal Jwt principal
    ) {
        var request = new DeleteRoomRequest(roomId, principal.getSubject());

        roomService.deleteRoom(request);

        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
