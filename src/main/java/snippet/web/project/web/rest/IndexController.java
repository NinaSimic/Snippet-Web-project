package snippet.web.project.web.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import snippet.web.project.service.UserService;

@RestController
public class IndexController {

  @Autowired
  private UserService userService;


}
