package app.ninho.api.home.service;

import app.ninho.api.auth.domain.Scope;
import app.ninho.api.auth.domain.User;
import app.ninho.api.auth.repository.UserRepository;
import app.ninho.api.home.domain.Room;
import app.ninho.api.home.dto.io.AddRoomRequest;
import app.ninho.api.home.dto.io.DeleteRoomRequest;
import app.ninho.api.home.dto.io.UpdateRoomRequest;
import app.ninho.api.home.dto.io.UpdateRoomResponse;
import app.ninho.api.home.repository.RoomRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RoomService {

    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    public RoomService(RoomRepository roomRepository, UserRepository userRepository) {
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public void addRoom(AddRoomRequest request, String principalId) {
        var principal = userRepository.findById(principalId)
            .orElseThrow(() -> new IllegalArgumentException("User not found: " + principalId));

        var principalHasPermission = principal.checkScope(Scope.Values.ROOM_CREATE.name);

        if (!principalHasPermission) {
            throw new IllegalArgumentException("User does not have permission to create rooms");
        }

        var room = new Room();
        room.setName(request.name());
        room.setIcon(request.icon());
        room.setColor(request.color());
        room.setCreatedBy(new User(principalId));

        roomRepository.save(room);
    }

    @Transactional
    public UpdateRoomResponse updateRoom(UpdateRoomRequest request, String principalId) {
        var principal = userRepository.findById(principalId)
            .orElseThrow(() -> new IllegalArgumentException("User not found: " + principalId));

        var principalHasPermission = principal.checkScope(Scope.Values.ROOM_UPDATE.name);

        if (!principalHasPermission) {
            throw new IllegalArgumentException("User does not have permission to update rooms");
        }

        var room = roomRepository.findById(request.roomId())
            .orElseThrow(() -> new IllegalArgumentException("Room not found: " + request.roomId()));

        if (request.name() != null) {
            room.setName(request.name());
        }

        if (request.icon() != null) {
            room.setIcon(request.icon());
        }

        if (request.color() != null) {
            room.setColor(request.color());
        }

        roomRepository.save(room);

        return new UpdateRoomResponse(
            room.getId(),
            room.getName(),
            room.getIcon(),
            room.getColor()
        );
    }

    @Transactional
    public void deleteRoom(DeleteRoomRequest request, String principalId) {
        var principal = userRepository.findById(principalId)
            .orElseThrow(() -> new IllegalArgumentException("User not found: " + principalId));

        var principalHasPermission = principal.checkScope(Scope.Values.ROOM_DELETE.name);

        if (!principalHasPermission) {
            throw new IllegalArgumentException("User does not have permission to delete rooms");
        }

        var room = roomRepository.findById(request.roomId())
            .orElseThrow(() -> new IllegalArgumentException("Room not found: " + request.roomId()));

        roomRepository.delete(room);
    }
}
