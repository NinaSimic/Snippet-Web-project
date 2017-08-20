package snippet.web.project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import snippet.web.project.model.Language;

import java.util.List;

public interface LanguageRepository extends JpaRepository<Language, Long> {

    Language findByName(String name);

}
