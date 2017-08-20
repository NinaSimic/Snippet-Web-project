package snippet.web.project.web.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import snippet.web.project.service.LanguageService;

@RestController
@RequestMapping("/api/languages")
public class LanguageController {

    @Autowired
    private LanguageService languageService;

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public ResponseEntity getAllLanguages() {
        return new ResponseEntity(languageService.findAll(), HttpStatus.OK);
    }

}
