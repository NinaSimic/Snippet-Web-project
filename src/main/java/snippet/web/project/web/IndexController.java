package snippet.web.project.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import snippet.web.project.service.PersonService;

/**
 * Created by mbart on 28.02.2016.
 */
@RestController
public class IndexController {

  @Autowired
  private PersonService personService;


}
