package app.ninho.api.home.dto.io;

public record AddRoomRequest(
    String name,
    String icon,
    String color,
    String principalId
) {}
