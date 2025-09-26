package app.ninho.api.wellbeing.service;

import app.ninho.api.agenda.repository.CategoryRepository;
import app.ninho.api.auth.domain.Scope;
import app.ninho.api.auth.repository.UserRepository;
import app.ninho.api.recurrence.domain.Frequency;
import app.ninho.api.recurrence.repository.FrequencyRepository;
import app.ninho.api.wellbeing.domain.Habit;
import app.ninho.api.wellbeing.dto.io.CreateHabitRequest;
import app.ninho.api.wellbeing.dto.io.ListArchivedHabitsRequest;
import app.ninho.api.wellbeing.dto.io.ListArchivedHabitsResponse;
import app.ninho.api.wellbeing.repository.HabitRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class HabitService {

    private final UserRepository userRepository;
    private final HabitRepository habitRepository;
    private final CategoryRepository categoryRepository;
    private final FrequencyRepository frequencyRepository;

    public HabitService(UserRepository userRepository, HabitRepository habitRepository, CategoryRepository categoryRepository, FrequencyRepository frequencyRepository) {
        this.userRepository = userRepository;
        this.habitRepository = habitRepository;
        this.categoryRepository = categoryRepository;
        this.frequencyRepository = frequencyRepository;
    }

    public List<ListArchivedHabitsResponse> listArchivedHabits(ListArchivedHabitsRequest request) {
        var principal = userRepository.findById(request.principalId())
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

//        var principalHasPermission = principal.checkScope("HABIT_LIST");
//
//        if (!principalHasPermission) {
//            throw new IllegalArgumentException("User does not have permission to list habits");
//        }
        return habitRepository.findAllByOwnerIdAndArchivedAtIsNotNull(request.principalId())
            .stream()
            .map(habit -> new ListArchivedHabitsResponse(
                habit.getId(),
                habit.getTitle(),
                new ListArchivedHabitsResponse.Frequency("", new ArrayList<>(), 0, ""),
                habit.getModality(),
                new ListArchivedHabitsResponse.Category(
                    habit.getCategory().getId(),
                    habit.getCategory().getName(),
                    habit.getCategory().getColor(),
                    habit.getCategory().getIcon()
                ),
                0,
                null
            ))
            .toList();
    }

    public void createHabit(CreateHabitRequest request) {
        var principal = userRepository.findById(request.principalId())
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        var principalHasPermission = principal.checkScope(Scope.Values.HABIT_CREATE.name());

        if (!principalHasPermission) {
            throw new IllegalArgumentException("User does not have permission to create habits");
        }

        var category = categoryRepository.findById(request.categoryId())
            .orElseThrow(() -> new IllegalArgumentException("Category not found"));

        if (!category.getOwner().getId().equals(principal.getId())) {
            throw new IllegalArgumentException("Category does not belong to the user");
        }

        Habit habit = new Habit();
        habit.setTitle(request.title());
        habit.setDescription(request.description());
        habit.setModality(request.modality());
        habit.setCategory(category);
        habit.setOwner(principal);

        Frequency frequency = request.toFrequency();
        frequencyRepository.save(frequency);

        habit.setTracks(Collections.singletonList(frequency));

        habitRepository.save(habit);
    }
}
