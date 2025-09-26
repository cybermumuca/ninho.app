package app.ninho.api.wellbeing.controller;

import app.ninho.api.wellbeing.dto.io.ListArchivedHabitsRequest;
import app.ninho.api.wellbeing.dto.io.ListArchivedHabitsResponse;
import app.ninho.api.wellbeing.service.HabitService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class HabitController {

    private final HabitService habitService;

    public HabitController(HabitService habitService) {
        this.habitService = habitService;
    }

    @GetMapping("/v1/habits/archived")
    public ResponseEntity<List<ListArchivedHabitsResponse>> listArchivedHabits(
        @AuthenticationPrincipal Jwt jwt
    ) {
        var response = habitService.listArchivedHabits(new ListArchivedHabitsRequest(jwt.getSubject()));

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
