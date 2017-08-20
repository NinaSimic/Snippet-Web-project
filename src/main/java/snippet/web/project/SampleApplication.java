package snippet.web.project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import snippet.web.project.repositories.UserRepository;

@SpringBootApplication
@EnableJpaRepositories
public class SampleApplication {

  public static void main(String[] args) {
    ConfigurableApplicationContext context = SpringApplication.run(SampleApplication.class, args);

    UserRepository personRepository = context.getBean(UserRepository.class);
//    personRepository.save(new User( "admin", "admin", "Pera", "Peric", Role.ADMIN, "0607244994", "peraperic@gmail.com", "Trg Majke Jevrosime 11", "images/img1.jpg"));
//    personRepository.save(new User("Peter", "Lustig"));
  }

}
