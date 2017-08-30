package snippet.web.project.web.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import snippet.web.project.model.Language;
import snippet.web.project.service.LanguageService;
import snippet.web.project.web.rest.dto.LanguageDTO;

@RestController
@RequestMapping("/api/language")
public class LanguageController {

    @Autowired
    private LanguageService languageService;

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public ResponseEntity getAllLanguages() {
        return new ResponseEntity(languageService.findAll(), HttpStatus.OK);
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity createNewProgLanguage(@RequestBody LanguageDTO languageDTO) {
        Language language = new Language();

        language.setName(languageDTO.getName());

        languageService.save(language);

        return new ResponseEntity<>(language, HttpStatus.CREATED);
    }
}
