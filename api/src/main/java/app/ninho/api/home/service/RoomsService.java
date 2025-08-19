package app.ninho.api.home.service;

import app.ninho.api.auth.domain.User;
import app.ninho.api.home.domain.Room;
import app.ninho.api.home.dto.AddRoomRequest;
import app.ninho.api.home.repository.RoomRepository;
import org.springframework.stereotype.Service;

@Service
public class RoomsService {

    private final RoomRepository roomRepository;

    public RoomsService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public void addRoom(AddRoomRequest request, String principalId) {
        var room = new Room();
        room.setName(request.name());
        room.setIcon(request.icon());
        room.setColor(request.color());
        room.setCreatedBy(new User(principalId));

        roomRepository.save(room);
    }
}
