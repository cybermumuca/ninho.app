package app.ninho.api.agenda.controller;

import app.ninho.api.agenda.dto.httpio.CreateTaskHttpRequest;
import app.ninho.api.agenda.dto.httpio.PeriodLimit;
import app.ninho.api.agenda.dto.io.*;
import app.ninho.api.agenda.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/v1/tasks")
    @PreAuthorize("hasAuthority('task:list')")
    public ResponseEntity<List<ListTasksResponse>> listTasks(
        @AuthenticationPrincipal Jwt jwt,
        @RequestParam(name = "periodLimit", defaultValue = "none") PeriodLimit periodLimit
    ) {
        var request = new ListTasksRequest(periodLimit, jwt.getSubject());
        var response = taskService.listTasks(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/v1/tasks/completed")
    @PreAuthorize("hasAuthority('task:list')")
    public ResponseEntity<List<ListCompletedTasksResponse>> listCompletedTasks(
        @AuthenticationPrincipal Jwt jwt,
        @RequestParam(name = "periodLimit", defaultValue = "none") PeriodLimit periodLimit
    ) {
        var request = new ListCompletedTasksRequest(periodLimit, jwt.getSubject());
        var response = taskService.listCompletedTasks(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping("/v1/tasks/{id}")
    @PreAuthorize("hasAuthority('task:delete')")
    public ResponseEntity<Void> deleteTask(
        @PathVariable("id") String taskId,
        @AuthenticationPrincipal Jwt jwt
    ) {
        var request = new DeleteTaskRequest(taskId, jwt.getSubject());

        taskService.deleteTask(request);

        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
