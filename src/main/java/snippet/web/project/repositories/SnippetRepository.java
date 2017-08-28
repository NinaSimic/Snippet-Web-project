package snippet.web.project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import snippet.web.project.model.Snippet;

public interface SnippetRepository  extends JpaRepository<Snippet, Long> {

    Snippet findById(Long id);

}
