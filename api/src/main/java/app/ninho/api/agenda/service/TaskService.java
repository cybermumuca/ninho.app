package app.ninho.api.agenda.service;

import app.ninho.api.agenda.domain.Task;
import app.ninho.api.agenda.dto.io.CreateTaskRequest;
import app.ninho.api.agenda.repository.CategoryRepository;
import app.ninho.api.agenda.repository.TagRepository;
import app.ninho.api.agenda.repository.TaskRepository;
import app.ninho.api.auth.domain.Scope;
import app.ninho.api.auth.repository.UserRepository;
import app.ninho.api.recurrence.domain.SingleOccurrenceFrequency;
import app.ninho.api.recurrence.repository.FrequencyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.HashSet;

import static app.ninho.api.agenda.domain.ActivityType.TASK;
import static app.ninho.api.recurrence.domain.type.FrequencyType.SINGLE;

@Service
public class TaskService {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final TagRepository tagRepository;
    private final FrequencyRepository frequencyRepository;
    private final TaskRepository taskRepository;

    public TaskService(UserRepository userRepository, CategoryRepository categoryRepository, TagRepository tagRepository, FrequencyRepository frequencyRepository, TaskRepository taskRepository) {
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
}
