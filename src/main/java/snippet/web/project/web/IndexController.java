package snippet.web.project.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import snippet.web.project.model.Person;
import snippet.web.project.service.PersonService;

import java.util.List;

/**
 * Created by mbart on 28.02.2016.
 */
@Controller
public class IndexController {

  @Autowired
  private PersonService personService;

  @RequestMapping("/")
  public String showIndex(Model model) {
    List<Person> personList = personService.loadAll();

    model.addAttribute("personList", personList);

    return "index"; // return index.html Template
  }
}
