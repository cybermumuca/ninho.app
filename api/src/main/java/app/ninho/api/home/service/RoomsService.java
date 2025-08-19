package app.ninho.api.home.service;

import app.ninho.api.auth.domain.User;
import app.ninho.api.auth.repository.UserRepository;
import app.ninho.api.home.domain.Room;
import app.ninho.api.home.dto.AddRoomRequest;
import app.ninho.api.home.repository.RoomRepository;
import org.springframework.stereotype.Service;

@Service
public class RoomsService {

    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    public RoomsService(RoomRepository roomRepository, UserRepository userRepository) {
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;
    }

    public void addRoom(AddRoomRequest request, String principalId) {
        var principal = userRepository.findById(principalId)
            .orElseThrow(() -> new IllegalArgumentException("User not found: " + principalId));

        var principalHasPermission = principal.getScopes().stream().anyMatch(scope -> scope.getName().equals("room:create"));

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
}
