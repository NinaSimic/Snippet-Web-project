package snippet.web.project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import snippet.web.project.model.Comment;
import snippet.web.project.model.Grade;

import java.util.List;

public interface GradeRepository extends JpaRepository<Grade, Long> {

    List<Grade> findByComment(Comment comment);

}
