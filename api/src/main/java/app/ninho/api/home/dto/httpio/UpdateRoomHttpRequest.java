package app.ninho.api.home.dto.httpio;

public record UpdateRoomHttpRequest(
    String name,
    String icon,
    String color
) {}
