package app.ninho.api.agenda.controller;

import app.ninho.api.agenda.dto.httpio.CreateTaskHttpRequest;
import app.ninho.api.agenda.dto.io.CreateTaskRequest;
import app.ninho.api.agenda.dto.io.GetTaskRequest;
import app.ninho.api.agenda.dto.io.GetTaskResponse;
import app.ninho.api.agenda.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/v1/tasks/{id}")
    @PreAuthorize("hasAuthority('task:read')")
    public ResponseEntity<GetTaskResponse> getTask(
        @PathVariable("id") String taskId,
        @AuthenticationPrincipal Jwt jwt
    ) {
        var response = taskService.getTask(new GetTaskRequest(taskId, jwt.getSubject()));

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
