package snippet.web.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import snippet.web.project.model.Person;
import snippet.web.project.repositories.PersonRepository;

import java.util.List;

/**
 * Created by mbart on 28.02.2016.
 */
@Service
public class PersonServiceImpl implements PersonService {

  @Autowired
  private PersonRepository personRepository;

  @Override
  public List<Person> loadAll() {
    return personRepository.findAll();
  }
}
