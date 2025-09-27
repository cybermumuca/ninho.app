package app.ninho.api.agenda.controller;

import app.ninho.api.agenda.dto.httpio.CreateTaskHttpRequest;
import app.ninho.api.agenda.dto.io.CreateTaskRequest;
import app.ninho.api.agenda.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping("/v1/tasks")
    @PreAuthorize("hasAuthority('task:create')")
    public ResponseEntity<Void> createTask(
        @Valid @RequestBody CreateTaskHttpRequest httpRequest,
        @AuthenticationPrincipal Jwt jwt
    ) {
        var request = new CreateTaskRequest(
            httpRequest.title(),
            httpRequest.notes(),
            httpRequest.categoryId(),
            httpRequest.startDate(),
            httpRequest.dueDate(),
            httpRequest.estimatedDuration(),
            httpRequest.tagIds(),
            jwt.getSubject()
        );

        taskService.createTask(request);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
