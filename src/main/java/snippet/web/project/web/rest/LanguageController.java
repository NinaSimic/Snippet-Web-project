package snippet.web.project.web.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import snippet.web.project.model.Language;
import snippet.web.project.model.User;
import snippet.web.project.model.enumerations.Role;
import snippet.web.project.service.LanguageService;
import snippet.web.project.service.UserService;
import snippet.web.project.util.ResponseMessage;
import snippet.web.project.web.rest.dto.LanguageDTO;

@RestController
@RequestMapping("/api/language")
public class LanguageController {

    @Autowired
    private LanguageService languageService;

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public ResponseEntity getAllLanguages() {
        return new ResponseEntity(languageService.findAll(), HttpStatus.OK);
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity createNewProgLanguage(@RequestBody LanguageDTO languageDTO, @RequestHeader("X-Auth-Token") String token ) {

        User user = userService.findByToken(token);
        System.out.println(token);

        Language language = new Language();

        if(user.getRole() == Role.ADMIN){

            language.setName(languageDTO.getName());
            languageService.save(language);

            return new ResponseEntity<>(language, HttpStatus.CREATED);
        }

        return new ResponseEntity<>(new ResponseMessage("You are not logged as admin!"), HttpStatus.BAD_REQUEST);
    }
}
