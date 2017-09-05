package snippet.web.project.service;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import snippet.web.project.SampleApplication;
import snippet.web.project.model.User;
import snippet.web.project.repositories.UserRepository;
import snippet.web.project.security.TokenUtils;

import java.io.*;
import java.net.URL;
import java.net.URLDecoder;
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
  public String saveUploadedFiles(String realPath, MultipartFile file, Long id) throws IOException {

      byte[] byteArr = null;
      try {
          byteArr = file.getBytes();
          System.out.println(file.getClass());
      } catch (IOException e1) {
          // TODO Auto-generated catch block
          e1.printStackTrace();
      }

      InputStream inputStream = new ByteArrayInputStream(byteArr);

      //URL r = null;
      String r = null;
      //
        if(SampleApplication.JAR) {
            //r = this.getClass().getResource("/");
            r = "./src/main/webapp/user-images/";
        } else {
            //r = this.getClass().getResource("../../../../../../");
            r = realPath + "user-images/";
        }

      // URL returned "/C:/Program%20Files/Tomcat%206.0/webapps/myapp/WEB-INF/classes/"
      //String path = r.getPath() + "user-images/user_" + id + "_" + file.getOriginalFilename();
      String path = r +  "user_" + id + "_" + file.getOriginalFilename();
      File newImageFile = new File(path);
      System.out.println("putanja: " + newImageFile.getAbsolutePath());
      newImageFile.createNewFile();

      // path decoded "/C:/Program Files/Tomcat 6.0/webapps/myapp/WEB-INF/classes/"
      String decoded = null;
      try {
         // decoded = URLDecoder.decode(r.getFile(), "UTF-8");

          FileOutputStream fos = new FileOutputStream(newImageFile);
          IOUtils.copy(inputStream, fos);
          fos.close();

      } catch (UnsupportedEncodingException e1) {
          // TODO Auto-generated catch block
          e1.printStackTrace();
      }



      String dbPath = "/" + path.substring(path.indexOf("user-images"));
      System.out.println("dbPath is:" + dbPath);
      if(dbPath.contains("\\")) {
          dbPath = dbPath.replace("\\", "/");
      }
      System.out.println("Db path replaced is:" + dbPath);
      User u = userRepository.findOne(id);
      u.setImage(dbPath);
      userRepository.save(u);

      return dbPath;

    }

    public List<User> findAll(){ return userRepository.findAll();}
}
