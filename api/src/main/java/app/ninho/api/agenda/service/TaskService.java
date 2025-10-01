package app.ninho.api.agenda.service;

import app.ninho.api.agenda.domain.Task;
import app.ninho.api.agenda.dto.io.*;
import app.ninho.api.agenda.repository.CategoryRepository;
import app.ninho.api.agenda.repository.TagRepository;
import app.ninho.api.agenda.repository.TaskRepository;
import app.ninho.api.auth.domain.Scope;
import app.ninho.api.auth.repository.UserRepository;
import app.ninho.api.recurrence.domain.Frequency;
import app.ninho.api.recurrence.domain.SingleOccurrenceFrequency;
import app.ninho.api.recurrence.repository.FrequencyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;

import static app.ninho.api.agenda.domain.ActivityType.TASK;
import static app.ninho.api.recurrence.domain.type.FrequencyType.SINGLE;
import static java.time.DayOfWeek.MONDAY;

@Service
public class TaskService {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final TagRepository tagRepository;
    private final FrequencyRepository frequencyRepository;
    private final TaskRepository taskRepository;

    public TaskService(
        UserRepository userRepository,
        CategoryRepository categoryRepository,
        TagRepository tagRepository,
        FrequencyRepository frequencyRepository,
        TaskRepository taskRepository
    ) {
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.tagRepository = tagRepository;
        this.frequencyRepository = frequencyRepository;
        this.taskRepository = taskRepository;
    }

    @Transactional
    public void createTask(CreateTaskRequest request) {
        var principal = userRepository.findById(request.principalId())
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        var principalHasPermission = principal.checkScope(Scope.Values.TASK_CREATE.name());

        if (!principalHasPermission) {
            throw new IllegalArgumentException("User does not have permission to create tasks");
        }

        var category = categoryRepository.findById(request.categoryId())
            .orElseThrow(() -> new IllegalArgumentException("Category not found"));

        if (!category.getOwner().getId().equals(principal.getId())) {
            throw new IllegalArgumentException("Category does not belong to the user");
        }

        var tags = tagRepository.findAllById(request.tagIds());

        if (tags.size() != request.tagIds().size()) {
            throw new IllegalArgumentException("One or more tags not found");
        }

        if (tags.stream().anyMatch(tag -> !tag.getOwner().getId().equals(principal.getId()))) {
            throw new IllegalArgumentException("One or more tags do not belong to the user");
        }

        SingleOccurrenceFrequency frequency = new SingleOccurrenceFrequency();
        frequency.setType(SINGLE);
        frequency.setStartDate(request.startDate());
        frequency.setEndDate(request.dueDate());

        frequencyRepository.save(frequency);

        Task task = new Task();
        task.setTitle(request.title());
        task.setType(TASK);
        task.setTracks(new HashSet<>(Collections.singleton(frequency)));
        task.setCategory(category);
        task.setTags(new HashSet<>(tags));
        task.setOwner(principal);
        task.setNotes(request.notes());
        task.setEstimatedDuration(request.estimatedDuration());

        taskRepository.save(task);
    }

    @Transactional(readOnly = true)
    public GetTaskResponse getTask(GetTaskRequest request) {
        var principal = userRepository.findById(request.principalId())
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        var principalHasPermission = principal.checkScope(Scope.Values.TASK_READ.name());

        if (!principalHasPermission) {
            throw new IllegalArgumentException("User does not have permission to create tasks");
        }

        var task = taskRepository.findByIdWithCategoryAndTagsAndFrequency(request.taskId())
            .orElseThrow(() -> new IllegalArgumentException("Task not found"));

        if (!task.getOwner().getId().equals(principal.getId())) {
            throw new IllegalArgumentException("Task does not belong to the user");
        }

        var track = task.getTracks().stream().findFirst()
            .orElseThrow(() -> new IllegalArgumentException("Task track not found"));

        return new GetTaskResponse(
            task.getId(),
            task.getTitle(),
            new GetTaskResponse.Category(
                task.getCategory().getId(),
                task.getCategory().getName(),
                task.getCategory().getIcon(),
                task.getCategory().getColor()
            ),
            track.getStartDate(),
            track.getEndDate(),
            task.getEstimatedDuration(),
            task.getActualDuration(),
            task.getCompletedAt(),
            task.getTags().stream().map(tag -> new GetTaskResponse.Tag(
                tag.getId(),
                tag.getName(),
                tag.getColor()
            )).toList(),
            task.getNotes()
        );
    }

    @Transactional
    public void deleteTask(DeleteTaskRequest request) {
        var principal = userRepository.findById(request.principalId())
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        var principalHasPermission = principal.checkScope(Scope.Values.TASK_DELETE.name());

        if (!principalHasPermission) {
            throw new IllegalArgumentException("User does not have permission to delete tasks");
        }

        var task = taskRepository.findByIdWithFrequency(request.taskId())
            .orElseThrow(() -> new IllegalArgumentException("Task not found"));

        if (!task.getOwner().getId().equals(principal.getId())) {
            throw new IllegalArgumentException("Task does not belong to the user");
        }

        var tasksToDelete = task.getTracks()
            .stream()
            .map(Frequency::getId)
            .toList();

        frequencyRepository.deleteAllById(tasksToDelete);

        taskRepository.delete(task);
    }

    @Transactional(readOnly = true)
    public List<ListTasksResponse> listTasks(ListTasksRequest request) {
        var principal = userRepository.findById(request.principalId())
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        var principalHasPermission = principal.checkScope(Scope.Values.TASK_LIST.name());

        if (!principalHasPermission) {
            throw new IllegalArgumentException("User does not have permission to list tasks");
        }

        LocalDate startDate;
        LocalDate endDate;

        LocalDate today = LocalDate.now();

        switch (request.periodLimit()) {
            case today -> {
                startDate = today;
                endDate = today;
            }
            case this_week -> {
                startDate = today.with(MONDAY);
                endDate = startDate.plusDays(6);
            }
            case this_month -> {
                startDate = today.withDayOfMonth(1);
                endDate = startDate.plusMonths(1).minusDays(1);
            }
            case none -> {
                startDate = null;
                endDate = null;
            }
            case null, default -> throw new IllegalArgumentException("Invalid period limit");
        }

        var tasks = taskRepository.findAllByOwnerAndStartDateAndEndDateAndTodayWithCategoryAndFrequency(
            request.principalId(),
            startDate,
            endDate,
            today
        );

        return tasks.stream().map(task -> {
            var track = task.getTracks().stream().findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Task track not found"));

            LocalDate date = track.getStartDate();

            if (date.isBefore(startDate)) {
                date = today;
            }

            // TODO: refactor when more types are implemented (eg. IN_PROGRESS)
            ListTasksResponse.Status status = ListTasksResponse.Status.PENDING;

            if (task.getCompletedAt() != null) {
                status = ListTasksResponse.Status.COMPLETED;
            }

            return new ListTasksResponse(
                task.getId(),
                task.getTitle(),
                new ListTasksResponse.Category(
                    task.getCategory().getId(),
                    task.getCategory().getName(),
                    task.getCategory().getIcon(),
                    task.getCategory().getColor()
                ),
                date,
                track.getEndDate(),
                task.getEstimatedDuration(),
                status
            );
        }).toList();
    }

    @Transactional(readOnly = true)
    public List<ListCompletedTasksResponse> listCompletedTasks(ListCompletedTasksRequest request) {
        var principal = userRepository.findById(request.principalId())
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        var principalHasPermission = principal.checkScope(Scope.Values.TASK_LIST.name());

        if (!principalHasPermission) {
            throw new IllegalArgumentException("User does not have permission to list tasks");
        }

        LocalDate startDate;
        LocalDate endDate;

        LocalDate today = LocalDate.now();

        switch (request.periodLimit()) {
            case today -> {
                startDate = today;
                endDate = today;
            }
            case this_week -> {
                startDate = today.with(MONDAY);
                endDate = startDate.plusDays(6);
            }
            case this_month -> {
                startDate = today.withDayOfMonth(1);
                endDate = startDate.plusMonths(1).minusDays(1);
            }
            case none -> {
                startDate = null;
                endDate = null;
            }
            case null, default -> throw new IllegalArgumentException("Invalid period limit");
        }

        var tasks = taskRepository.findAllCompletedByOwnerAndStartDateAndEndDateWithCategoryAndFrequency(
            request.principalId(),
            startDate,
            endDate
        );

        return tasks.stream().map(task -> {
            var track = task.getTracks().stream().findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Task track not found"));

            return new ListCompletedTasksResponse(
                task.getId(),
                task.getTitle(),
                new ListCompletedTasksResponse.Category(
                    task.getCategory().getId(),
                    task.getCategory().getName(),
                    task.getCategory().getIcon(),
                    task.getCategory().getColor()
                ),
                track.getStartDate(),
                track.getEndDate(),
                task.getEstimatedDuration(),
                ListCompletedTasksResponse.Status.COMPLETED,
                task.getCompletedAt()
            );
        }).toList();
    }

    @Transactional(readOnly = true)
    public List<ListOverdueTasksResponse> listOverdueTasks(ListOverdueTasksRequest request) {
        var principal = userRepository.findById(request.principalId())
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        var principalHasPermission = principal.checkScope(Scope.Values.TASK_LIST.name());

        if (!principalHasPermission) {
            throw new IllegalArgumentException("User does not have permission to list tasks");
        }

        var today = LocalDate.now();

        var tasks = taskRepository.findAllOverdueByOwnerWithCategoryAndFrequency(
            request.principalId(),
            today
        );

        return tasks.stream().map(task -> {
            var track = task.getTracks().stream().findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Task track not found"));

            return new ListOverdueTasksResponse(
                task.getId(),
                task.getTitle(),
                new ListOverdueTasksResponse.Category(
                    task.getCategory().getId(),
                    task.getCategory().getName(),
                    task.getCategory().getIcon(),
                    task.getCategory().getColor()
                ),
                track.getStartDate(),
                track.getEndDate(),
                task.getEstimatedDuration(),
                ListOverdueTasksResponse.Status.PENDING
            );
        }).toList();
    }
}
