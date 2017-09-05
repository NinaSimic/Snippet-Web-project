package snippet.web.project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import snippet.web.project.model.Comment;
import snippet.web.project.model.Snippet;
import snippet.web.project.model.User;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findBySnippet(Snippet snippet);

    List<Comment> findByUser(User user);

    Comment findById(Long id);

}
