package app.ninho.api.home.dto;

public record UpdateRoomRequest(
    String roomId,
    String name,
    String icon,
    String color
) {}
