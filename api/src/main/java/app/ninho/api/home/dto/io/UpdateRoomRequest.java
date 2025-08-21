package app.ninho.api.home.dto.io;

public record UpdateRoomRequest(
    String roomId,
    String name,
    String icon,
    String color,
    String principalId
) {}
