package app.ninho.api.wellbeing.service;

import app.ninho.api.auth.repository.UserRepository;
import app.ninho.api.wellbeing.dto.io.ListArchivedHabitsRequest;
import app.ninho.api.wellbeing.dto.io.ListArchivedHabitsResponse;
import app.ninho.api.wellbeing.repository.HabitRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class HabitService {

    private final UserRepository userRepository;
    private final HabitRepository habitRepository;

    public HabitService(UserRepository userRepository, HabitRepository habitRepository) {
        this.userRepository = userRepository;
        this.habitRepository = habitRepository;
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
}
