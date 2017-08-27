package snippet.web.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import snippet.web.project.model.Authority;
import snippet.web.project.repositories.AuthorityRepository;

/**
 * This class represents Authority Service
 *
 */
@Service
public class AuthorityService {

    @Autowired
    AuthorityRepository authorityRepository;

    /**
     * This method is finding one Authority by its name
     * @param name
     * @return object Authority
     */
    public Authority findByName(String name){
        return authorityRepository.findByName(name);
    }

}
