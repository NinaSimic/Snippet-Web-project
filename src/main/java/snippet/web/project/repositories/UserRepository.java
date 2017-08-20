package snippet.web.project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import snippet.web.project.model.User;


public interface UserRepository extends JpaRepository<User, Long>{

    User findByUsername(String username);
}
