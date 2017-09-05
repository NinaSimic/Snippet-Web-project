package snippet.web.project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;
import snippet.web.project.repositories.UserRepository;

@SpringBootApplication
@EnableJpaRepositories
@EnableScheduling
public class SampleApplication extends SpringBootServletInitializer {

  public static boolean JAR = false;

  /**
   * Used when run as JAR
   */
  public static void main(String[] args) {
    ConfigurableApplicationContext context = SpringApplication.run(SampleApplication.class, args);
    JAR = true;
    UserRepository personRepository = context.getBean(UserRepository.class);
//    personRepository.save(new User( "admin", "admin", "Pera", "Peric", Role.ADMIN, "0607244994", "peraperic@gmail.com", "Trg Majke Jevrosime 11", "images/img1.jpg"));
//    personRepository.save(new User("Peter", "Lustig"));
  }

  /**
   * Used when run as WAR
   */
  @Override
  protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
    return builder.sources(SampleApplication.class);
  }


}
