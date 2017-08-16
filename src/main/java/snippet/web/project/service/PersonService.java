package snippet.web.project.service;

import snippet.web.project.model.Person;

import java.util.List;

/**
 * Created by mbart on 28.02.2016.
 */
public interface PersonService {
  List<Person> loadAll();
}
