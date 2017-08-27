package snippet.web.project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import snippet.web.project.model.Authority;

/**
 * This interface represents Authority repository
 */
public interface AuthorityRepository extends JpaRepository<Authority, Long> {

        /**
         * This method finds Authority with specified name
         * @param name
         * @return object of Authority
         */
        Authority findByName(String name);
}
