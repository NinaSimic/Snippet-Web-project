package snippet.web.project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import snippet.web.project.model.Grade;

public interface GradeRepository extends JpaRepository<Grade, Long> {
}
