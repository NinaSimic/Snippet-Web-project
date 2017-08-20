package snippet.web.project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import snippet.web.project.model.User;

/**
 * Created by mbart on 28.02.2016.
 */
public interface PersonRepository extends JpaRepository<User, Long>{
}
