package snippet.web.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import snippet.web.project.model.User;
import snippet.web.project.repositories.UserRepository;
import snippet.web.project.security.TokenUtils;

import java.io.IOException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private TokenUtils tokenUtils;

  @Autowired
  private UserDetailsService userDetailsService;

  public List<User> loadAll() {
    return userRepository.findAll();
  }

  public User findByUsername(String username){
    return userRepository.findByUsername(username);
  }

  public User findByToken(String token){
    String un = tokenUtils.getUsernameFromToken(token);
    UserDetails details = userDetailsService.loadUserByUsername(un);

    System.out.println("username : " + details.getUsername());
    User user = findByUsername(details.getUsername());
    System.out.println("Vratio usera find by token");
    return user;
  }

  public User register(User user){
    return userRepository.save(user);

  }
  public User save(User u){
    return userRepository.save(u);
  }
  //save file
  public String saveUploadedFiles(MultipartFile file, Long id) throws IOException {

      // <img src="/images/slika.png">
      URL r = this.getClass().getResource("/");
      byte[] bytes = file.getBytes();
      Path path = Paths.get("static/" + file.getOriginalFilename());
      Files.write(path, bytes);
      String imagePath = "/images/" + file.getOriginalFilename();
      User u = userRepository.findOne(id);
      u.setImage(imagePath);
      userRepository.save(u);

      return imagePath;

    }

    public List<User> findAll(){ return userRepository.findAll();}
}
