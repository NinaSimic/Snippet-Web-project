package snippet.web.project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import snippet.web.project.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {


}
