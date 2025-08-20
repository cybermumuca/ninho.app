package app.ninho.api.agenda.service;

import app.ninho.api.agenda.domain.Tag;
import app.ninho.api.agenda.dto.CreateTagRequest;
import app.ninho.api.agenda.repository.TagRepository;
import app.ninho.api.auth.domain.Scope;
import app.ninho.api.auth.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TagService {

    private final UserRepository userRepository;
    private final TagRepository tagRepository;

    public TagService(UserRepository userRepository, TagRepository tagRepository) {
        this.userRepository = userRepository;
        this.tagRepository = tagRepository;
    }

    @Transactional
    public void createTag(CreateTagRequest request) {
        var principal = userRepository.findById(request.principalId())
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        var principalHasPermission = principal.checkScope(Scope.Values.TAG_CREATE.name);

        if (!principalHasPermission) {
            throw new IllegalArgumentException("User does not have permission to create tags");
        }

        var tag = new Tag();
        tag.setName(request.name());
        tag.setColor(request.color());
        tag.setOwner(principal);

        tagRepository.save(tag);
    }
}
