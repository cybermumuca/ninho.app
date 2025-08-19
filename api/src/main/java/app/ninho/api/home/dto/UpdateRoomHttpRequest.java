package app.ninho.api.home.dto;

public record UpdateRoomHttpRequest(
    String name,
    String icon,
    String color
) {}
