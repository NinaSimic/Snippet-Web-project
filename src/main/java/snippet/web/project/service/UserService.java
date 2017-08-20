package snippet.web.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import snippet.web.project.model.User;
import snippet.web.project.repositories.UserRepository;

import java.util.List;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  public List<User> loadAll() {
    return userRepository.findAll();
  }

  public User findByUsername(String username){
    return userRepository.findByUsername(username);
  }
}
