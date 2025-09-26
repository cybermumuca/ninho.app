package app.ninho.api.wellbeing.controller;

import app.ninho.api.wellbeing.dto.httpio.CreateHabitHttpRequest;
import app.ninho.api.wellbeing.dto.io.CreateHabitRequest;
import app.ninho.api.wellbeing.dto.io.ListArchivedHabitsRequest;
import app.ninho.api.wellbeing.dto.io.ListArchivedHabitsResponse;
import app.ninho.api.wellbeing.service.HabitService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @PostMapping("/v1/habits")
    @PreAuthorize("hasAuthority('habit:create')")
    public ResponseEntity<Void> createHabit(
        @Valid @RequestBody CreateHabitHttpRequest httpRequest,
        @AuthenticationPrincipal Jwt jwt
    ) {
        var request = new CreateHabitRequest(
            httpRequest.title(),
            httpRequest.description(),
            httpRequest.modality(),
            httpRequest.categoryId(),
            httpRequest.frequencyType(),
            httpRequest.weekDays(),
            httpRequest.monthDays(),
            httpRequest.monthlyWeekdayOccurrences(),
            httpRequest.yearlyDateOccurrences(),
            httpRequest.periodCount(),
            httpRequest.periodType(),
            httpRequest.intervalDays(),
            httpRequest.startDate(),
            httpRequest.endDate(),
            jwt.getSubject()
        );

        habitService.createHabit(request);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
