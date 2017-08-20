package snippet.web.project.service;

import snippet.web.project.model.User;

import java.util.List;

/**
 * Created by mbart on 28.02.2016.
 */
public interface PersonService {
  List<User> loadAll();
}
